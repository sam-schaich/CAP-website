"use client";

import { useState } from "react";

export default function FinalForm() {
  const [guess, setGuess] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [solved, setSolved] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const res = await fetch("/api/final-guess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guess }),
    });

    const data = await res.json().catch(() => null);
    setLoading(false);

    if (!res.ok) {
      setStatus(data?.error ?? `Error (${res.status})`);
      return;
    }

    if (data?.correct) {
      setSolved(true);
      setStatus(
        `🎉 Congratulations! You solved the final puzzle! The answer was: ${guess}`
      );
      return;
    }

    setStatus("❌ Incorrect. Try again!");
  }

  if (solved) {
    return (
      <div
        style={{
          padding: "20px 24px",
          border: "2px solid #2d6a2d",
          borderRadius: 12,
          background: "#f0faf0",
        }}
      >
        <p style={{ margin: 0, fontSize: "1.2rem" }}>{status}</p>
        <p style={{ marginTop: 12, marginBottom: 0 }}>
          Well done on completing all four paths and the final puzzle!
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 520 }}>
      <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
        <input
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="enter four letter password"
          style={{ padding: 10, fontSize: 16 }}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          maxLength={20}
        />
        <button type="submit" disabled={loading} style={{ padding: 10 }}>
          {loading ? "Checking…" : "Submit"}
        </button>
        {status && <p style={{ margin: 0 }}>{status}</p>}
      </form>
    </div>
  );
}
