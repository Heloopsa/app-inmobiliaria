/**
 * GET /api/properties/[slug] — Ver propiedad individual
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return null;
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** GET — Ver propiedad individual por slug */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const supabase = getServerClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase no configurado" },
      { status: 503 }
    );
  }

  const { slug } = params;

  // Obtener propiedad con imágenes y datos del propietario
  const { data: property, error } = await supabase
    .from("properties")
    .select(
      `
        *,
        property_images(id, url, alt_text, sort_order),
        profiles!properties_user_id_fkey(full_name, phone, avatar_url, agent_verified)
      `
    )
    .eq("slug", slug)
    .eq("status", "aprobada")
    .single();

  if (error || !property) {
    return NextResponse.json({ error: "Propiedad no encontrada" }, { status: 404 });
  }

  // Registrar vista
  const userAgent = request.headers.get("user-agent") || "";
  supabase
    .from("property_views")
    .insert({
      property_id: property.id,
      user_agent: userAgent,
    })
    .then(() => {}); // No await para no bloquear respuesta

  // Ordenar imágenes por sort_order
  const images = (property.property_images || [])
    .sort((a: any, b: any) => a.sort_order - b.sort_order);

  return NextResponse.json({
    property: {
      ...property,
      property_images: images,
    },
  });
}