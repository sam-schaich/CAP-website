import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { default as StepForm } from "./StepForm3";
import FinalUnlock from "@/components/FinalUnlock";

export const dynamic = "force-dynamic";

export default async function Path3Page() {
  const supabase = await createSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) redirect("/login");

  const { data: existing } = await supabase
    .from("progress")
    .select("step")
    .eq("user_id", user.id)
    .eq("path", "path3")
    .maybeSingle();

  if (!existing) {
    await supabase.from("progress").insert({ user_id: user.id, path: "path3" });
  }

  const { data: prog } = await supabase
    .from("progress")
    .select("step, wrong_attempts, locked_until, answers")
    .eq("user_id", user.id)
    .eq("path", "path3")
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
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 900, margin: "0 auto" }}>
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  }}
>
  <h1 style={{ margin: 0 }}>Path 3</h1>

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
        🎉 You have completed all the steps for Path 3! Your final secret letter is:{" "}
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
            src="/path3/rebus-step1.png"
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

        {unlockedStep === 1 ? <StepForm path="path3" step={1} /> : 
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
  ) : (
    <>
      {/* TEXT ALWAYS VISIBLE ONCE UNLOCKED */}
      <p>
        You got it. Now <b>search</b> closely in the parking lot (near the <b>
        pigpen</b>, and <b>decipher</b> the three word message hidden there. Enter the three words to go to the next step. 
        Use all lower case, and include spaces between the words.)
      </p>


      {/* FORM ONLY IF CURRENT STEP; OTHERWISE SHOW COMPLETED */}
      {unlockedStep === 2 ? (
        <StepForm path="path3" step={2} />
      ) : unlockedStep > 2 ? (
        <p>
          ✅ Completed.{" "}
          {answers?.["2"] ? (
            <>
              <span style={{ opacity: 0.7 }}>Answer:</span>{" "}
              <strong>{answers["2"]}</strong>
            </>
          ) : null}
        </p>
      ) : null}
    </>
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
      <p>Great. That clue should tell you where you need to go. As you wind your way
        toward this place, be thinking about how you can use the following image to discover
        a single five letter code word. Enter it in all lowercase.
      </p>
           <div style={{ margin: "16px 0" }}>
              <Image
                src="/path3/step3.png"
                alt="A wheel of numbers"
                width={900}
                height={600}
                style={{ width: "100%", height: "auto", borderRadius: 12, border: "1px solid #ddd" }}
              />
            </div>
      {/* FORM ONLY IF CURRENT STEP; OTHERWISE SHOW COMPLETED */}
      {unlockedStep === 3 ? (
        <StepForm path="path3" step={3} />
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
      Wonderful. You are now likely standing in (or near) Furman's labrynth.
      Here is another image of a labrynth. Find your way out of this beautifl green space, and let your path 
      show the way to the next phrase, which also provides your next instructions. Enter the fourth word of the phrase,
      all in lowercase.  
      </p>

          <div style={{ margin: "16px 0" }}>
              <Image
                src="/path3/step4.png"
                alt="A labrynth with letters scattered throughout"
                width={900}
                height={600}
                style={{ width: "100%", height: "auto", borderRadius: 12, border: "1px solid #ddd" }}
              />
            </div>
      {/* FORM ONLY IF CURRENT STEP; OTHERWISE SHOW COMPLETED */}
      {unlockedStep === 4 ? (
        <StepForm path="path3" step={4} />
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
       Success. Now follow the directions in that phrase so you will be in a good
       position to solve the following riddle.
      </p>
      <p><b>The Watchful Wall</b></p>
      <div style={{ height: 24 }} />
      <p>
        Two eyes of glass, both cold and clear, <br />
        Each pierced by arrows drawing near. <br />
        Twelve in total, tips aligned, <br />
        A gaze that sees but speaks no mind. <br />
        <br />
        They do not blink, they do not cry, <br />
        Just watch the world go drifting by. <br />
        Surrounded tight by stony skin, <br />
        <b>Eyelashes,</b> of sorts, that hold them in <br />
        <br />
        To break the spell or lift the veil, <br />
        <b>enumeration</b> is the next stage of your tale. <br />
        <br />
        <br />
        Enter your three digit password.
        </p>


      {/* FORM ONLY IF CURRENT STEP; OTHERWISE SHOW COMPLETED */}
      {unlockedStep === 5 ? (
        <StepForm path="path3" step={5} />
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
        Great work! You are now at the final stage of this collection of puzzles,
        and the secret letter you seek is in plain sight. <br />
        <br />
        When the morning shadow forms a mirror, what letter sees itself in the reflection?
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
      {unlockedStep === 6 && !answers["6"] ? (
  <StepForm path="path3" step={6} />
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

{typeof completedAllPaths === "boolean" && (
  <FinalUnlock unlocked={completedAllPaths} />
)}
    </main>
    
  );
}
