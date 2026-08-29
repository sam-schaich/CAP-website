import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { default as StepForm } from "./StepForm2";
import FinalUnlock from "@/components/FinalUnlock";
import { Cinzel, Uncial_Antiqua } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"] });
const medieval = Uncial_Antiqua({ subsets: ["latin"], weight: "400" });
export const dynamic = "force-dynamic";

export default async function Path2Page() {
  const supabase = await createSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) redirect("/login");

  const { data: existing } = await supabase
    .from("progress")
    .select("step")
    .eq("user_id", user.id)
    .eq("path", "path2")
    .maybeSingle();

  if (!existing) {
    await supabase.from("progress").insert({ user_id: user.id, path: "path2" });
  }

  const { data: prog } = await supabase
    .from("progress")
    .select("step, wrong_attempts, locked_until, answers")
    .eq("user_id", user.id)
    .eq("path", "path2")
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
 <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <h1
          className={medieval.className}
          style={{
            margin: 0,
            fontSize: "2.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
<Image
  src="/logos/paladin-puzzlers-logo.png"
  alt="Paladin Puzzlers Logo"
  width={45}
  height={45}
  style={{
    borderRadius: "8px",
    width: "1em",
    height: "1em",
  }}
/>
          Path 2
        </h1>


      </div>

<nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
  <Link href="/">Home</Link>
  <Link href="/path1">Path 1</Link>
  <Link href="/path2">Path 2</Link>
  <Link href="/path3">Path 3</Link>
  <Link href="/path4">Path 4</Link>
  <Link href="/about">About the Puzzlers</Link>
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


{/* Progress + Map Links */}
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "1rem",
    marginBottom: "2rem",
    flexWrap: "wrap",
    gap: "1rem",
  }}
>
  {/* Left */}
  <p
    style={{
      margin: 0,
      textAlign: "left",
    }}
  >
    Current unlocked step: <strong>{unlockedStep}</strong> / 6
  </p>

  {/* Right */}
  <div
    style={{
      display: "flex",
      gap: "0.75rem",
      flexWrap: "wrap",
      justifyContent: "flex-end",
    }}
  >
    {["map1", "map2", "map3"].map((map) => (
      <a
        key={map}
        href={`/maps/${map}.pdf`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          padding: "0.4rem 1rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "1rem",
        }}
      >
        {map.replace("map", "Map ")}
      </a>
    ))}
  </div>
