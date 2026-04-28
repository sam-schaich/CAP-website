"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function LoginForm() {
  const supabase = createSupabaseBrowserClient();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (error) setStatus(error.message);
    else setStatus("Check your email for the magic link.");
  }

  return (
    <form onSubmit={sendMagicLink} style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", width: "100%", padding: 10, marginTop: 6 }}
          placeholder="you@school.edu"
        />
      </label>

      <button type="submit" disabled={loading} style={{ padding: 10 }}>
        {loading ? "Sending…" : "Send magic link"}
      </button>

      {status && <p>{status}</p>}
    </form>
  );
}
