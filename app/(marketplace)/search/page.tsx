import type { Metadata } from "next";
import { SearchPageClient } from "@/components/search/search-page-client";

export const metadata: Metadata = {
  title: "Búsqueda",
  description: "Explora propiedades en mapa y lista con filtros en tiempo real.",
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: {
    q?: string;
    tipo?: string;
    precio_max?: string;
    categoria?: string;
    hab_min?: string;
    moneda?: string;
  };
}) {
  const q = searchParams.q ?? "";
  const tipo = searchParams.tipo === "alquiler" ? "alquiler" : "venta";
  const precioMax = searchParams.precio_max;
  const categoria = searchParams.categoria;
  const habMin = searchParams.hab_min;
  const moneda =
    searchParams.moneda === "USD" || searchParams.moneda === "DOP"
      ? searchParams.moneda
      : undefined;

  return (
    <SearchPageClient
      initialQuery={q}
      tipo={tipo}
      precioMax={precioMax}
      categoria={categoria}
      habMin={habMin}
      moneda={moneda}
    />
  );
}
