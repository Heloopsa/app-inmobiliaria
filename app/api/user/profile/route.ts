/**
 * GET /api/user/profile — Obtener perfil del usuario autenticado
 * PUT /api/user/profile — Actualizar perfil del usuario autenticado
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase not configured");
  return createSupabaseClient(url, key);
}

async function getUserIdFromRequest(request: NextRequest): Promise<{ userId: string; ok: boolean } | null> {
  // Check Authorization header first
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.getUser(token);
    if (!error && data?.user) {
      return { userId: data.user.id, ok: true };
    }
  }

  // Fall back to cookie-based session
  return null;
}

/** GET — Obtener perfil del usuario */
export async function GET(request: NextRequest) {
  const authCheck = await getUserIdFromRequest(request);
  if (!authCheck) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const supabase = getSupabase();

  // Obtener perfil
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", authCheck.userId)
    .single();

  if (profileError && profileError.code !== "PGRST116") {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  // Si no existe perfil, crear uno
  if (!profile) {
    const { data: newProfile, error: createError } = await supabase
      .from("profiles")
      .insert({
        id: authCheck.userId,
        full_name: "Usuario",
        email: "",
        role: "user",
      })
      .select()
      .single();

    if (createError) {
      return NextResponse.json({ error: createError.message }, { status: 500 });
    }

    return NextResponse.json({ profile: newProfile });
  }

  return NextResponse.json({ profile });
}

/** PUT — Actualizar perfil */
export async function PUT(request: NextRequest) {
  const authCheck = await getUserIdFromRequest(request);
  if (!authCheck) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { name, company, license, bio, phone, email, website, linkedin, instagram, city } = body;

  // Preparar datos para actualizar en profiles table
  const updateData: Record<string, any> = {};
  if (name) updateData.full_name = name.trim();
  if (phone) updateData.phone = phone.trim();
  if (license) updateData.agent_license = license.trim();
  if (bio) updateData.bio = bio.trim();
  if (email) updateData.email = email.trim();

  // Guardar datos adicionales en raw_user_meta_data
  const metaDataUpdate: Record<string, any> = {};
  if (company) metaDataUpdate.company = company.trim();
  if (website) metaDataUpdate.website = website.trim();
  if (linkedin) metaDataUpdate.linkedin = linkedin.trim();
  if (instagram) metaDataUpdate.instagram = instagram.trim();
  if (city) metaDataUpdate.city = city.trim();

  const supabase = getSupabase();

  // Actualizar perfil en la tabla profiles
  const { error: profileError } = await supabase
    .from("profiles")
    .update(updateData)
    .eq("id", authCheck.userId);

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  // Actualizar metadata del usuario en auth.users usando service key
  if (Object.keys(metaDataUpdate).length > 0) {
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (serviceKey) {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const adminDb = createSupabaseClient(url, serviceKey);
      
      await (adminDb as any).auth.admin.updateUserById(authCheck.userId, {
        data: metaDataUpdate,
      });
    }
  }

  return NextResponse.json({ 
    message: "Perfil actualizado correctamente" 
  });
}