/**
 * GET /api/properties — Listar propiedades aprobadas (público)
 * POST /api/properties — Crear propiedad (requiere autenticación)
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

/** GET — Listar propiedades aprobadas con filtros */
export async function GET(request: NextRequest) {
  const supabase = getSupabase();

  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") || undefined;
  const category = searchParams.get("category") || undefined;
  const dealType = searchParams.get("dealType") || undefined;
  const minPrice = searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")!) : undefined;
  const maxPrice = searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")!) : undefined;
  const minBeds = searchParams.get("minBeds") ? parseInt(searchParams.get("minBeds")!) : undefined;
  const minBaths = searchParams.get("minBaths") ? parseInt(searchParams.get("minBaths")!) : undefined;
  const minArea = searchParams.get("minArea") ? parseFloat(searchParams.get("minArea")!) : undefined;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = Math.min(parseInt(searchParams.get("limit") || "12"), 50);
  const offset = (page - 1) * limit;

  let query = supabase
    .from("properties")
    .select(
      `
        *,
        property_images(id, url, alt_text, sort_order),
        profiles!properties_user_id_fkey(full_name, phone, avatar_url, agent_verified)
      `,
      { count: "exact" }
    )
    .eq("status", "aprobada")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (city) query = query.eq("city", city);
  if (category) query = query.eq("category", category);
  if (dealType) query = query.eq("deal_type", dealType);
  if (minPrice) query = query.gte("price", minPrice);
  if (maxPrice) query = query.lte("price", maxPrice);
  if (minBeds) query = query.gte("beds", minBeds);
  if (minBaths) query = query.gte("baths", minBaths);
  if (minArea) query = query.gte("area_m2", minArea);

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    properties: data,
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
    },
  });
}

/** POST — Crear nueva propiedad */
export async function POST(request: NextRequest) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const {
    title, slug, description, deal_type, category, city, zone,
    currency = "USD", price, beds, baths, area_m2, lat, lng,
    amenities: amenitiesRaw = [], matricula_ref,
  } = body;

  // Validación básica
  const errors: string[] = [];
  if (!title?.trim()) errors.push("El título es obligatorio");
  if (!slug?.trim()) errors.push("El slug es obligatorio");
  if (!description?.trim()) errors.push("La descripción es obligatoria");
  if (!deal_type) errors.push("El tipo de operación es obligatorio");
  if (!category) errors.push("La categoría es obligatoria");
  if (!city) errors.push("La ciudad es obligatoria");
  if (!zone) errors.push("La zona es obligatoria");
  if (!price) errors.push("El precio es obligatorio");
  if (!baths) errors.push("El número de baños es obligatorio");
  if (!area_m2) errors.push("El área en m² es obligatoria");

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
  }

  const finalSlug = slug?.trim() || title.trim().toLowerCase().replace(/[^a-z0-9]+/gi, "-").slice(0, 80);
  const supabase = getSupabase();

  const { data: property, error: propError } = await supabase
    .from("properties")
    .insert({
      user_id: userId,
      title: title.trim(),
      slug: finalSlug,
      description: description.trim(),
      deal_type,
      category,
      city,
      zone,
      currency,
      price: parseFloat(price.toString()),
      beds: beds ? parseInt(beds) : null,
      baths: parseInt(baths),
      area_m2: parseFloat(area_m2.toString()),
      lat: lat ? parseFloat(lat) : null,
      lng: lng ? parseFloat(lng) : null,
      amenities: amenitiesRaw,
      matricula_ref: matricula_ref?.trim() || null,
      status: "aprobada",
    })
    .select()
    .single();

  if (propError) {
    if (propError.code === "unique_constraint") {
      return NextResponse.json({ error: "Ya existe una propiedad con ese slug" }, { status: 409 });
    }
    return NextResponse.json({ error: propError.message }, { status: 500 });
  }

  return NextResponse.json({
    property,
    message: "Propiedad creada exitosamente. Está pendiente de revisión.",
  }, { status: 201 });
}