"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useMemo, useCallback } from "react";
import { SlidersHorizontal } from "lucide-react";
import { PropertyCard } from "@/components/shared/property-card";
import { SearchBar } from "@/components/shared/search-bar";
import { APPROX_DOP_PER_USD } from "@/lib/property-options";
import { MOCK_PROPERTIES } from "@/lib/mock-data";

const PropertiesMap = dynamic(
  () =>
    import("@/components/shared/properties-map").then((m) => m.PropertiesMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[280px] w-full items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
        Cargando mapa…
      </div>
    ),
  }
);

interface DbProperty {
  id: string;
  title: string;
  slug: string;
  description: string;
  deal_type: string;
  category: string;
  city: string;
  zone: string;
  currency: string;
  price: number;
  beds: number | null;
  baths: number;
  area_m2: number;
  lat: number | null;
  lng: number | null;
  amenities: string[];
  status: string;
  images?: { url: string; alt_text?: string }[];
}

// Convert mock data to DbProperty format
function mockToDbProperty(p: (typeof MOCK_PROPERTIES)[0]): DbProperty {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    description: p.description,
    deal_type: p.type === "venta" ? "venta" : "alquiler",
    category: p.category,
    city: p.city,
    zone: p.zone,
    currency: p.currency,
    price: p.price,
    beds: p.beds,
    baths: p.baths,
    area_m2: p.areaM2,
    lat: p.lat,
    lng: p.lng,
    amenities: p.amenities,
    status: "aprobada",
    images: p.images.map((url, i) => ({ url, alt_text: p.title })),
  };
}

// Load properties from mock data as fallback
function getMockProperties(): DbProperty[] {
  return MOCK_PROPERTIES.map(mockToDbProperty);
}

function priceUsdEquivalent(p: DbProperty): number {
  return p.currency === "USD"
    ? p.price
    : p.price / APPROX_DOP_PER_USD;
}

interface SearchPageClientProps {
  initialQuery: string;
  tipo: string;
  precioMax?: string;
  categoria?: string;
  habMin?: string;
  moneda?: string;
}

export function SearchPageClient({
  initialQuery,
  tipo,
  precioMax,
  categoria,
  habMin,
  moneda,
}: SearchPageClientProps) {
  const [properties, setProperties] = useState<DbProperty[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProperties = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (tipo === "venta") params.set("dealType", "venta");
      if (categoria) params.set("category", categoria);
      if (moneda) params.set("minPrice", "0");
      
      try {
        const res = await fetch(`/api/properties?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (data.properties && data.properties.length > 0) {
            setProperties(data.properties);
            return;
          }
        }
      } catch (apiErr) {
        console.warn("API failed, using mock data fallback:", apiErr);
      }
      
      // Fallback to mock data when API is unavailable
      console.log("Using mock properties data as fallback");
      setProperties(getMockProperties());
    } catch (err) {
      console.error("Error loading properties:", err);
      // Ultimate fallback: use mock data
      setProperties(getMockProperties());
    } finally {
      setLoading(false);
    }
  }, [tipo, categoria, moneda]);

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  const filtered = useMemo(() => {
    let list: DbProperty[] = [...properties];
    if (initialQuery.trim()) {
      const q = initialQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.city.toLowerCase().includes(q) ||
          p.zone.toLowerCase().includes(q) ||
          p.title.toLowerCase().includes(q)
      );
    }
    if (tipo === "venta" || tipo === "alquiler") {
      list = list.filter((p) => p.deal_type === tipo);
    }
    if (categoria?.trim()) {
      list = list.filter((p) => p.category === categoria.trim());
    }
    if (moneda === "USD" || moneda === "DOP") {
      list = list.filter((p) => p.currency === moneda);
    }
    if (habMin !== undefined && habMin !== "") {
      const n = Number(habMin);
      if (!Number.isNaN(n)) {
        if (n === 0) {
          list = list.filter((p) => p.beds === 0);
        } else {
          list = list.filter((p) => (p.beds || 0) >= n);
        }
      }
    }
    if (precioMax) {
      const max = Number(precioMax);
      if (!Number.isNaN(max) && max > 0) {
        list = list.filter((p) => priceUsdEquivalent(p) <= max);
      }
    }
    return list;
  }, [properties, initialQuery, tipo, precioMax, categoria, habMin, moneda]);

  const filterKey = `${initialQuery}-${tipo}-${precioMax ?? ""}-${categoria ?? ""}-${habMin ?? ""}-${moneda ?? ""}`;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col lg:h-[calc(100vh-5rem)] lg:flex-row">
      <div className="flex min-h-0 flex-1 flex-col border-b border-border lg:border-b-0 lg:border-r">
        <div className="shrink-0 space-y-4 border-b border-border bg-[#F9FAFB] p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-lg font-semibold text-navy sm:text-xl">
              Resultados en mapa
            </h1>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden />
              {filtered.length} propiedades
            </span>
          </div>
          <SearchBar
            key={filterKey}
            variant="compact"
            className="w-full"
            defaultLocation={initialQuery}
            defaultDealType={tipo}
            defaultPriceMax={precioMax ?? ""}
            defaultCategory={categoria ?? ""}
            defaultHabMin={habMin ?? ""}
            defaultMoneda={moneda ?? ""}
          />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-2">
            {filtered.map((p, i) => (
              <PropertyCard
                key={p.id}
                property={{
                  id: p.id,
                  title: p.title,
                  slug: "",
                  city: p.city,
                  zone: p.zone,
                  price: p.price,
                  currency: (p.currency === "USD" || p.currency === "DOP") ? p.currency : "USD",
                  beds: p.beds || 0,
                  baths: p.baths,
                  areaM2: p.area_m2,
                  type: p.deal_type as "venta" | "alquiler",
                  category: p.category,
                  description: p.description,
                  image: p.images?.[0]?.url || "/placeholder.jpg",
                  images: p.images?.map(img => img.url) || ["/placeholder.jpg"],
                  amenities: p.amenities,
                  verified: false,
                  featured: false,
                  lat: p.lat || 18.47,
                  lng: p.lng || -69.93,
                }}
                index={i}
              />
            ))}
          </div>
          {filtered.length === 0 ? (
            <p className="mt-10 text-center text-sm text-muted-foreground">
              No encontramos coincidencias. Ajusta filtros o amplía la zona.
            </p>
          ) : null}
        </div>
      </div>
      <div className="h-[340px] shrink-0 lg:h-auto lg:w-[46%] lg:min-w-[320px]">
        <div className="h-full p-4 sm:p-5 lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:p-5">
          <PropertiesMap
            properties={filtered.length ? filtered.map(p => ({
              id: p.id,
              title: p.title,
              slug: "",
              city: p.city,
              zone: p.zone,
              price: p.price,
              currency: (p.currency === "USD" || p.currency === "DOP") ? p.currency : "USD",
              beds: p.beds || 0,
              baths: p.baths,
              areaM2: p.area_m2,
              type: p.deal_type as "venta" | "alquiler",
              category: p.category,
              description: p.description,
              image: p.images?.[0]?.url || "/placeholder.jpg",
              images: p.images?.map(img => img.url) || ["/placeholder.jpg"],
              amenities: p.amenities,
              verified: false,
              featured: false,
              lat: p.lat || 18.47,
              lng: p.lng || -69.93,
            })) : []}
            className="h-full min-h-[300px] w-full overflow-hidden rounded-xl border border-border shadow-sm lg:min-h-0"
          />
        </div>
      </div>
    </div>
  );
}
