/**
 * POST /api/favorites — Add favorite
 * GET /api/favorites — Get current user's favorites list
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
    if (!error && data?.user) {
      return data.user.id;
    }
  }
  return null;
}

/** POST — Add property to favorites */
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

  const { propertyId } = body;
  if (!propertyId) {
    return NextResponse.json({ error: "propertyId es requerido" }, { status: 400 });
  }

  const supabase = getSupabase();

  // Check if already favorited
  const { data: existing } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", userId)
    .eq("property_id", propertyId)
    .single();

  if (existing) {
    return NextResponse.json({ added: false, alreadyFavorited: true });
  }

  const { error } = await supabase.from("favorites").insert({
    user_id: userId,
    property_id: propertyId,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ added: true });
}

/** GET — Get current user's favorites list */
export async function GET(request: NextRequest) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ favorites: [] }, { status: 200 });
  }

  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get("propertyId");

  const supabase = getSupabase();

  if (propertyId) {
    // Check single property
    const { data } = await supabase
      .from("favorites")
      .select("id")
      .eq("user_id", userId)
      .eq("property_id", propertyId)
      .single();

    return NextResponse.json({ favorited: !!data });
  }

  // Get all favorites with property details
  const { data: favorites, error } = await supabase
    .from("favorites")
    .select(`
      id,
      property_id,
      created_at,
      properties:property_id (
        id,
        title,
        slug,
        price,
        currency,
        deal_type,
        category,
        city,
        zone,
        beds,
        baths,
        area_m2,
        lat,
        lng,
        amenities
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Transform to match property format
  const properties = (favorites || []).map((f: any) => ({
    id: f.properties?.id || f.property_id,
    title: f.properties?.title || "",
    slug: f.properties?.slug || "",
    price: f.properties?.price || 0,
    currency: f.properties?.currency || "USD",
    deal_type: f.properties?.deal_type || "venta",
    category: f.properties?.category || "",
    city: f.properties?.city || "",
    zone: f.properties?.zone || "",
    beds: f.properties?.beds || 0,
    baths: f.properties?.baths || 0,
    areaM2: f.properties?.area_m2 || 0,
    lat: f.properties?.lat,
    lng: f.properties?.lng,
    amenities: f.properties?.amenities || [],
    favoritedAt: f.created_at,
  }));

  return NextResponse.json({ favorites: properties });
}