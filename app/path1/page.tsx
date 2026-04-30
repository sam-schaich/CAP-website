import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import StepForm from "./step-form";
import Step2Client from "./step2-client";
import FinalUnlock from "@/components/FinalUnlock";

export const dynamic = "force-dynamic";

export default async function Path1Page() {
  const supabase = await createSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) redirect("/login");

  const { data: existing } = await supabase
    .from("progress")
    .select("step")
    .eq("user_id", user.id)
    .eq("path", "path1")
    .maybeSingle();

  if (!existing) {
    await supabase.from("progress").insert({ user_id: user.id, path: "path1" });
  }

  const { data: prog } = await supabase
    .from("progress")
    .select("step, wrong_attempts, locked_until, answers")
    .eq("user_id", user.id)
    .eq("path", "path1")
    .single();

  const unlockedStep = prog?.step ?? 1;
  const answers = (prog?.answers ?? {}) as Record<string, string>;

  const MAX_STEP = 6;
  const completedPath = unlockedStep === MAX_STEP && Boolean(answers["6"]);

  const { data: allProgress } = await supabase
  .from("progress")
  .select("path, step, answers")
  .eq("user_id", user.id);

  const completedAllPaths = ["path1", "path2", "path3", "path4"].every((path) => {
  const p = allProgress?.find((row) => row.path === path);
  return p && p.step === MAX_STEP && p.answers?.[String(MAX_STEP)];
  });

  return (
    <main style={{ padding: 24, fontFamily: "Georgia, 'Times New Roman', serif", maxWidth: 900, margin: "0 auto" }}>
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  }}
>
  <h1 style={{ margin: 0 }}>Path 1</h1>

<nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
  <Link href="/">Home</Link>
  <Link href="/path1">Path 1</Link>
  <Link href="/path2">Path 2</Link>
  <Link href="/path3">Path 3</Link>
  <Link href="/path4">Path 4</Link>
  {completedAllPaths && (
    <Link
      href="/final"
      style={{
        fontWeight: "bold",
        color: "#5a4632",
        border: "1px solid #5a4632",
        padding: "2px 10px",
        borderRadius: 6,
      }}
    >
      🔓 Final Puzzle
    </Link>
  )}
</nav>
</div>


      <p style={{ marginTop: 8 }}>
        Current unlocked step: <strong>{unlockedStep}</strong> / 6
      </p>

      {completedPath && (
        <p style={{ marginTop: 8 }}>
        🎉 You have completed all the steps for Path 1! Your final secret letter is:{" "}
        <strong>{answers["6"]}</strong>
        </p>
      )}

      <hr style={{ margin: "16px 0" }} />

      {/* STEP 1 */}
      <section style={{ marginBottom: 32 }}>
        <h2>Step 1</h2>
        <p>
          Solve the following rebus puzzle to determine which region of campus to start examining
          for this particular set of puzzles.
        </p>

        <div style={{ margin: "16px 0" }}>
          <Image
            src="/path1/rebus-step1.png"
            alt="Rebus puzzle for Step 1"
            width={900}
            height={600}
            style={{ width: "100%", height: "auto", borderRadius: 12, border: "1px solid #ddd" }}
          />
        </div>

        <p>
          Your answer is the password to the next step. Enter it here{" "}
          <strong>(no spaces, all lower case)</strong>.
        </p>

        {unlockedStep === 1 ? <StepForm path="path1" step={1} /> : 
        <p>
          ✅ Completed.{" "}
          {answers["1"] ? (
          <>
          <span style={{ opacity: 0.7 }}>Answer:</span> <strong>{answers["1"]}</strong>
          </>  ) : null}    
        </p>}
      </section>

