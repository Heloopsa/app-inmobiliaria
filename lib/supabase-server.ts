/**
 * Server-side Supabase client for API routes
 * Uses Bearer token authentication from cookies
 */

import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function createClient(): Promise<{
  supabase: SupabaseClient;
  accessToken: string | null;
  refreshToken: string | null;
}> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Supabase not configured");
  }

  // Try to get the access token from cookies
  const cookieStore = await cookies();
  let accessToken: string | null = null;
  let refreshToken: string | null = null;

  // Look for Supabase auth cookies
  const allCookies = cookieStore.getAll();
  for (const cookie of allCookies) {
    if (cookie.name.includes("auth-token")) {
      try {
        const value =
          typeof cookie.value === "string"
            ? decodeURIComponent(cookie.value)
            : cookie.value;
        const json = JSON.parse(value);
        if (json.access_token) accessToken = json.access_token;
        if (json.refresh_token) refreshToken = json.refresh_token;
      } catch (e) {
        // Cookie might be the token directly
        if (
          cookie.value &&
          typeof cookie.value === "string" &&
          cookie.value.includes(".")
        ) {
          accessToken = cookie.value;
        }
      }
    }
  }

  // Also check for the new format cookies
  if (!accessToken) {
    const sessionCookie = allCookies.find(
      (c) => c.name.startsWith("sb-") && c.name.includes("auth-token")
    );
    if (sessionCookie) {
      try {
        const value =
          typeof sessionCookie.value === "string"
            ? decodeURIComponent(sessionCookie.value)
            : sessionCookie.value;
        const json = JSON.parse(value);
        accessToken = json.access_token || null;
        refreshToken = json.refresh_token || null;
      } catch (e) {
        // ignore
      }
    }
  }

  // Create Supabase client with service key for full access
  // This bypasses RLS so we can manage data directly
  const supabase = createSupabaseClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return { supabase, accessToken, refreshToken };
}

/** Get current user from session */
export async function getUser() {
  const { supabase, accessToken } = await createClient();

  if (!accessToken) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser(accessToken);
  if (error) return null;

  return data.user;
}

/** Get user ID from session */
export async function getUserId(): Promise<string | null> {
  const user = await getUser();
  return user?.id || null;
}