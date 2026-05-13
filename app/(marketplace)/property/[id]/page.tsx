import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bath, BedDouble, MapPin, Maximize2, ShieldCheck } from "lucide-react";
import { PropertyGallery } from "@/components/shared/property-gallery";
import { ContactLeadForm } from "@/components/shared/contact-lead-form";
import { PropertyCard } from "@/components/shared/property-card";
import { SeoSchema } from "@/components/shared/seo-schema";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { resolveAmenity } from "@/lib/amenities";
import { formatCurrencyDOP } from "@/lib/formatters";
import { getPropertyById, getSimilarProperties } from "@/lib/mock-data";

const PropertiesMap = dynamic(
  () =>
    import("@/components/shared/properties-map").then((m) => m.PropertiesMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 text-sm text-muted-foreground">
        Cargando mapa…
      </div>
    ),
  }
);

type Props = { params: { id: string } };

export function generateMetadata({ params }: Props): Metadata {
  const p = getPropertyById(params.id);
  if (!p) return { title: "Propiedad" };
  return {
    title: p.title,
    description: p.description,
    openGraph: {
      title: p.title,
      description: p.description,
      images: [{ url: p.image, width: 1200, height: 630, alt: p.title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: p.title,
      description: p.description,
      images: [p.image],
    },
  };
}

export default function PropertyDetailPage({ params }: Props) {
  const property = getPropertyById(params.id);
  if (!property) notFound();

  const priceLabel =
    property.currency === "USD"
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(property.price)
      : formatCurrencyDOP(property.price);

  const similar = getSimilarProperties(property, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {/* SEO: JSON-LD structured data */}
      <SeoSchema property={property} />

      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-navy">
          Inicio
        </Link>
        <span aria-hidden>/</span>
        <Link href="/marketplace/search" className="hover:text-navy">
          Explorar
        </Link>
        <span aria-hidden>/</span>
        <span className="text-navy">{property.zone}</span>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <div className="min-w-0 space-y-8">
          <PropertyGallery images={property.images} title={property.title} />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{property.category}</Badge>
                <Badge variant={property.type === "venta" ? "default" : "outline"}>
                  {property.type === "venta" ? "En venta" : "En alquiler"}
                </Badge>
                {property.verified ? (
                  <Badge variant="success" className="gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verificado
                  </Badge>
                ) : null}
              </div>
              <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                {property.title}
              </h1>
              <p className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-emerald-brand" aria-hidden />
                {property.city}, {property.zone}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white px-5 py-4 shadow-sm sm:text-right">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Precio {property.currency === "USD" ? "USD" : "DOP"}
              </p>
              <p className="text-3xl font-semibold text-navy">{priceLabel}</p>
              {property.type === "alquiler" ? (
                <p className="text-xs text-muted-foreground">mensual, impuestos aparte</p>
              ) : null}
            </div>
          </div>

          <Separator />

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-white p-4 text-center shadow-sm">
              <BedDouble className="mx-auto h-5 w-5 text-emerald-brand" />
              <p className="mt-2 text-2xl font-semibold text-navy">
                {["Terreno", "Local comercial", "Nave industrial", "Oficina", "Edificio"].includes(
                  property.category
                )
                  ? "—"
                  : property.beds === 0
                    ? "Estudio"
                    : property.beds}
              </p>
              <p className="text-xs text-muted-foreground">Habitaciones</p>
            </div>
            <div className="rounded-xl border border-border bg-white p-4 text-center shadow-sm">
              <Bath className="mx-auto h-5 w-5 text-emerald-brand" />
              <p className="mt-2 text-2xl font-semibold text-navy">
                {property.baths === 0 &&
                ["Terreno", "Edificio"].includes(property.category)
                  ? "—"
                  : property.baths}
              </p>
              <p className="text-xs text-muted-foreground">Baños</p>
            </div>
            <div className="rounded-xl border border-border bg-white p-4 text-center shadow-sm">
              <Maximize2 className="mx-auto h-5 w-5 text-emerald-brand" />
              <p className="mt-2 text-2xl font-semibold text-navy">{property.areaM2}</p>
              <p className="text-xs text-muted-foreground">m² construidos</p>
            </div>
          </div>

          <section>
            <h2 className="text-lg font-semibold text-navy">Descripción</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {property.description}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">Amenidades</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {property.amenities.map((key) => {
                const { label, icon: Icon } = resolveAmenity(key);
                return (
                  <div
                    key={key}
                    className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3 shadow-sm"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F9FAFB] text-navy">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="text-sm font-medium text-navy">{label}</span>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">Ubicación</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Vista aproximada en mapa OpenStreetMap. Coordenadas fines de demo.
            </p>
            <div className="mt-4 overflow-hidden rounded-xl border border-border shadow-sm">
              <PropertiesMap
                properties={[property]}
                focusId={property.id}
                className="h-64 w-full sm:h-80"
              />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">Propiedades similares</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.length ? (
                similar.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)
              ) : (
                <p className="text-sm text-muted-foreground">
                  Pronto mostraremos recomendaciones personalizadas con Supabase.
                </p>
              )}
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24">
          <ContactLeadForm propertyTitle={property.title} />
          <div className="mt-6 overflow-hidden rounded-xl border border-border bg-white shadow-sm">
            <div className="relative h-40 w-full">
              <Image
                src={property.image}
                alt="Agente destacado"
                fill
                className="object-cover"
                sizes="340px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-sm text-white">
                <p className="font-semibold">InmueblePro Agents</p>
                <p className="text-xs text-white/80">Respuesta promedio {"<"} 2h</p>
              </div>
            </div>
            <div className="space-y-2 p-4 text-xs text-muted-foreground">
              <p>
                Lead magnet: el formulario fija conversiones y dispara webhooks a
                Supabase + notificaciones al agente.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
