import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const CORRECT_ANSWER = "rose";

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const guess = (body?.guess ?? "").trim().toLowerCase();

  if (!guess) {
    return NextResponse.json({ error: "No guess provided" }, { status: 400 });
  }

  const correct = guess === CORRECT_ANSWER;

  if (correct) {
    // Upsert into final_progress table
    await supabase.from("final_progress").upsert(
      { user_id: user.id, solved: true, answer: guess, solved_at: new Date().toISOString() },
      { onConflict: "user_id" }
    );
  }

  return NextResponse.json({ correct });
}