{/* STEP 2 */}
<section style={{ marginBottom: 32 }}>
  <h2>Step 2</h2>

  {unlockedStep < 2 ? (
    <p>🔒 Locked. Complete Step 1 to unlock.</p>
  ) : unlockedStep > 2 ? (
    <><div style={{ display: "grid", gap: 12 }}>
              <p>
                Welcome to the Milford Mall Plaque. Start by facing the plaque. In order to solve the next
                puzzle, you need to walk (or swim) past B. Plyler, but don’t go past E. Blackwell. When you
                are in the correct spot, you should have all you need to solve the next riddle, which is …
              </p>

              <p>
                The letters in the sequences below represent missing numbers. You need to find those
                numbers! Once you find them, enter them as a seven digit number which is your password.
                Put them in A, B, C … order.
              </p>

              <div
                style={{
                  fontFamily: "monospace",
                  whiteSpace: "pre",
                  background: "#f7f7f7",
                  padding: 12,
                  borderRadius: 8,
                }}
              >
                0<br />
                1<br />
                A<br />
                5<br />
                3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0&nbsp;0&nbsp;E&nbsp;F&nbsp;G&nbsp;5&nbsp;1&nbsp;0&nbsp;0<br />
                B<br />
                C<br />
                3<br />
                D
              </div>
            </div><p>
                ✅ Completed.{" "}
                {answers["2"] ? (
                  <>
                    <span style={{ opacity: 0.7 }}>Answer:</span> <strong>{answers["2"]}</strong>
                  </>) : null}
              </p></>
  ) : (
    <Step2Client />
  )}
</section>

{/* STEP 3 */}
<section style={{ marginBottom: 32 }}>
  <h2>Step 3</h2>

  {unlockedStep < 3 ? (
    <p>🔒 Locked. Complete Step 2 to unlock.</p>
  ) : (
    <>
      {/* RIDDLE ALWAYS VISIBLE ONCE UNLOCKED */}
      <p>You got it. Well done. Here is your next riddle...</p>
      <div style={{ height: 24 }} />
      <p>
        Between the halls where pages sleep <br />
        and the roof that gathers hymns,<br />
        two voiceless springs keep watch.<br />
        The first stands where silence lingers,<br />
        counting thoughts that drift like dust.<br />
        The second sits closer to a pointed spire,<br />
        still as prayer, and just as deep.<br />
        Let present eyes be still;<br />
        peer instead through the looking-glass of yesterday,<br />
        and their forms will speak in letters scrambled,<br />
        lights on high and darks in the depths.<br />
        Name the first, then the second—<br />
        a pair in uppercase, no spaces—<br />
        to unlock what you seek.<br />
      </p>

      {/* FORM ONLY IF CURRENT STEP; OTHERWISE SHOW COMPLETED */}
      {unlockedStep === 3 ? (
        <StepForm path="path1" step={3} />
      ) : unlockedStep > 3 ? (
        <p>
          ✅ Completed.{" "}
          {answers?.["3"] ? (
            <>
              <span style={{ opacity: 0.7 }}>Answer:</span>{" "}
              <strong>{answers["3"]}</strong>
            </>
          ) : null}
        </p>
      ) : null}
    </>
  )}
</section>



{/* STEP 4 */}
<section style={{ marginBottom: 32 }}>
  <h2>Step 4</h2>

  {unlockedStep < 4 ? (
    <p>🔒 Locked. Complete Step 3 to unlock.</p>
  ) : (
    <>
      {/* TEXT ALWAYS VISIBLE ONCE UNLOCKED */}
      <p>
        You now need to combine your last two passwords and then visit the Duke to inquire about
        this artifact. Your next password is the first name of another puzzle master that you may just
        run across at the end of your search. Lower case letters only.
      </p>

      {/* FORM ONLY IF CURRENT STEP; OTHERWISE SHOW COMPLETED */}
      {unlockedStep === 4 ? (
        <StepForm path="path1" step={4} />
      ) : unlockedStep > 4 ? (
        <p>
          ✅ Completed.{" "}
          {answers?.["4"] ? (
            <>
              <span style={{ opacity: 0.7 }}>Answer:</span>{" "}
              <strong>{answers["4"]}</strong>
            </>
          ) : null}
        </p>
      ) : null}
    </>
  )}
</section>

