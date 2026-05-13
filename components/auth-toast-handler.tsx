"use client";

import { useEffect, useState, useRef } from "react";
import { useToast } from "@/components/ui/toast";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";

/**
 * Component that listens for auth state changes and shows a welcome toast
 * when the user signs in (especially via Google OAuth).
 */
export function AuthToastHandler() {
  const [mounted, setMounted] = useState(false);
  const { showToast } = useToast();
  const hasShownWelcome = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    import("@/lib/supabase-client").then(({ getSupabaseBrowserClient }) => {
      const supabase = getSupabaseBrowserClient();

      // Listen for auth state changes (e.g., sign in via Google)
      // Only show welcome on SIGNED_IN event, not on SESSION_COMMITTED or other events
      const { data } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
        // Only trigger on SIGNED_IN events
        if (event !== "SIGNED_IN") return;

        // Prevent duplicate welcome messages per mount
        if (hasShownWelcome.current) return;
        hasShownWelcome.current = true;

        if (session?.user?.email) {
          const email = session.user.email;
          showToast({
            message: "¡Bienvenido!",
            description: `Sesión iniciada como ${email}`,
            type: "success",
          });
        }
      });

      return () => {
        data.subscription.unsubscribe();
      };
    });
  }, [mounted, showToast]);

  return null;
}