import { NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const errorDescription = searchParams.get("error_description");
  const nextPath = searchParams.get("next") || "/dashboard";

  // Log para debugging
  console.log("[auth/callback] Received request:", { 
    hasCode: !!code, 
    hasError: !!errorDescription,
    nextPath,
    url: request.url 
  });

  if (errorDescription) {
    console.error("[auth/callback] Error from provider:", errorDescription);
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(errorDescription)}`);
  }

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      console.error("[auth/callback] Supabase not configured");
      return NextResponse.redirect(`${origin}/login?error=Servicio no configurado`);
    }

    const supabase = createSupabaseClient(supabaseUrl, serviceKey);

    try {
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      if (exchangeError) {
        console.error("[auth/callback] Exchange error:", exchangeError.message);
        return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(exchangeError.message)}`);
      }
      console.log("[auth/callback] Code exchanged for session successfully");
    } catch (exchangeErr: unknown) {
      const errorMessage = exchangeErr instanceof Error ? exchangeErr.message : "Error desconocido";
      console.error("[auth/callback] Exchange exception:", errorMessage);
      return NextResponse.redirect(`${origin}/login?error=Error al intercambiar código`);
    }
  }

  // Redirect to the next page or dashboard
  return NextResponse.redirect(`${origin}${nextPath}`);
}
