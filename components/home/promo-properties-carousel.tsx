"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrencyDOP } from "@/lib/formatters";
import { getPromotionalProperties } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function PromoPropertiesCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const promos = getPromotionalProperties();

  const scrollBy = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-promo-card]");
    const w = card?.offsetWidth ?? 320;
    el.scrollBy({ left: dir * (w + 16), behavior: "smooth" });
  }, []);

  if (promos.length === 0) return null;

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-navy py-14 text-white sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.22),transparent),radial-gradient(ellipse_60%_40%_at_100%_50%,rgba(255,255,255,0.06),transparent)]" />
      <div className="pointer-events-none absolute -right-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-emerald-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-white/5 blur-2xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-100"
            >
              <Crown className="h-3.5 w-3.5 text-amber-300" aria-hidden />
              Colección patrocinada
            </motion.div>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Propiedades promocionales
            </h2>
            <p className="mt-3 max-w-xl text-sm text-slate-300 sm:text-base">
              Inversiones con visibilidad premium reservada a anunciantes InmueblePro
              Promo. Diseñado para transmitir exclusividad y confianza.
            </p>
          </div>
          <div className="flex shrink-0 gap-2 self-end sm:self-auto">
            <Button
              type="button"
              size="icon"
              variant="secondary"
              className="h-10 w-10 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
              aria-label="Anterior"
              onClick={() => scrollBy(-1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="secondary"
              className="h-10 w-10 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
              aria-label="Siguiente"
              onClick={() => scrollBy(1)}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {promos.map((p, i) => {
            const price =
              p.currency === "USD"
                ? new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(p.price)
                : formatCurrencyDOP(p.price);

            return (
              <motion.article
                key={p.id}
                data-promo-card
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="relative w-[min(88vw,380px)] shrink-0 snap-start"
              >
                <Link
                  href={`/property/${p.id}`}
                  className={cn(
                    "group block overflow-hidden rounded-2xl border border-white/15",
                    "bg-gradient-to-b from-white/[0.12] to-white/[0.03]",
                    "shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_24px_48px_-12px_rgba(0,0,0,0.45)]",
                    "transition duration-300 hover:border-emerald-brand/40 hover:shadow-emerald-900/20"
                  )}
                >
                  <div className="relative aspect-[16/11] w-full overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="380px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
                    <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-navy shadow-sm">
                        <Sparkles className="h-3 w-3" aria-hidden />
                        Promo
                      </span>
                      <span className="rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                        {p.type === "venta" ? "Venta" : "Alquiler"}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-[11px] font-medium uppercase tracking-wider text-emerald-200/90">
                        {p.category} · {p.zone}
                      </p>
                      <h3 className="mt-1 line-clamp-2 text-lg font-semibold leading-snug text-white">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-xl font-semibold text-white">
                        {price}
                        {p.type === "alquiler" ? (
                          <span className="text-sm font-normal text-white/70"> /mes</span>
                        ) : null}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-xs text-slate-300">
                    <span>Patrocinio activo</span>
                    <span className="font-medium text-emerald-300 group-hover:text-emerald-200">
                      Ver ficha →
                    </span>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
