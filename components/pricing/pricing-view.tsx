"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const tiers = [
  {
    name: "Estándar",
    price: 12,
    description: "Ideal para agentes que inician con volumen moderado.",
    features: [
      "Hasta 10 publicaciones activas",
      "Perfil profesional",
      "Leads ilimitados al correo",
    ],
    highlighted: false,
  },
  {
    name: "Destacada",
    price: 25,
    description: "Visibilidad prioritaria en home y resultados de búsqueda.",
    features: [
      "Todo lo de Estándar",
      "Badge Destacada + carrusel home",
      "Prioridad en mapa y listas",
      "Soporte prioritario",
    ],
    highlighted: true,
  },
  {
    name: "Boost",
    price: 8,
    description: "Impulso puntual por listing (campañas de 7 días).",
    features: [
      "Top placement en zona",
      "Push de remarketing (Meta / email)",
      "Reporte de performance",
    ],
    highlighted: false,
  },
];

const faq = [
  {
    q: "¿Puedo combinar Destacada + Boost?",
    a: "Sí. Destacada mejora tu perfil global; Boost acelera una propiedad puntual. Puedes activarlos en paralelo desde el dashboard.",
  },
  {
    q: "¿Cobran comisión por cierre?",
    a: "InmueblePro cobra suscripción SaaS y add-ons de visibilidad. La comisión de cierre la negocias tú con tu cliente final.",
  },
  {
    q: "¿Integración con Supabase y Stripe?",
    a: "El boilerplate ya incluye utilidades base. Conecta tus claves en .env.local y webhooks para automatizar altas y pagos.",
  },
];

export function PricingView() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="outline" className="mb-3">
          Precios transparentes
        </Badge>
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
          Planes flexibles para agentes en República Dominicana
        </h1>
        <p className="mt-4 text-pretty text-muted-foreground">
          Montos referenciales en USD / mes. Ajusta copy y montos según tu
          estrategia comercial y pasarela Stripe.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <Card
              className={`flex h-full flex-col border shadow-sm ${
                tier.highlighted
                  ? "border-navy ring-2 ring-navy/10"
                  : "border-border/80"
              }`}
            >
              <CardHeader>
                {tier.highlighted ? (
                  <Badge className="mb-2 w-fit bg-emerald-brand text-white hover:bg-emerald-brand">
                    Más popular
                  </Badge>
                ) : null}
                <CardTitle className="text-xl">{tier.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
                <p className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold text-navy">${tier.price}</span>
                  <span className="text-sm text-muted-foreground">/ mes</span>
                </p>
              </CardHeader>
              <CardContent className="flex-1 space-y-3">
                <Separator />
                <ul className="space-y-2 text-sm text-navy/90">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-brand" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={tier.highlighted ? "default" : "secondary"}
                  asChild
                >
                  <Link href="/dashboard">Empezar ahora</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-semibold text-navy">Comparación rápida</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Destacada incluye posicionamiento orgánico continuo; Boost es un sprint
          de performance por listing.
        </p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase text-muted-foreground">
                <th className="py-3 pr-4 font-medium">Beneficio</th>
                <th className="py-3 pr-4 font-medium">Estándar</th>
                <th className="py-3 pr-4 font-medium">Destacada</th>
                <th className="py-3 font-medium">Boost</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/80">
                <td className="py-3 pr-4 font-medium text-navy">Publicaciones</td>
                <td className="py-3 pr-4">10</td>
                <td className="py-3 pr-4">30</td>
                <td className="py-3">Add-on</td>
              </tr>
              <tr className="border-b border-border/80">
                <td className="py-3 pr-4 font-medium text-navy">Home editorial</td>
                <td className="py-3 pr-4">—</td>
                <td className="py-3 pr-4">Incluido</td>
                <td className="py-3">Spot temporal</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-navy">Mapa / clusters</td>
                <td className="py-3 pr-4">Estándar</td>
                <td className="py-3 pr-4">Prioridad</td>
                <td className="py-3">Pin resaltado</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-center text-lg font-semibold text-navy">
          Preguntas frecuentes
        </h2>
        <Accordion type="single" collapsible className="mx-auto mt-6 max-w-2xl">
          {faq.map((item, idx) => (
            <AccordionItem key={item.q} value={`item-${idx}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
