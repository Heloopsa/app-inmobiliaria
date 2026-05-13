import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CreateListingForm } from "@/components/listing/create-listing-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Publicar propiedad",
  description:
    "Alta completa de inmueble: datos, ubicación, precio, amenidades, fotos y contacto.",
};

export default function PublicarPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:max-w-4xl lg:px-8 lg:py-12">
      <Button variant="ghost" size="sm" className="-ml-2 mb-6 gap-1 text-muted-foreground" asChild>
        <Link href="/">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Volver al inicio
        </Link>
      </Button>
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
          Publicar propiedad
        </h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Completa todos los bloques. Los campos marcados con * son obligatorios para enviar
          a revisión. Este flujo está listo para persistir en Supabase y subir imágenes a
          Storage.
        </p>
      </header>
      <CreateListingForm />
    </div>
  );
}
