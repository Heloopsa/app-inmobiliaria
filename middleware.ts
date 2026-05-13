/**
 * Next.js Middleware para manejar autenticación con Supabase
 * Este middleware lee y escribe las cookies de sesión automáticamente
 */

import { type NextRequest } from "next/server";
import { updateSession, validateRequest } from "@/lib/middleware-utils";

export async function middleware(request: NextRequest) {
  // Validar la solicitud (verificar token si es necesario)
  await validateRequest(request);

  // Actualizar la sesión (manejar cookies de autenticación)
  await updateSession(request);
}

// Run middleware only for specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth/callback (Supabase OAuth callback)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|auth/callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
