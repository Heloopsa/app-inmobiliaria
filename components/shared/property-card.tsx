"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Bath, BedDouble, MapPin, Maximize2, ShieldCheck, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrencyDOP } from "@/lib/formatters";
import type { Property } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface PropertyCardProps {
  property: Property;
  className?: string;
  index?: number;
  onToggleFavorite?: (id: string) => void;
}

/** Lista de IDs favoritos en localStorage */
function getFavoriteIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("inmueblepro_favorites");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setFavoriteIds(ids: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("inmueblepro_favorites", JSON.stringify(ids));
}

const ROOM_SKIP_CATEGORIES = new Set([
  "Terreno",
  "Local comercial",
  "Nave industrial",
  "Oficina",
  "Edificio",
]);

export function PropertyCard({ property, className, index = 0, onToggleFavorite }: PropertyCardProps) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(getFavoriteIds().includes(property.id));
  }, [property.id]);

  const handleToggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const ids = getFavoriteIds();
    const newIds = isFav ? ids.filter((x) => x !== property.id) : [...ids, property.id];
    setFavoriteIds(newIds);
    setIsFav(!isFav);
    onToggleFavorite?.(property.id);
  };
  const priceLabel =
    property.currency === "USD"
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(property.price)
      : formatCurrencyDOP(property.price);

  const bedsLabel = ROOM_SKIP_CATEGORIES.has(property.category)
    ? "—"
    : property.beds === 0
      ? "Estudio"
      : `${property.beds} hab.`;

  const bathsLabel =
    property.baths === 0 &&
    (property.category === "Terreno" || property.category === "Edificio")
      ? "—"
      : `${property.baths} baños`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      <Link href={`/property/${property.id}`}>
        <Card
          className={cn(
            "group overflow-hidden border-border/80 transition hover:-translate-y-0.5 hover:shadow-md",
            className
          )}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
            <Image
              src={property.image}
              alt={property.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width:768px) 100vw, 33vw"
            />
            <div className="absolute left-3 top-3 flex flex-wrap gap-2">
              {property.featured ? (
                <Badge variant="success">Destacada</Badge>
              ) : null}
              <Badge variant={property.type === "venta" ? "default" : "secondary"}>
                {property.type === "venta" ? "Venta" : "Alquiler"}
              </Badge>
              {property.verified ? (
                <Badge variant="outline" className="border-white/80 bg-white/90 text-navy">
                  <ShieldCheck className="mr-1 h-3 w-3 text-emerald-brand" />
                  Verificado
                </Badge>
              ) : null}
            </div>
            {/* Botón de favoritos */}
            <div className="absolute right-3 bottom-12">
              <AnimatePresence initial={false}>
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  className={`h-9 w-9 rounded-full bg-white/90 shadow-md transition-all ${
                    isFav ? "text-red-500 hover:bg-white" : "text-navy hover:bg-white"
                  }`}
                  onClick={handleToggleFav}
                >
                  <Heart className={`h-4 w-4 transition-transform ${isFav ? "fill-current" : ""}`} />
                </Button>
              </AnimatePresence>
            </div>
            <div className="absolute bottom-3 right-3 rounded-xl bg-navy px-3 py-1 text-sm font-semibold text-white shadow-soft">
              {priceLabel}
              {property.type === "alquiler" ? (
                <span className="text-xs font-normal text-white/80"> /mes</span>
              ) : null}
            </div>
          </div>
          <CardContent className="space-y-3 p-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {property.category} · {property.zone}
              </p>
              <h3 className="mt-1 line-clamp-2 text-base font-semibold text-navy group-hover:underline">
                {property.title}
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <BedDouble className="h-4 w-4" aria-hidden />
                {bedsLabel}
              </span>
              <span className="inline-flex items-center gap-1">
                <Bath className="h-4 w-4" aria-hidden />
                {bathsLabel}
              </span>
              <span className="inline-flex items-center gap-1">
                <Maximize2 className="h-4 w-4" aria-hidden />
                {property.areaM2} m²
              </span>
            </div>
            <p className="inline-flex items-center gap-1 text-sm text-navy/80">
              <MapPin className="h-4 w-4 shrink-0 text-emerald-brand" aria-hidden />
              {property.city}, {property.zone}
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
