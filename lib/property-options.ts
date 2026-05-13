/**
 * Listas curadas para filtros, selects y onboarding (RD / LATAM).
 * Las propiedades demo en `mock-data` usan subconjuntos de estas etiquetas.
 */
export const PROPERTY_CATEGORIES = [
  "Apartamento",
  "Penthouse",
  "Villa",
  "Townhouse",
  "Loft",
  "Estudio",
  "Terreno",
  "Local comercial",
  "Oficina",
  "Edificio",
  "Finca",
  "Nave industrial",
  "Hotel / hospedaje",
] as const;

export type PropertyCategory = (typeof PROPERTY_CATEGORIES)[number];

export const PROPERTY_CITIES = [
  "Santo Domingo",
  "Santo Domingo Este",
  "Santiago",
  "Puerto Plata",
  "Punta Cana",
  "La Romana",
  "San Pedro de Macorís",
  "Boca Chica",
  "Samaná",
  "Jarabacoa",
  "Barahona",
  "San Cristóbal",
] as const;

export type PropertyCity = (typeof PROPERTY_CITIES)[number];

/** Zonas frecuentes por ciudad (UI: autocompletado o chips). */
export const ZONES_BY_CITY: Record<string, readonly string[]> = {
  "Santo Domingo": [
    "Piantini",
    "Naco",
    "Serrallés",
    "Gazcue",
    "Ciudad Colonial",
    "Ensanche Paraíso",
    "Ensanche Julieta",
    "Arroyo Hondo",
    "Evaristo Morales",
    "Los Cacicazgos",
  ],
  "Santo Domingo Este": [
    "San Isidro",
    "Alma Rosa",
    "Lucerna",
    "Autopista San Isidro",
    "Ciudad Juan Bosch",
  ],
  Santiago: ["Los Jardines", "Cerros de Gurabo", "Villa Olga", "Centro", "Cibao"],
  "Puerto Plata": ["Playa Dorada", "Costámbar", "Cofresí", "Centro histórico"],
  "Punta Cana": [
    "Bávaro",
    "Cap Cana",
    "Punta Cana Village",
    "Veron",
    "Cabeza de Toro",
  ],
  "La Romana": ["Casa de Campo", "Centro", "Caleta"],
  "San Pedro de Macorís": ["Centro", "Playa", "UASD"],
  "Boca Chica": ["Andrés", "Centro", "Caracol"],
  Samaná: ["Las Terrenas", "El Limón", "Santa Bárbara de Samaná"],
  Jarabacoa: ["Centro", "Buena Vista", "Manabao"],
  Barahona: ["Centro", "Paraíso", "Costa"],
  "San Cristóbal": ["Centro", "Haina", "Villa Fundación"],
} as const;

export const DEAL_TYPE_OPTIONS = [
  { value: "venta", label: "Comprar" },
  { value: "alquiler", label: "Alquilar" },
] as const;

export const CURRENCY_OPTIONS = [
  { value: "USD", label: "USD" },
  { value: "DOP", label: "DOP" },
] as const;

/** Referencia orientativa para filtrar por tope en USD cuando el listing está en DOP. */
export const APPROX_DOP_PER_USD = 59;

/** Texto compacto en `<select>` (nombre completo en `title` del `<option>`). */
export const CATEGORY_SELECT_SHORT: Record<string, string> = {
  Apartamento: "Apto",
  Penthouse: "Pent.",
  Villa: "Villa",
  Townhouse: "Townh.",
  Loft: "Loft",
  Estudio: "Estudio",
  Terreno: "Terreno",
  "Local comercial": "Local",
  Oficina: "Oficina",
  Edificio: "Edificio",
  Finca: "Finca",
  "Nave industrial": "Nave",
  "Hotel / hospedaje": "Hotel",
};

export function categorySelectLabel(full: string): string {
  if (!full) return "";
  return CATEGORY_SELECT_SHORT[full] ?? full;
}
