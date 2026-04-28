import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function Path1Page() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) redirect("/login");

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>Path 1</h1>
      <p>You are logged in and allowed to view this.</p>
      <a href="/">← Back</a>
    </main>
  );
}
