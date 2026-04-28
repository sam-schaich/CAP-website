"use client";

import { useState } from "react";
import StepForm from "./step-form";

export default function Step2Client() {
  const [arrived, setArrived] = useState(false);

  if (!arrived) {
    return (
      <div style={{ display: "grid", gap: 12 }}>
        <p>
          You got it. It is the Milford Mall Plaque. Do you know where that is? If so, head over
          there now. If not, FIND OUT and then go there. Once you get there, you can then proceed.
          Click the link when you arrive.
        </p>

        <button onClick={() => setArrived(true)} style={{ padding: 10, width: "fit-content" }}>
          I&apos;ve arrived.
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
        <p>
          You got it. It is the Milford Mall Plaque. Do you know where that is? If so, head over
          there now. If not, FIND OUT and then go there. Once you get there, you can then proceed.
          Click the link when you arrive.
        </p>

        <button onClick={() => setArrived(true)} style={{ padding: 10, width: "fit-content" }}>
          I&apos;ve arrived.
        </button>
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


      <StepForm path="path1" step={2} />
    </div>
  );
}
