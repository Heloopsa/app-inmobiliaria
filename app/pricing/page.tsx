import type { Metadata } from "next";
import { PricingView } from "@/components/pricing/pricing-view";

export const metadata: Metadata = {
  title: "Precios",
  description: "Planes Estándar, Destacada y Boost para agentes InmueblePro.",
};

export default function PricingPage() {
  return <PricingView />;
}
