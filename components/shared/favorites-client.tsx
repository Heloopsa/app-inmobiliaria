"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ArrowRight, Trash2, Share2 } from "lucide-react";
import { PropertyCard } from "@/components/shared/property-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_PROPERTIES, type Property } from "@/lib/mock-data";
import { getSupabaseBrowserClient } from "@/lib/supabase-client";

// IDs de propiedades de ejemplo para favoritos demo
const DEMO_FAVORITE_IDS = ["1", "3", "8", "13"];

export function FavoritesClient() {
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      try {
        const supabase = getSupabaseBrowserClient();
        // Si Supabase está configurado, cargar favoritos reales del usuario
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        const isReal = url && url !== "https://placeholder.supabase.co";

        if (isReal) {
          const { data, error } = await supabase
            .from("favorites")
            .select("property_id")
            .eq("user_id", "current"); // reemplazar con user real
          if (!error && data) {
            const props = data.map((f) => MOCK_PROPERTIES.find((p) => p.id === f.property_id)).filter(Boolean) as Property[];
            setFavorites(props);
          } else {
            setFavorites(DEMO_FAVORITES);
          }
        } else {
          // Modo demo: propiedades predefinidas
          setFavorites(DEMO_FAVORITES);
        }
      } catch {
        setFavorites(DEMO_FAVORITES);
      } finally {
        setLoading(false);
      }
    }
    loadFavorites();
  }, []);

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-navy">
            Mis favoritos
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Propiedades que has guardado para revisar después.
          </p>
        </div>
        <Badge variant="secondary" className="text-base px-3 py-1">
          {loading ? "..." : favorites.length} guardadas
        </Badge>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden border-border/80">
              <div className="aspect-[4/3] animate-pulse bg-muted" />
              <CardContent className="p-4 space-y-3">
                <div className="h-5 animate-pulse rounded bg-muted" />
                <div className="h-4 animate-pulse rounded bg-muted w-2/3" />
                <div className="h-6 animate-pulse rounded bg-muted w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : favorites.length === 0 ? (
        <Card className="border-dashed border-border text-center py-16">
          <CardContent>
            <Heart className="mx-auto h-12 w-12 text-muted-foreground/40" />
            <h3 className="mt-4 text-lg font-semibold text-navy">
              No tienes favoritos aún
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Explora propiedades y toca el corazón para guardarlas.
            </p>
            <Button asChild className="mt-6">
              <Link href="/search">
                Explorar propiedades
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((property, index) => (
            <div key={property.id} className="relative group">
              <PropertyCard property={property} index={index} />
              <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 rounded-full bg-white/90 shadow-md"
                  onClick={(e) => {
                    e.preventDefault();
                    removeFavorite(property.id);
                  }}
                  title="Quitar de favoritos"
                >
                  <Trash2 className="h-3.5 w-3.5 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sección: propiedades similares recomendadas */}
      {!loading && favorites.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-semibold text-navy">También te puede interesar</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Basado en tus propiedades favoritas.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_PROPERTIES.filter(
              (p) => !favorites.some((f) => f.id === p.id)
            )
              .slice(0, 3)
              .map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i + 10} />
              ))}
          </div>
        </section>
      )}
    </div>
  );
}

const DEMO_FAVORITES: Property[] = [
  MOCK_PROPERTIES.find((p) => p.id === "1")!,
  MOCK_PROPERTIES.find((p) => p.id === "3")!,
  MOCK_PROPERTIES.find((p) => p.id === "8")!,
  MOCK_PROPERTIES.find((p) => p.id === "13")!,
].filter(Boolean);