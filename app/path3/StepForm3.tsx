"use client";

import { useState } from "react";

type GuessResponse = {
  locked?: boolean;
  locked_until?: string;
  correct?: boolean;
  wrong_attempts?: number;
  error?: string;
  // include anything else your API returns
};

function formatTryAgainAt(lockedUntilIso?: string) {
  if (!lockedUntilIso) return "later";

  const d = new Date(lockedUntilIso);
  if (Number.isNaN(d.getTime())) return "later";

  // Add 1-minute grace buffer
  d.setMinutes(d.getMinutes());

  return d.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function StepForm({
  path,
  step,
  onCorrect,
  placeholder = "enter password for step " + step,
}: {
  path: string;
  step: number;
  onCorrect?: (payload: { step: number; guess: string; data: GuessResponse }) => void;
  placeholder?: string;
}) {
  const [guess, setGuess] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const res = await fetch("/api/guess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, step, guess }),
    });

    const data: GuessResponse | null = await res.json().catch(() => null);
    setLoading(false);

    if (!res.ok) {
      setStatus(data?.error ?? `Error (${res.status})`);
      return;
    }

    if (data?.locked) {
      const t = formatTryAgainAt(data.locked_until);
      setStatus(`Too many wrong guesses. Try again at ${t}.`);
    return;
    }

    
if (data?.correct) {
  if (step === 6) {
    setStatus(
      `✅ Correct! You'll need to save the letter ${guess} for later once you've completed all 4 paths.`
    );
    return; // do NOT reload on final step
  }
  setStatus("✅ Correct! … Refreshing…");
  onCorrect?.({ step, guess, data });
  window.location.reload();
  return;
}
      


    setStatus(
  `❌ Incorrect. Attempts Remaining: ${3 - (data?.wrong_attempts ?? 0)}`);
  }

  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 520 }}>
      <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
        <input
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder={placeholder}
          style={{ padding: 10, fontSize: 16 }}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
        />
        <button type="submit" disabled={loading} style={{ padding: 10 }}>
          {loading ? "Checking…" : "Submit"}
        </button>
        {status && <p style={{ margin: 0 }}>{status}</p>}
      </form>
    </div>
  );
}

console.log("StepForm module loaded");