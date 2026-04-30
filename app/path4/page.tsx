import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import StepForm from "./StepForm4";
import FinalUnlock from "@/components/FinalUnlock";

console.log("StepForm type:", typeof StepForm, StepForm);
console.log("FinalUnlock type:", typeof FinalUnlock, FinalUnlock);

export const dynamic = "force-dynamic";

export default async function Path4Page() {
  const supabase = await createSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) redirect("/login");

  const { data: existing } = await supabase
    .from("progress")
    .select("step")
    .eq("user_id", user.id)
    .eq("path", "path4")
    .maybeSingle();

  if (!existing) {
    await supabase.from("progress").insert({ user_id: user.id, path: "path4" });
  }

  const { data: prog } = await supabase
    .from("progress")
    .select("step, wrong_attempts, locked_until, answers")
    .eq("user_id", user.id)
    .eq("path", "path4")
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
  <h1 style={{ margin: 0 }}>Path 4</h1>

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
        🎉 You have completed all the steps for Path 4! Your final secret letter is:{" "}
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
            src="/path4/rebus-step1.png"
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

        {unlockedStep === 1 ? <StepForm path="path4" step={1} /> : 
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
        Find the Asian garden path near the Place of Peace. This will guide you to the <i>right</i> name. <br />
        Your password is a first name and a last name, which should be entered with no spaces and in all lower-case letters.
      </p>


      {/* FORM ONLY IF CURRENT STEP; OTHERWISE SHOW COMPLETED */}
      {unlockedStep === 2 ? (
        <StepForm path="path4" step={2} />
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
      <p>The Eco Cabins should help in finding an important name for the next location.
        However, some things need to be reorganized. Your next passowrd is six letters long, all in lower-case.
      </p>
      {/* FORM ONLY IF CURRENT STEP; OTHERWISE SHOW COMPLETED */}
      {unlockedStep === 3 ? (
        <StepForm path="path4" step={3} />
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
      Look for something nearby the Eco cabins that is missing in one world but present in another. 
      Your next password is a single four-letter word, all in lower-case.
      </p>
      {/* FORM ONLY IF CURRENT STEP; OTHERWISE SHOW COMPLETED */}
      {unlockedStep === 4 ? (
        <StepForm path="path4" step={4} />
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
      If you are standing at the Chiles bell, then you will be pointed in the right direction towards your next location. 
      Your next password is two words, all lower-case and no spaces.
      </p>

      {/* FORM ONLY IF CURRENT STEP; OTHERWISE SHOW COMPLETED */}
      {unlockedStep === 5 ? (
        <StepForm path="path4" step={5} />
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
        Solve this puzzle to get your desired letter from this puzzle sequence. A <b>morsel</b> on the map from a location you visited earlier might be needed to read the end of this puzzle. <br />
        Puzzle: [(center + top)/right\] + top + bottom $ ****** <br />
        Your password is a single letter, lower-case. If you make three incorrect guesses, you will be timed out.
        </p>

      {/* FORM ONLY IF CURRENT STEP; OTHERWISE SHOW COMPLETED */}
      {/* FORM ONLY IF CURRENT STEP; OTHERWISE SHOW COMPLETED */}
      {unlockedStep === 6 && !answers["6"] ? (
  <StepForm path="path4" step={6} />
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
