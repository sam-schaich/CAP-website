import Link from "next/link";
import Image from "next/image";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "3rem",
        fontFamily: "system-ui",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2.5rem",
      }}
    >
      <header style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem", margin: 0 }}>Puzzle Research Project</h1>
      </header>

      <div style={{ marginBottom: "2rem" }}>
        {user ? (
          <>
            <p>Logged in as: {user.email}</p>
            <a href="/auth/logout">Log out</a>

          </>
        ) : (
          <Link href="/login">Log in</Link>
        )}
        <p
  style={{
    maxWidth: "700px",
    margin: "2rem auto",
    lineHeight: "1.6",
    fontSize: "1.1rem",
    textAlign: "center",
  }}
>
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
      </div>
      {/* Puzzle links (horizontal) */}
      <nav
        style={{
          display: "flex",
          gap: "1.25rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Link href="/path1" style={{ fontSize: "1.25rem" }}>
          Path 1
        </Link>
        <Link href="/path2" style={{ fontSize: "1.25rem" }}>
          Path 2
        </Link>
        <Link href="/path3" style={{ fontSize: "1.25rem" }}>
          Path 3
        </Link>
        <Link href="/path4" style={{ fontSize: "1.25rem" }}>
          Path 4
        </Link>
      </nav>


      {/* Map PDFs section */}
      <section style={{ width: "100%", maxWidth: 900 }}>
        <h2 style={{ marginBottom: "1rem" }}>Maps</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {/* Map 1 */}
          <a href="/maps/map1.pdf" target="_blank" rel="noreferrer">
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <Image
                src="/maps/thumbs/map1.png"
                alt="Map 1"
                width={800}
                height={600}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <div style={{ padding: "0.75rem" }}>Map 1 (PDF)</div>
            </div>
          </a>

          {/* Map 2 */}
          <a href="/maps/map2.pdf" target="_blank" rel="noreferrer">
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <Image
                src="/maps/thumbs/map2.png"
                alt="Map 2"
                width={800}
                height={600}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <div style={{ padding: "0.75rem" }}>Map 2 (PDF)</div>
            </div>
          </a>

          {/* Map 3 */}
          <a href="/maps/map3.pdf" target="_blank" rel="noreferrer">
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <Image
                src="/maps/thumbs/map3.png"
                alt="Map 3"
                width={800}
                height={600}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <div style={{ padding: "0.75rem" }}>Map 3 (PDF)</div>
            </div>
          </a>
        </div>
      </section>
    </main>
  );
}