</div>

      {completedPath && (
        <p style={{ marginTop: 8 }}>
        🎉 You have completed all the steps for Path 2! Your final secret letter is:{" "}
        <strong>{answers["6"]}</strong>
        </p>
      )}

      <hr style={{ margin: "16px 0" }} />

  {/* PUZZLE EXAMPLE */}
  <section style={{ marginBottom: 32 }}>
    <h2>Puzzle Example</h2>
  
    <div
      style={{
        margin: "16px 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        src="/RebusExample.jpeg"
        alt="Example rebus puzzle solving to 'ice cream'"
        width={450}
        height={300}
        style={{
          width: "100%",
          maxWidth: "450px",
          height: "auto",
          borderRadius: 12,
          border: "1px solid #ddd",
        }}
      />
    </div>
  
    <p>
      Each puzzle path will start with a rebus puzzle, which, when solved,
      will help provide some guidance on which portion of campus you will
      be adventuring around for that particular path. A rebus puzzle is a
      word puzzle that uses pictures, letters, symbols, or their spatial
      arrangement (size, position, repetition) to represent a word,
      syllable, or phrase. Solvers need to interpret the visual clues,
      often phonetically, to figure out the hidden message. For example,
      the image above is a rebus puzzle for which the solution is{" "}
      <strong>&quot;ice cream.&quot;</strong>
    </p>
  </section>

      {/* STEP 1 */}
      <section style={{ marginBottom: 32 }}>
        <h2>Step 1</h2>
        <p>
          Solve the following rebus puzzle to determine which region of campus to start examining
          for this particular set of puzzles.
        </p>

        <div style={{ margin: "16px 0",     display: "flex",
    justifyContent: "center", alignItems: "center" }}>
          <Image
            src="/path2/rebus-step1.webp"
            alt="Rebus puzzle for Step 1"
            width={450}
            height={300}
            style={{ width: "100%", maxWidth: "450px", height: "auto", borderRadius: 12, border: "1px solid #ddd" }}
          />
        </div>

        <p>
          Your answer is the password to the next step. Enter it here{" "}
          <strong>(no spaces, all lower case)</strong>.
        </p>

        {unlockedStep === 1 ? <StepForm path="path2" step={1} /> : 
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
        Your password is a player from team 3 followed by a player of team 5. Your password needs to be entered with no spaces, all lowercase.
      </p>


      <p>
        Your answer is the password to the next step. Enter it here{" "}
        <strong>(no spaces, all lower case)</strong>.
      </p>

      {/* FORM ONLY IF CURRENT STEP; OTHERWISE SHOW COMPLETED */}
      {unlockedStep === 2 ? (
        <StepForm path="path2" step={2} />
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
      <div style={{ height: 24 }} />
      <p>
Your last password should guide you to an important monument on campus. 
Your next password is a six-letter word found under the hair at your new location. 
Enter your password in all lower-case letters.
      </p>

      {/* FORM ONLY IF CURRENT STEP; OTHERWISE SHOW COMPLETED */}
      {unlockedStep === 3 ? (
        <StepForm path="path2" step={3} />
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
Your next password is two letters. Find what is missing from the royal family box. 
Enter your password in all lower-case letters. 
If you make three incorrect guesses, then you are timed out for 15 minutes.
      </p>

      {/* FORM ONLY IF CURRENT STEP; OTHERWISE SHOW COMPLETED */}
      {unlockedStep === 4 ? (
        <StepForm path="path2" step={4} />
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
We believe the two Furman F signs were stolen by a soldier who wanted to give them to a friend of the class of 1943. 
Find that friend’s middle name. This is your password and you will see why the FFs were important to her. 
Enter your password in all lower-case letters.
      </p>
      <div style={{ height: 24 }} />
      {/* FORM ONLY IF CURRENT STEP; OTHERWISE SHOW COMPLETED */}
      {unlockedStep === 5 ? (
        <StepForm path="path2" step={5} />
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
For your final task for this puzzle sequence, you must first determine who won the game on the Stone soccer field: the Crimson Knights or the Forest Archers. 
The winning team should help you draw a conclusion. 
To figure out how many points each team has, you will need to consult the map. 
</p>
      <div style={{ height: 24 }} />
      <p>
The Forest Archers scored as many points as there are tigers on the maps times the number of kayaks on Furman lake. 
The Crimson Knights scored as many points as the year Furman relocated to Greenville minus the year Furman was founded.
</p>
      <div style={{ height: 24 }} />
      <p> 
Your password is a single letter, lower-case. If you make three incorrect guesses, then you are timed out for an hour. 

      </p>

      

      {/* FORM ONLY IF CURRENT STEP; OTHERWISE SHOW COMPLETED */}
      {/* FORM ONLY IF CURRENT STEP; OTHERWISE SHOW COMPLETED */}
      {unlockedStep === 6 && !answers["6"] ? (
  <StepForm path="path2" step={6} />
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
    <Image
      src="/logos/math-logo.png"
      alt="Math Department Logo"
      width={100}
      height={100}
    />

    <Image
      src="/logos/FHCBlack.svg"
      alt="FHC Logo"
      width={80}
      height={80}
    />

    <Image
      src="/logos/FUArt_logo.png"
      alt="FU Art Logo"
      width={80}
      height={80}
    />

      <Image
        src="/logos/TCC Logo.png"
        alt="Cothran Center Logo"
        width={80}
        height={80}
    />
    
    {/* PP Logo */}
    <Image
      src="/logos/paladin-puzzlers-logo.png"  
      alt="Paladin Puzzlers Logo"
      width={50}
      height={50}
      style={{ borderRadius: "8px" }}
    />
  </div>
</footer>
     

    </main>
  );
}
