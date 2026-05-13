"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LayoutDashboard, PlusCircle, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AccountHubSection() {
  return (
    <section className="border-y border-border bg-[#F9FAFB] py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
            Tu espacio InmueblePro
          </h2>
          <p className="mt-3 text-muted-foreground">
            Gestiona tu cuenta y publica con el mismo estándar editorial del marketplace.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
          >
            <Card className="h-full border-border/80 shadow-sm transition hover:shadow-md">
              <CardHeader>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-white shadow-soft">
                  <UserRound className="h-5 w-5" aria-hidden />
                </div>
                <CardTitle className="text-xl">Mi cuenta</CardTitle>
                <CardDescription>
                  Perfil de agente, seguridad, facturación y preferencias de notificación.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild className="sm:flex-1">
                  <Link href="/cuenta">Ver mi cuenta</Link>
                </Button>
                <Button variant="outline" asChild className="sm:flex-1">
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" aria-hidden />
                    Panel agente
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.06 }}
          >
            <Card className="h-full border-emerald-brand/25 bg-white shadow-sm ring-1 ring-emerald-brand/10 transition hover:shadow-md">
              <CardHeader>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-brand text-white shadow-soft">
                  <PlusCircle className="h-5 w-5" aria-hidden />
                </div>
                <CardTitle className="text-xl">Publicar propiedad</CardTitle>
                <CardDescription>
                  Formulario guiado con todo lo necesario para una publicación completa y
                  lista para revisión.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full gap-2 sm:w-auto">
                  <Link href="/publicar">
                    Abrir formulario de publicación
                    <PlusCircle className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
