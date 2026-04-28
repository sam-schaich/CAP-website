import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function normalize(s: string) {
  return (s ?? "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, ""); // removes spaces + punctuation
}

const ANSWERS: Record<string, Record<number, string[]>> = {
  path1: {
    1: ["milfordmallplaque"],
    2: ["1330157"],
    3: ["pb"],
    4: ["graeme"],
    5: ["112"],
    6: ["l"],
  },

  path2: {
    1: ["footballcoliseum"],
    2: ["giantknight"],
    3: ["family"],
    4: ["ff"],
    5: ["duffy"],
    6: ["h"],
  },

  path3: {
    1: ["parkinglot"],
    2: ["afternoon chapel shadow"],
    3: ["black"],
    4: ["front"],
    5: ["128"],
    6: ["K"],
  },

  path4: {
    1: ["..."],
    2: ["..."],
    3: ["..."],
    4: ["..."],
    5: ["..."],
    6: ["..."],
  },
};

// set true temporarily if you want API responses to include debug info
const DEBUG = true;

function maxStepForPath(path: string) {
  if (path === "path1") return 6;
  if (path === "path2") return 6;
  if (path === "path3") return 6;
  if (path === "path4") return 6;
  return 6;
}

export async function POST(req: Request) {
  try {
    const supabase = await createSupabaseServerClient();

    // must be logged in
    const { data: userData, error: userErr } = await supabase.auth.getUser();
    const user = userData?.user;

    if (userErr || !user) {
      return NextResponse.json({ ok: false, error: "Not logged in" }, { status: 401 });
    }

    // parse request
    const body = await req.json().catch(() => ({}));
    const path = String(body.path ?? "");
    const step = Number(body.step ?? 0);
    const guessRaw = String(body.guess ?? "");
    const guess = normalize(guessRaw);

    if (!path || !Number.isFinite(step) || step < 1) {
      return NextResponse.json({ ok: false, error: "Missing/invalid path or step" }, { status: 400 });
    }

    const answerList = ANSWERS[path]?.[step];

    // If the answer key isn't set for that step, treat as configuration error
    if (!answerList || answerList.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          error: "This step is not configured yet (no answer key).",
          ...(DEBUG ? { debug: { path, step, received: guess } } : {}),
        },
        { status: 400 }
      );
    }

    // ---- ensure progress row exists without overwriting step ----
    const { data: existing } = await supabase
      .from("progress")
      .select("step, wrong_attempts, locked_until")
      .eq("user_id", user.id)
      .eq("path", path)
      .maybeSingle();

    if (!existing) {
      // rely on DB defaults: step=1, wrong_attempts=0, locked_until=null
      const { error: insErr } = await supabase.from("progress").insert({ user_id: user.id, path });
      if (insErr) {
        return NextResponse.json({ ok: false, error: "Failed to create progress row" }, { status: 500 });
      }
    }

    // reload progress (so we have a single source of truth)
    const { data: prog, error: progErr } = await supabase
      .from("progress")
      .select("step, wrong_attempts, locked_until, answers")
      .eq("user_id", user.id)
      .eq("path", path)
      .single();

    if (progErr || !prog) {
      return NextResponse.json({ ok: false, error: "Progress load failed" }, { status: 500 });
    }

    // lockout
    if (prog.locked_until) {
      const untilMs = new Date(prog.locked_until).getTime();
      if (Date.now() < untilMs) {
        return NextResponse.json(
          {
            ok: false,
            locked: true,
            locked_until: prog.locked_until,
            error: "Locked out. Try again later.",
          },
          { status: 429 }
        );
      }
    }

    // must answer current unlocked step only
    if (step !== prog.step) {
      return NextResponse.json(
        {
          ok: false,
          error: `You are currently on step ${prog.step}.`,
          ...(DEBUG ? { debug: { requestedStep: step, unlockedStep: prog.step } } : {}),
        },
        { status: 400 }
      );
    }

    // check correctness
    const accepted = answerList.map(normalize);
const isCorrect = accepted.includes(guess);

// correct -> advance step + store answer
if (isCorrect) {
  const max = maxStepForPath(path);
  const nextStep = Math.min(prog.step + 1, max);
  const completedPath = step === max; // <-- final step was just answered



  const prevAnswers = (prog.answers ?? {}) as Record<string, string>;
  const newAnswers = { ...prevAnswers, [String(step)]: guessRaw };

  const { error: updErr } = await supabase
    .from("progress")
    .update({
      step: nextStep,
      wrong_attempts: 0,
      locked_until: null,
      answers: newAnswers,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id)
    .eq("path", path);

  if (updErr) {
    return NextResponse.json({ ok: false, error: updErr.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    correct: true,
    next_step: nextStep,
    completed_path: completedPath,
    final_letter: completedPath ? guessRaw : null,
    ...(DEBUG ? { debug: { path, step, received: guess, accepted } } : {}),
  });
}


    // wrong -> increment attempts + maybe lock
    const newWrongAttempts = (prog.wrong_attempts ?? 0) + 1;
    const MAX_WRONG = 3;
    const LOCK_MINUTES = 5;

    let locked_until: string | null = null;
    if (newWrongAttempts >= MAX_WRONG) {
      const d = new Date();
      d.setMinutes(d.getMinutes() + LOCK_MINUTES);
      locked_until = d.toISOString();
    }

    const { error: wrongUpdErr } = await supabase
      .from("progress")
      .update({
        wrong_attempts: newWrongAttempts,
        locked_until,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)
      .eq("path", path);

    if (wrongUpdErr) {
      return NextResponse.json({ ok: false, error: "Failed to record wrong attempt" }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      correct: false,
      wrong_attempts: newWrongAttempts,
      locked: Boolean(locked_until),
      locked_until,
      ...(DEBUG ? { debug: { received: guess, accepted } } : {}),
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Server error" }, { status: 500 });
  }
}
