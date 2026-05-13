import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/shared/search-bar";

export const metadata: Metadata = {
  title: "Landing",
  description:
    "InmueblePro conecta compradores, inquilinos y agentes en República Dominicana.",
};

export default function MarketingLandingPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-emerald-brand">
        InmueblePro · Marketing
      </p>
      <h1 className="mt-4 text-balance text-4xl font-semibold text-navy sm:text-5xl">
        La capa comercial para tu agencia inmobiliaria.
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
        Esta landing vive en el grupo{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-xs">(marketing)</code>{" "}
        para campañas y partnerships. El marketplace principal está en{" "}
        <Link href="/" className="font-medium text-navy underline-offset-4 hover:underline">
          inicio
        </Link>
        .
      </p>
      <div className="mx-auto mt-10 max-w-xl text-left">
        <SearchBar variant="hero" />
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/pricing">Ver planes</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/search">Explorar propiedades</Link>
        </Button>
      </div>
    </section>
  );
}
