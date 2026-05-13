/**
 * Hook para obtener el token de autenticación de Supabase desde el cliente
 */
import { useState, useEffect } from "react";

export function useSupabaseAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let subscription: any = null;

    async function getToken() {
      try {
        const { getSupabaseBrowserClient } = await import("@/lib/supabase-client");
        const client = getSupabaseBrowserClient();
        
        const { data } = await client.auth.getSession();
        if (data.session?.access_token && !cancelled) {
          setAccessToken(data.session.access_token);
        } else if (!cancelled) {
          setAccessToken(null);
        }
      } catch (err) {
        console.error("Error getting auth token:", err);
        if (!cancelled) setAccessToken(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    getToken();

    // Suscribirse a cambios de auth
    import("@/lib/supabase-client").then(({ getSupabaseBrowserClient }) => {
      const client = getSupabaseBrowserClient();
      const data = client.auth.onAuthStateChange((_event, session) => {
        if (session?.access_token) {
          setAccessToken(session.access_token);
        } else {
          setAccessToken(null);
        }
      });
      subscription = (data as any)?.subscription;
    });

    return () => {
      cancelled = true;
      if (subscription?.unsubscribe) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const getHeaders = (): HeadersInit => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    return headers;
  };

  const signOut = async () => {
    try {
      const { getSupabaseBrowserClient } = await import("@/lib/supabase-client");
      const client = getSupabaseBrowserClient();
      await client.auth.signOut();
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  return { accessToken, loading, getHeaders, signOut };
}