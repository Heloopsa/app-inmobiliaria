import {
  Anchor,
  Armchair,
  Bath,
  Bell,
  Briefcase,
  Car,
  Dumbbell,
  Fence,
  Flag,
  Footprints,
  Laptop,
  LayoutPanelTop,
  Layers,
  MapPinned,
  PawPrint,
  Shield,
  Ship,
  Snowflake,
  Sparkles,
  Sun,
  Trees,
  UtensilsCrossed,
  Warehouse,
  Waves,
  Wifi,
  type LucideIcon,
} from "lucide-react";

const AMENITY_MAP: Record<string, { label: string; icon: LucideIcon }> = {
  parking: { label: "Estacionamiento", icon: Car },
  gym: { label: "Gimnasio", icon: Dumbbell },
  pool: { label: "Piscina", icon: Waves },
  security: { label: "Seguridad 24/7", icon: Shield },
  elevator: { label: "Ascensor", icon: Layers },
  terrace: { label: "Terraza", icon: LayoutPanelTop },
  garden: { label: "Jardín", icon: Trees },
  corner: { label: "Esquina comercial", icon: MapPinned },
  "high-traffic": { label: "Alto tráfico", icon: MapPinned },
  fence: { label: "Perímetro", icon: Fence },
  wifi: { label: "Wi‑Fi", icon: Wifi },
  ac: { label: "Aire acondicionado", icon: Snowflake },
  furnished: { label: "Amueblado", icon: Armchair },
  "ocean-view": { label: "Vista al mar", icon: Ship },
  "beach-access": { label: "Acceso a playa", icon: Footprints },
  golf: { label: "Campo de golf", icon: Flag },
  concierge: { label: "Concierge", icon: Bell },
  "pet-friendly": { label: "Pet friendly", icon: PawPrint },
  solar: { label: "Paneles solares", icon: Sun },
  storage: { label: "Bodega / depósito", icon: Warehouse },
  balcony: { label: "Balcón", icon: LayoutPanelTop },
  coworking: { label: "Coworking", icon: Laptop },
  marina: { label: "Marina cercana", icon: Anchor },
  restaurant: { label: "Restaurante", icon: UtensilsCrossed },
  spa: { label: "Spa / wellness", icon: Bath },
  "commercial-ready": { label: "Listo para operar", icon: Briefcase },
};

export function listingAmenityOptions(): { key: string; label: string }[] {
  return Object.entries(AMENITY_MAP).map(([key, v]) => ({ key, label: v.label }));
}

export function resolveAmenity(key: string): {
  label: string;
  icon: LucideIcon;
} {
  return (
    AMENITY_MAP[key] ?? {
      label: key.replace(/-/g, " "),
      icon: Sparkles,
    }
  );
}