{/* STEP 5 */}
<section style={{ marginBottom: 32 }}>
  <h2>Step 5</h2>

  {unlockedStep < 5 ? (
    <p>🔒 Locked. Complete Step 4 to unlock.</p>
  ) : (
    <>
      {/* TEXT ALWAYS VISIBLE ONCE UNLOCKED */}
      <p>
        Well done! You are holding in your hands a wonderful little book. If you are not holding it, go
        get it at the circulation desk!
      </p>
      <div style={{ height: 24 }} />
      <p>
        Like our puzzle adventure, <i>The Eleventh Hour</i> is a mystery wrapped up in time. While there may
        not be any missing clocks in the book, the ones that are there point to some important clues for
        both mysteries. Take a few MINUTES to find the next password, which is a three digit number
        based on the following:
      </p>
      <div style={{ height: 24 }} />
      <p>(billiards + kitchen) * (cricket + chess)</p>

      {/* FORM ONLY IF CURRENT STEP; OTHERWISE SHOW COMPLETED */}
      {unlockedStep === 5 ? (
        <StepForm path="path1" step={5} />
      ) : unlockedStep > 5 ? (
        <p>
          ✅ Completed.{" "}
          {answers?.["5"] ? (
            <>
              <span style={{ opacity: 0.7 }}>Answer:</span>{" "}
              <strong>{answers["5"]}</strong>
            </>
          ) : null}
        </p>
      ) : null}
    </>
  )}
</section>

{/* STEP 6 */}
<section style={{ marginBottom: 32 }}>
  <h2>Step 6</h2>

  {unlockedStep < 6 ? (
    <p>🔒 Locked. Complete Step 5 to unlock.</p>
  ) : (
    <>
      {/* TEXT ALWAYS VISIBLE ONCE UNLOCKED */}
      <p>
        Great timing on your part! You are now at the final stage of this collection of puzzles, and the
        secret letter you seek is in the book you are holding.
      </p>
      <div style={{ height: 24 }} />
      <p>
        The guests are gathered twice for fare, <br />
        but only one feast asks questions. <br />
        On that second occasion, <br />
        letters fall into place-- <br />
        not words, but patters waiting to be seen. <br />
      </p>
      <div style={{ height: 24 }} />
      <p>
        Among them, a mark stands apart <br />
        not a letter, but a cry. <br />
        It startles from its square, <br />
        punctuation where there should be form. <br />
      </p>
      <div style={{ height: 24 }} />
      <p>
        From that point, step with care-- <br />
        three times, <br />
        each one rising and to the left, <br />
        against the grain of reading and time. <br />
      </p>
      <div style={{ height: 24 }} />
      <p>There, the answer awaits.</p>

      {/* FORM ONLY IF CURRENT STEP; OTHERWISE SHOW COMPLETED */}
      {/* FORM ONLY IF CURRENT STEP; OTHERWISE SHOW COMPLETED */}
      {unlockedStep === 6 && !answers["6"] ? (
  <StepForm path="path1" step={6} />
      ) : answers["6"] ? (
      <p>
        ✅ Completed.{" "}
      <span style={{ opacity: 0.7 }}>Answer:</span>{" "}
      <strong>{answers["6"]}</strong>
      </p>
      ) : null}
    </>
  )}

</section>
{typeof completedAllPaths === "boolean" && (
  <FinalUnlock unlocked={completedAllPaths} />
)}
<footer
  style={{
    marginTop: "3rem",
    paddingTop: "1.5rem",
    borderTop: "1px solid #d6c6a8",
    width: "100%",
    maxWidth: "900px",
    textAlign: "center",
  }}
>

  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "2rem",
      flexWrap: "wrap",
    }}
  >

      <p style={{ fontSize: "0.8rem", marginTop: "0.25rem" }}>
        Furman Mathematics
      </p>
    {/* Main logo */}
    <Image
      src="/logos/FHCBlack.svg"
      alt="FHC Logo"
      width={80}
      height={80}
    />

      <p style={{ fontSize: "0.8rem", marginTop: "0.25rem" }}>
        Furman Art
      </p>
  </div>
</footer>
     

    </main>
  );
}
