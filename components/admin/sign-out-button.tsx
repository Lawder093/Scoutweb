"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function signOut() {
    setIsLoading(true);
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return <button type="button" onClick={signOut} disabled={isLoading} className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-xs font-extrabold text-ink/70 hover:border-primary hover:text-primary disabled:opacity-50"><LogOut size={14} /> {isLoading ? "Saliendo…" : "Cerrar sesión"}</button>;
}
