import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Cinzel, Uncial_Antiqua } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"] });
const medieval = Uncial_Antiqua({ subsets: ["latin"], weight: "400" });

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user ?? null;

  const MAX_STEP = 6;

  const { data: allProgress } = user
    ? await supabase
        .from("progress")
        .select("path, step, answers")
        .eq("user_id", user.id)
    : { data: null };

  const completedAllPaths = ["path1", "path2", "path3", "path4"].every((path) => {
    const p = allProgress?.find((row) => row.path === path);
    return p && p.step === MAX_STEP && p.answers?.[String(MAX_STEP)];
  });

  return (
    <main
  style={{
    minHeight: "100vh",
    padding: "2rem 1.5rem",

    // parchment background
    backgroundColor: "#f3ead7",

    // subtle texture feel
    backgroundImage:
      "radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)",
    backgroundSize: "6px 6px",

    fontFamily: "Georgia, 'Times New Roman', serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "3rem",

    // subtle “framed manuscript” feel
    border: "12px solid #5a4632",
    boxSizing: "border-box",
  }}
>
  {/* HEADER */}
  <header style={{ textAlign: "center" }}>
  <div
    style={{
      width: "120px",
      height: "2px",
      background: "#5a4632",
      margin: "0 auto 1rem",
      opacity: 0.6,
    }}
  />

<h1
  className={medieval.className}
  style={{
    fontSize: "clamp(1.4rem, 4vw, 4.5rem)",
    marginTop: "0",
    marginBottom: "0.5rem",
    letterSpacing: "2px",
    lineHeight: "1.3",
    textTransform: "uppercase",
    textAlign: "center",
    maxWidth: "100%",
    wordBreak: "break-word",
  }}
>
  ⚜ Furman Cartographer's ⚜<br />
  Society 
</h1>

  <div
    style={{
      width: "120px",
      height: "2px",
      background: "#5a4632",
      margin: "1rem auto 0",
      opacity: 0.6,
    }}
  />

    {user ? (
      <p style={{ fontSize: "0.9rem", opacity: 0.7, marginTop: "2rem" }}>
        Logged in as: {user?.email} | <a href="/auth/logout">Log out</a>
      </p>
    ) : (
      <Link href="/login">Log in</Link>
    )}
  </header>

  {/* INTRO + PATHS */}
  <section
    style={{
      maxWidth: "750px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    }}
  >
    <p style={{ lineHeight: "1.6", fontSize: "1.1rem" }}>
      <strong style={{ fontSize: "1.3rem" }}>
        Greetings, puzzle enthusiasts!
      </strong>
      <br /><br />
      Before you lie four paths, each containing a sequence of puzzles to solve.
      Some will test your wits alone, while others will require the use of
      <em> curious maps</em>, <em>Furman’s campus</em>, or both.
      <br /><br />
      At the end of each path, you will obtain a letter. Be sure to keep track of
      all four letters as you progress through your adventure.
      <br /><br />
      <strong>
        These letters are the key to a final puzzle—
      </strong>{" "}
      one that will reveal the location of the missing Bell Tower clock and restore
      order to campus.
    </p>

{/* PATH BUTTONS */}
<nav
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    flexWrap: "wrap",
  }}
>
  {["path1", "path2", "path3", "path4"].map((path, i) => (
    <Link
      key={path}
      href={`/${path}`}
      style={{
        padding: "0.6rem 1.2rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        textDecoration: "none",
        fontSize: "1rem",
      }}
    >
      Path {i + 1}
    </Link>
  ))}
  {completedAllPaths && (
    <Link
      href="/final"
      style={{
        padding: "0.6rem 1.2rem",
        border: "1px solid #5a4632",
        borderRadius: "8px",
        textDecoration: "none",
        fontSize: "1rem",
        fontWeight: "bold",
        color: "#5a4632",
      }}
    >
      🔓 Final Puzzle
    </Link>
  )}
</nav>
  </section>

  {/* MAPS */}
  <section style={{ width: "100%", maxWidth: "1000px" }}>
    <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>Maps</h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1.25rem",
      }}
    >
      {[1, 2, 3].map((num) => (
        <a
          key={num}
          href={`/maps/map${num}.pdf`}
          target="_blank"
          rel="noreferrer"
        >
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <Image
              src={`/maps/thumbs/map${num}.png`}
              alt={`Map ${num}`}
              width={800}
              height={600}
              style={{ width: "100%", height: "auto" }}
            />
            <div style={{ padding: "0.75rem", textAlign: "center" }}>
              Map {num} (PDF)
            </div>
          </div>
        </a>
      ))}
    </div>
  </section>

  {/* STORY */}
<section
  style={{
    maxWidth: "750px",
    padding: "2.5rem",
    lineHeight: "1.7",
    fontSize: "1.05rem",

    // parchment base
    background: "#f7f1e3",

    // medieval frame feel
    border: "6px double #5a4632",
    borderRadius: "10px",

    // inner shadow for depth
    boxShadow: "inset 0 0 0 2px #d6c6a8, 0 8px 20px rgba(0,0,0,0.15)",

    position: "relative",
  }}
  >
    <p><strong>A Rift in Time</strong></p>

    <p>
      In the shadow of the Furman Bell Tower, a temporal rift has opened between our campus and the Kingdom of Furman, a medieval realm where magic governs the land and dragons circle the skies. This fragile balance is held by the Bell Tower clock, a legendary artifact that anchors the two timelines.
    </p>

    <p>
      However, the peace has been shattered by Arthur the Clock Thief, a man who has used dark magic to survive centuries just to fulfill his mission for the charismatic but power-hungry King Cassian. On the King's orders, Arthur has stolen the clock from the Bell Tower, causing the medieval world to "bleed" into our own, starting with textbooks turning into vellum and potentially ending with the modern campus disappearing entirely.
    </p>

    <p>
      As a ragtag group of puzzle-solvers, you are the university's last line of defense. Your only hope lies with The Dame, a secret magician hiding in plain sight as a campus cook. She risks execution to feed you the clues needed to recover the clock.
    </p>

    <p>
      With assistance from the Dame, you must outmaneuver King Cassian and find the clock so it can be returned to its rightful place before the modern world is overwritten by the Kingdom of Furman forever!
    </p>
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
</main>
  );
}