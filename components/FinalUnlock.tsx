"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function FinalUnlock({ unlocked }: { unlocked: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (unlocked) {
      // slight delay makes it feel like a "reveal"
      setTimeout(() => setVisible(true), 500);
    }
  }, [unlocked]);

  if (!unlocked) return null;

  return (
    <div
      style={{
        marginTop: "2rem",
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}
    >
      <Link href="/final">
        <button
          style={{
            padding: "1rem 2rem",
            fontSize: "1.2rem",
            borderRadius: "12px",
            border: "2px solid #5a4632",
            backgroundColor: "#f7f1e3",
            cursor: "pointer",

            // ✨ glow effect
            boxShadow:
              "0 0 10px rgba(255, 215, 0, 0.6), 0 0 20px rgba(255, 215, 0, 0.4)",
            
            animation: "pulseGlow 2s infinite",
          }}
        >
          🔓 Final Puzzle Unlocked
        </button>
      </Link>

      {/* animation */}
<style>{`
  @keyframes pulseGlow {
    0% {
      box-shadow: 0 0 10px rgba(255, 215, 0, 0.6),
                  0 0 20px rgba(255, 215, 0, 0.4);
    }
    50% {
      box-shadow: 0 0 20px rgba(255, 215, 0, 1),
                  0 0 40px rgba(255, 215, 0, 0.7);
    }
    100% {
      box-shadow: 0 0 10px rgba(255, 215, 0, 0.6),
                  0 0 20px rgba(255, 215, 0, 0.4);
    }
  }
`}</style>
    </div>
  );
}