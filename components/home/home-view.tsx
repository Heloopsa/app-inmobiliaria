"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, LineChart, Shield } from "lucide-react";
import { SearchBar } from "@/components/shared/search-bar";
import { PropertyCard } from "@/components/shared/property-card";
import { PromoPropertiesCarousel } from "@/components/home/promo-properties-carousel";
import { AccountHubSection } from "@/components/home/account-hub-section";
import { Button } from "@/components/ui/button";
import { MOCK_PROPERTIES } from "@/lib/mock-data";

const featured = MOCK_PROPERTIES.filter((p) => p.featured).slice(0, 6);
const rest = MOCK_PROPERTIES.filter((p) => !p.featured).slice(0, 6);

export function HomeView() {
  return (
    <div className="overflow-hidden">
      <section className="relative border-b border-border/60 bg-gradient-to-b from-white to-[#F9FAFB]">
        <div className="pointer-events-none absolute inset-x-0 -top-24 h-72 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.12),_transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              República Dominicana
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-navy sm:text-5xl lg:text-6xl">
              El marketplace inmobiliario que tus clientes ya conocen.
            </h1>
            <p className="mt-4 text-pretty text-lg text-muted-foreground sm:text-xl">
              Explora propiedades verificadas con mapa interactivo, agenda visitas
              en un clic y haz crecer tu cartera como agente profesional.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mx-auto mt-10 max-w-5xl"
          >
            <SearchBar variant="hero" />
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Shield className="h-3.5 w-3.5 text-emerald-brand" />
                Listings verificados
              </span>
              <span className="inline-flex items-center gap-1">
                <LineChart className="h-3.5 w-3.5 text-emerald-brand" />
                Métricas para agentes
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <PromoPropertiesCarousel />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
              Propiedades destacadas
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Curaduría editorial y posicionamiento premium para las mejores
              oportunidades del mercado dominicano.
            </p>
          </div>
          <Button variant="outline" asChild className="shrink-0 gap-2 self-start sm:self-auto">
            <Link href="/search">
              Ver todo el mercado
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...featured, ...rest].map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} />
          ))}
        </div>
      </section>

      <AccountHubSection />

      <section className="border-y border-border bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8 lg:py-16">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
              Cómo funciona para agentes
            </h2>
            <p className="mt-3 text-muted-foreground">
              Publica en minutos, recibe leads calificados y optimiza tus ventas
              con analytics pensados para corredores en LATAM.
            </p>
            <ul className="mt-6 space-y-4 text-sm text-navy/90">
              {[
                "Perfil profesional con insignia Verificado.",
                "Panel con vistas, leads y embudo de seguimiento.",
                "Boosts y destacados para posicionar tus mejores listings.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-brand" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/dashboard">Ir al panel de agente</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/pricing">Ver planes y precios</Link>
              </Button>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative flex-1 overflow-hidden rounded-2xl border border-border bg-[#F9FAFB] p-6 shadow-soft"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.06),_transparent_55%)]" />
            <div className="relative space-y-4">
              <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
                <div>
                  <p className="text-xs font-medium uppercase text-muted-foreground">
                    Leads esta semana
                  </p>
                  <p className="text-2xl font-semibold text-navy">+38%</p>
                </div>
                <span className="rounded-full bg-emerald-brand/15 px-3 py-1 text-xs font-semibold text-emerald-800">
                  Live
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-xs text-muted-foreground">Vistas</p>
                  <p className="mt-1 text-xl font-semibold text-navy">12.4k</p>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-xs text-muted-foreground">Tasa respuesta</p>
                  <p className="mt-1 text-xl font-semibold text-navy">94%</p>
                </div>
              </div>
              <p className="text-center text-xs text-muted-foreground">
                Datos ilustrativos · integra Supabase + Recharts en producción.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
