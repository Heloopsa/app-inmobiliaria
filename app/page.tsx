import type { Metadata } from "next";
import { HomeView } from "@/components/home/home-view";

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Explora propiedades destacadas en RD, busca por mapa y conecta con agentes verificados.",
};

export default function HomePage() {
  return <HomeView />;
}
