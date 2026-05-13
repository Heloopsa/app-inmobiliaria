/**
 * Middleware utilities for Supabase authentication
 * Used in Next.js middleware to handle session cookies
 */

import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Do not run code below this line if you don't want the
  // middleware to impact security
  const { data: { session } } = await supabase.auth.getSession();

  return response;
}

export async function validateRequest(request: NextRequest) {
  // This function can be used to require authentication for specific routes
  const protectedPaths = ["/publicar", "/cuenta", "/dashboard"];
  const isProtectedPath = protectedPaths.some(
    (path) => request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(path + "/")
  );

  if (!isProtectedPath) {
    return;
  }

  // For API routes, the auth is handled in the route handler itself
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return;
  }

  // For protected pages, we could redirect to login if not authenticated
  // But we'll handle that in the page components themselves
}