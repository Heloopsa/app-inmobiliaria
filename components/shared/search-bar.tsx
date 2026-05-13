"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PROPERTY_CATEGORIES, categorySelectLabel } from "@/lib/property-options";
import { cn } from "@/lib/utils";

function selectClasses(compact: boolean) {
  return cn(
    "flex w-full min-w-0 max-w-full rounded-xl border border-input bg-[#F9FAFB] font-medium text-navy shadow-sm",
    "text-ellipsis overflow-hidden whitespace-nowrap",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/20",
    compact ? "h-9 px-2 text-xs" : "h-11 px-2.5 text-sm sm:px-3"
  );
}

interface SearchBarProps {
  variant?: "hero" | "compact";
  className?: string;
  defaultLocation?: string;
  defaultDealType?: string;
  defaultPriceMax?: string;
  defaultCategory?: string;
  defaultHabMin?: string;
  defaultMoneda?: string;
}

export function SearchBar({
  variant = "hero",
  className,
  defaultLocation = "",
  defaultDealType = "venta",
  defaultPriceMax = "",
  defaultCategory = "",
  defaultHabMin = "",
  defaultMoneda = "",
}: SearchBarProps) {
  const router = useRouter();
  const [location, setLocation] = useState(defaultLocation);
  const [dealType, setDealType] = useState(defaultDealType);
  const [priceMax, setPriceMax] = useState(defaultPriceMax);
  const [category, setCategory] = useState(defaultCategory);
  const [habMin, setHabMin] = useState(defaultHabMin);
  const [moneda, setMoneda] = useState(defaultMoneda);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location.trim()) params.set("q", location.trim());
    if (dealType) params.set("tipo", dealType);
    if (priceMax.trim()) params.set("precio_max", priceMax.trim());
    if (category) params.set("categoria", category);
    if (habMin) params.set("hab_min", habMin);
    if (moneda) params.set("moneda", moneda);
    const qs = params.toString();
    router.push(qs ? `/search?${qs}` : "/search");
  }

  const isHero = variant === "hero";
  const compact = variant === "compact";

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        isHero
          ? "grid w-full grid-cols-1 items-end gap-2 rounded-2xl border border-white/40 bg-white/90 p-3 shadow-soft backdrop-blur sm:gap-3 md:grid-cols-2 xl:grid-cols-12 xl:gap-2"
          : "grid w-full grid-cols-2 items-end gap-2 sm:grid-cols-3 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.55fr)_minmax(0,0.72fr)_minmax(0,0.52fr)_minmax(0,0.48fr)_minmax(0,0.68fr)_auto] lg:gap-2",
        className
      )}
    >
      <div
        className={cn(
          "min-w-0",
          isHero ? "md:col-span-2 xl:col-span-3" : "col-span-2 sm:col-span-2 lg:col-span-1"
        )}
      >
        <label className="sr-only" htmlFor="search-location">
          Ubicación
        </label>
        <Input
          id="search-location"
          placeholder={compact ? "Ubicación…" : "Ciudad, sector o proyecto"}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={cn(compact ? "h-9 text-xs" : "h-11 bg-[#F9FAFB] text-sm", "min-w-0")}
        />
      </div>
      <div className={cn("min-w-0", isHero ? "xl:col-span-2" : "min-w-0")}>
        <label className="sr-only" htmlFor="search-type">
          Operación
        </label>
        <select
          id="search-type"
          value={dealType}
          onChange={(e) => setDealType(e.target.value)}
          className={selectClasses(compact)}
          title="Tipo de operación"
        >
          <option value="venta">Compra</option>
          <option value="alquiler">Renta</option>
        </select>
      </div>
      <div className={cn("min-w-0", isHero ? "xl:col-span-2" : "min-w-0")}>
        <label className="sr-only" htmlFor="search-category">
          Categoría
        </label>
        <select
          id="search-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={selectClasses(compact)}
        >
          <option value="" title="Todas las categorías">
            {compact ? "Tipo" : "Todas"}
          </option>
          {PROPERTY_CATEGORIES.map((c) => (
            <option key={c} value={c} title={c}>
              {categorySelectLabel(c)}
            </option>
          ))}
        </select>
      </div>
      <div className={cn("min-w-0", isHero ? "xl:col-span-2" : "min-w-0")}>
        <label className="sr-only" htmlFor="search-hab">
          Habitaciones
        </label>
        <select
          id="search-hab"
          value={habMin}
          onChange={(e) => setHabMin(e.target.value)}
          className={selectClasses(compact)}
          title="Habitaciones mínimas"
        >
          <option value="" title="Sin mínimo de habitaciones">
            {compact ? "Hab." : "Habitaciones"}
          </option>
          <option value="0" title="Solo estudio / 0 habitaciones">
            0 / estudio
          </option>
          <option value="1" title="1 o más habitaciones">
            1+
          </option>
          <option value="2" title="2 o más habitaciones">
            2+
          </option>
          <option value="3" title="3 o más habitaciones">
            3+
          </option>
          <option value="4" title="4 o más habitaciones">
            4+
          </option>
        </select>
      </div>
      <div className={cn("min-w-0", isHero ? "xl:col-span-1" : "min-w-0")}>
        <label className="sr-only" htmlFor="search-moneda">
          Moneda
        </label>
        <select
          id="search-moneda"
          value={moneda}
          onChange={(e) => setMoneda(e.target.value)}
          className={selectClasses(compact)}
          title="Moneda del precio"
        >
          <option value="" title="Todas las monedas">
            {compact ? "Mon." : "Moneda"}
          </option>
          <option value="USD" title="Dólares">
            USD
          </option>
          <option value="DOP" title="Pesos dominicanos">
            DOP
          </option>
        </select>
      </div>
      <div className={cn("min-w-0", isHero ? "xl:col-span-2" : "min-w-0")}>
        <label className="sr-only" htmlFor="search-price">
          Precio máximo
        </label>
        <Input
          id="search-price"
          inputMode="decimal"
          placeholder={compact ? "Máx. USD" : "Precio máx. (USD eq.)"}
          value={priceMax}
          onChange={(e) => setPriceMax(e.target.value)}
          title="Tope aproximado en USD (DOP se convierte)"
          className={cn(compact ? "h-9 text-xs" : "h-11 bg-[#F9FAFB] text-sm", "min-w-0")}
        />
      </div>
      <Button
        type="submit"
        className={cn(
          "shrink-0 font-semibold shadow-soft",
          isHero
            ? "h-11 w-full gap-2 sm:w-auto xl:col-span-2 xl:min-w-[6.5rem] xl:max-w-[7.5rem]"
            : "col-span-2 h-9 w-full justify-center gap-1.5 px-3 text-xs sm:col-span-1 lg:col-span-1 lg:max-w-[5.75rem] lg:justify-center"
        )}
      >
        <Search className={cn(compact ? "h-3.5 w-3.5" : "h-4 w-4")} aria-hidden />
        Buscar
      </Button>
    </form>
  );
}
