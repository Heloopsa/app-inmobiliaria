/**
 * POST /api/properties/upload-images — Subir imágenes de propiedad a Supabase Storage
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase not configured");
  return createSupabaseClient(url, key);
}

async function getUserIdFromRequest(request: NextRequest): Promise<string | null> {
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.getUser(token);
    if (!error && data?.user) return data.user.id;
  }
  return null;
}

export async function POST(request: NextRequest) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const files = formData.getAll("images") as File[];
    const propertyId = formData.get("property_id") as string;

    if (!files?.length) {
      return NextResponse.json({ error: "No se proporcionaron imágenes" }, { status: 400 });
    }
    if (!propertyId) {
      return NextResponse.json({ error: "property_id es obligatorio" }, { status: 400 });
    }

    const supabase = getSupabase();

    // Verificar que la propiedad pertenece al usuario
    const { data: property } = await supabase
      .from("properties")
      .select("id, user_id")
      .eq("id", propertyId)
      .eq("user_id", userId)
      .single();

    if (!property) {
      return NextResponse.json({ error: "Propiedad no encontrada o no autorizada" }, { status: 404 });
    }

    const uploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) continue;
      if (file.size > 10 * 1024 * 1024) continue;

      const fileExt = file.name.split(".").pop() || "jpg";
      const fileName = `${userId}/${propertyId}/${Date.now()}-${i}.${fileExt}`;

      const arrayBuffer = await file.arrayBuffer();
      const { error: uploadError } = await supabase.storage
        .from("property-images")
        .upload(fileName, arrayBuffer, { contentType: file.type, upsert: false });

      if (uploadError) {
        console.error("Error subiendo imagen:", uploadError);
        continue;
      }

      const { data: urlData } = supabase.storage.from("property-images").getPublicUrl(fileName);
      uploadedUrls.push(urlData.publicUrl);
    }

    return NextResponse.json({
      urls: uploadedUrls,
      count: uploadedUrls.length,
      message: `${uploadedUrls.length} imagen(es) subida(s) exitosamente`,
    });
  } catch (err) {
    console.error("Error procesando upload:", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}