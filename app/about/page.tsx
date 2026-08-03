import Image from "next/image";
import Link from "next/link";
import { Cinzel, Uncial_Antiqua } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"] });
const medieval = Uncial_Antiqua({ subsets: ["latin"], weight: "400" });

export default function AboutPage() {
  return (
    <main
      style={{
        padding: 24,
        fontFamily: "Georgia, 'Times New Roman', serif",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      {/* Header */}
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
            fontSize: "2rem",
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
          About the Puzzlers
        </h1>

<nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link href="/">Home</Link>
          <Link href="/path1">Path 1</Link>
          <Link href="/path2">Path 2</Link>
          <Link href="/path3">Path 3</Link>
          <Link href="/path4">Path 4</Link>
          <Link href="/about">
            <strong>About the Puzzlers</strong>
          </Link>
        </nav>
      </div>

      <hr style={{ marginBottom: "2rem" }} />

      {/* Intro */}
      <section style={{ textAlign: "center", marginBottom: "2.5rem" }}>

        <h2
          className={medieval.className}
          style={{
            fontSize: "2rem",
            marginBottom: "1rem",
          }}
        >
          Paladin Puzzlers
        </h2>

        <p
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          The Paladin Puzzlers are a group of faculty, students, and (now)
          alumni dedicated to developing interactive puzzle hunts for the
          Furman community.
        </p>
      </section>

      {/* History */}
      <section
        style={{
          background: "#faf5ea",
          border: "1px solid #d6c6a8",
          borderRadius: 12,
          padding: "2rem",
          marginBottom: "2.5rem",
        }}
      >
        <h2
          className={medieval.className}
          style={{ marginTop: 0, marginBottom: "1.5rem" }}
        >
          Background and History
        </h2>

        <p style={{ lineHeight: 1.8, marginBottom: "1.25rem" }}>
          The broad idea of pursuing such a project initially came from
          Professor Christian Millichap (mathematics) who loves creating
          codebreaking scavenger hunts for cryptology classes but wanted to
          build something for a more general audience that implemented artistic
          work from the Furman community. It wasn’t until a Cothran Center
          Faculty Seminar in Ireland and Northern Ireland in summer 2022 that
          connections were made to get the ball rolling.
        </p>

        <p style={{ lineHeight: 1.8, marginBottom: "1.25rem" }}>
          Through this seminar, Professor Millichap shared his ideas with
          Professor Michael May (art) and Professor John Harris (mathematics),
          which also led to bringing Professor Sarah Archino (art history) into
          the group. The following academic year, these four professors applied
          for and received a Furman Humanities Center Collaborative Fellowship
          to learn about best practices for developing interdisciplinary
          narrative artwork that uses mathematical systems of embedded and
          connected puzzles, codes, and ciphers to visually present a mystery
          to be solved or story to tell.
        </p>

        <p style={{ lineHeight: 1.8 }}>
          Students Jordan White, Grace Houser, Sophie Ngo, and Sam Schaich
          joined the fellowship. During the 2023–2024 academic year, the group
          built off the faculty’s expertise and those of two visiting experts
          (Professor Lindsay Morse in Escape-the-Room design and Professor
          Beauvais Lyons in artistic storytelling) to start developing an
          initial story framework and plans for what ultimately became our
          <strong> "Back to the FUture"</strong> hunt.
        </p>
      </section>

      <section
        style={{
          background: "#faf5ea",
          border: "1px solid #d6c6a8",
          borderRadius: 12,
          padding: "2rem",
          marginBottom: "2.5rem",
        }}
      >
        <h2
          className={medieval.className}
          style={{ marginTop: 0, marginBottom: "1.5rem" }}
        >
          Building "Back to the FUture"
        </h2>

        <p style={{ lineHeight: 1.8, marginBottom: "1.25rem" }}>
          The bulk of the work on <strong>"Back to the FUture"</strong> was done
          in 2025 and 2026. Professor Harris and Professor Millichap worked on
          designing and testing the puzzles. Professor May worked on the drawing
          designs for the three campus maps, while Natalie Davis did the
          coloring for these maps.
        </p>

        <p style={{ lineHeight: 1.8, marginBottom: "1.25rem" }}>
          Sophie Ngo provided the main ideas for the story framework and
          designed the "Damsel with Scroll" artwork on the homepage. Some of the
          additional artwork, such as INSERT, were completed by INSERT. Sam
          Schaich developed our Paladin Puzzlers logo design and built the
          website.
        </p>

        <p style={{ lineHeight: 1.8 }}>
          Everyone from the original fellowship contributed in meaningful ways
          by providing inspiration, ideas, and feedback, even from students well
          after they graduated.
        </p>
      </section>

            {/* Acknowledgments */}
      <section
        style={{
          background: "#faf5ea",
          border: "1px solid #d6c6a8",
          borderRadius: 12,
          padding: "2rem",
          marginBottom: "2.5rem",
        }}
      >
        <h2
          className={medieval.className}
          style={{ marginTop: 0, marginBottom: "1.5rem" }}
        >
          Acknowledgments
        </h2>

        <p style={{ lineHeight: 1.8, margin: 0 }}>
          We would like to thank several corners of the Furman community for
          supporting this project: the Furman Humanities Center, the Cothran
          Center, the Furman Art Department, the Furman Mathematics Department,
          and all the members of the Furman community that served as puzzle
          testers!
        </p>
      </section>

      {/* Members */}
      <section style={{ marginBottom: "3rem" }}>
        <h2
          className={medieval.className}
          style={{
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Members
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          {/* Faculty */}
          <div
            style={{
              background: "#faf5ea",
              border: "1px solid #d6c6a8",
              borderRadius: 12,
              padding: "1.75rem",
            }}
          >
            <h3
              className={medieval.className}
              style={{
                marginTop: 0,
                marginBottom: "1rem",
              }}
            >
              Faculty Members
            </h3>

            <ul
              style={{
                lineHeight: 2,
                paddingLeft: "1.25rem",
                margin: 0,
              }}
            >
              <li>Sarah Archino (Art History)</li>
              <li>John Harris (Mathematics)</li>
              <li>Michael May (Art)</li>
              <li>Christian Millichap (Mathematics)</li>
            </ul>
          </div>

          {/* Students */}
          <div
            style={{
              background: "#faf5ea",
              border: "1px solid #d6c6a8",
              borderRadius: 12,
              padding: "1.75rem",
            }}
          >
            <h3
              className={medieval.className}
              style={{
                marginTop: 0,
                marginBottom: "1rem",
              }}
            >
              Student Members
            </h3>

            <ul
              style={{
                lineHeight: 2,
                paddingLeft: "1.25rem",
                margin: 0,
              }}
            >
              <li>Natalie Davis (2028)</li>
              <li>Grace Houser (2024)</li>
              <li>Sophie Ngo (2024)</li>
              <li>Sam Schaich (2027)</li>
              <li>Jordan White (2026)</li>
            </ul>
          </div>
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
      height={1000}
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