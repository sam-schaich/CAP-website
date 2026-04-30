import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import FinalForm from "./FinalForm";

export const dynamic = "force-dynamic";

export default async function FinalPage() {
  const supabase = await createSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) redirect("/login");

  const MAX_STEP = 6;

  const { data: allProgress } = await supabase
    .from("progress")
    .select("path, step, answers")
    .eq("user_id", user.id);

  const completedAllPaths = ["path1", "path2", "path3", "path4"].every((path) => {
    const p = allProgress?.find((row) => row.path === path);
    return p && p.step === MAX_STEP && p.answers?.[String(MAX_STEP)];
  });

  if (!completedAllPaths) redirect("/");

  // Collect the four letters in path order
  const letters = ["path1", "path2", "path3", "path4"].map((path) => {
    const p = allProgress?.find((row) => row.path === path);
    return p?.answers?.["6"] ?? "?";
  });

  // Check if final puzzle already solved
  const { data: finalProg } = await supabase
    .from("final_progress")
    .select("solved, answer")
    .eq("user_id", user.id)
    .maybeSingle();

  const alreadySolved = finalProg?.solved ?? false;

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "24px",
        fontFamily: "Georgia, 'Times New Roman', serif",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      {/* Nav */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.8rem", letterSpacing: "0.02em" }}>
          🔓 Final Puzzle
        </h1>
        <nav style={{ display: "flex", gap: 12 }}>
          <Link href="/">Home</Link>
          <Link href="/path1">Path 1</Link>
          <Link href="/path2">Path 2</Link>
          <Link href="/path3">Path 3</Link>
          <Link href="/path4">Path 4</Link>
        </nav>
      </div>

      <hr style={{ margin: "16px 0" }} />

      {/* Intro */}
      <section style={{ marginBottom: 32 }}>
        <p>
          Between the four sets of puzzles, you should have gathered four letters. You first need
          to put these letters in the correct order based on the following riddle. Once these
          letters are in the correct order, they still might not make a word and you will have one
          more puzzle to solve!
        </p>
      </section>

      {/* Letters collected */}
      <section style={{ marginBottom: 32 }}>
        <h2>Your Four Letters</h2>
        <p style={{ marginBottom: 12 }}>
          Here are the letters you collected:
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {["path1", "path2", "path3", "path4"].map((path, i) => (
            <div
              key={path}
              style={{
                border: "2px solid #5a4632",
                borderRadius: 8,
                padding: "12px 20px",
                textAlign: "center",
                minWidth: 80,
              }}
            >
              <div style={{ fontSize: "0.75rem", color: "#888", marginBottom: 4 }}>
                Path {i + 1}
              </div>
              <div style={{ fontSize: "2rem", fontWeight: "bold", letterSpacing: 2 }}>
                {letters[i]}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Riddle */}
      <section style={{ marginBottom: 32 }}>
        <h2>The Ordering Riddle</h2>
        <p style={{ marginBottom: 8 }}>
          Use this riddle to determine the correct order of your four letters:
        </p>
        <blockquote
          style={{
            borderLeft: "4px solid #5a4632",
            paddingLeft: 20,
            marginLeft: 0,
            fontStyle: "italic",
            lineHeight: 2,
          }}
        >
          "To find the clock lost in time,<br />
          You must first begin where paths will wind,<br />
          Then seek the knight cast in stone,<br />
          To the library we have flown,<br />
          The Eco cabins are in sight,<br />
          Find this clock before tonight!"
        </blockquote>
      </section>

      {/* Final cipher clue */}
      <section style={{ marginBottom: 32 }}>
        <h2>One More Puzzle</h2>
        <p>
          The four ordered letters you now have might have been moved out of place, in a{" "}
          <strong>shifty</strong> way we saw at the end of Base. Your password is a four letter
          word, all lower case!
        </p>
      </section>

      {/* Form or solved state */}
      <section style={{ marginBottom: 32 }}>
        <h2>Enter Your Password</h2>
        {alreadySolved ? (
          <div
            style={{
              padding: "20px 24px",
              border: "2px solid #2d6a2d",
              borderRadius: 12,
              background: "#f0faf0",
            }}
          >
            <p style={{ margin: 0, fontSize: "1.2rem" }}>
              🎉 <strong>Congratulations!</strong> You have solved the final puzzle! The answer
              was: <strong>{finalProg?.answer}</strong>
            </p>
            <p style={{ marginTop: 12, marginBottom: 0 }}>
              Well done on completing all four paths and the final puzzle!
            </p>
          </div>
        ) : (
          <FinalForm />
        )}
      </section>

      {/* Footer */}
      <footer
        style={{
          marginTop: "3rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid #d6c6a8",
          width: "100%",
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
          <p style={{ fontSize: "0.8rem", marginTop: "0.25rem" }}>Furman Mathematics</p>
          <Image src="/logos/FHCBlack.svg" alt="FHC Logo" width={80} height={80} />
          <p style={{ fontSize: "0.8rem", marginTop: "0.25rem" }}>Furman Art</p>
        </div>
      </footer>
    </main>
  );
}
