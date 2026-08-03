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
    marginTop: 0,
    marginBottom: "0.5rem",
    letterSpacing: "2px",
    lineHeight: "1.3",
    textTransform: "uppercase",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.5rem",

    flexWrap: "nowrap",
    whiteSpace: "nowrap",
  }}
>
<Image
  src="/logos/paladin-puzzlers-logo.png"
  alt=""
  width={0}
  height={0}
  sizes="100vw"
  style={{
    width: "clamp(30px, 4vw, 55px)",
    height: "auto",
    borderRadius: "8px",
  }}
/>

  <span>Paladin Puzzlers</span>

<Image
  src="/logos/paladin-puzzlers-logo.png"
  alt=""
  width={0}
  height={0}
  sizes="100vw"
  style={{
    width: "clamp(30px, 4vw, 55px)",
    height: "auto",
    borderRadius: "8px",
  }}
/>
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


{/* STORY */}
<section
  className="scroll-section"
  style={{
    position: "relative",
    maxWidth: "1300px",
    margin: "0 auto",

    backgroundImage: "url('/dame_scroll.webp')",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center top",

    minHeight: "800px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  {/* Text sits over the scroll area */}
  <div className="scroll-text">
    <p style={{ marginBottom: "0.6em" }}>
      <strong>A Rift in Time</strong>
    </p>

    <p>
      When Bell Tower's clock was torn away,
      Two worlds began to bleed and sway.
      The Dame now hides with clues in hand;
      Outsmart the King, restore the land.
      Find the clock before it's gone,
      Or modern Furman fades at dawn.
    </p>
  </div>
</section>



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
      Before you lie four paths, each containing a linear sequence of puzzles to solve.
      Some will test your wits alone, while others will require the use of
       curious maps, Furman's campus, or both. We'd recommend downloading or printing out these curious maps before you embark on your puzzle journey.
      <br /><br />
      At the end of each path, you should obtain a letter. Be sure to keep track of
      all four letters as you progress through your adventure.
      <br /><br />
      <strong>
        These letters are the key to a final puzzle,
      </strong>{" "}
      one that will reveal the location of the missing Bell Tower clock and restore
      order to campus!
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
  {[
    { name: "Path 1", href: "/path1" },
    { name: "Path 2", href: "/path2" },
    { name: "Path 3", href: "/path3" },
    { name: "Path 4", href: "/path4" },
    { name: "About", href: "/about" },
  ].map((item) => (
    <Link
      key={item.href}
      href={item.href}
      style={{
        padding: "0.6rem 1.2rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        textDecoration: "none",
        fontSize: "1rem",
      }}
    >
      {item.name}
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
              src={`/maps/thumbs/map${num}.webp`}
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
