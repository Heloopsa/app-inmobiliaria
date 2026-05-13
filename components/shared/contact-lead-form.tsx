"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ContactLeadFormProps {
  propertyTitle: string;
}

export function ContactLeadForm({ propertyTitle }: ContactLeadFormProps) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <Card className="border-border/80 shadow-soft">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Agenda una visita</CardTitle>
        <p className="text-sm text-muted-foreground">
          Completa el formulario y un agente verificado te contactará en menos
          de 2 horas hábiles.
        </p>
        <p className="text-xs font-medium text-navy/70">{propertyTitle}</p>
      </CardHeader>
      <CardContent>
        {sent ? (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-emerald-brand/30 bg-emerald-brand/10 px-4 py-3 text-sm font-medium text-emerald-900"
          >
            ¡Listo! Hemos recibido tu solicitud. Revisa tu correo para
            confirmar el contacto.
          </motion.p>
        ) : (
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="lead-name">Nombre completo</Label>
              <Input id="lead-name" name="name" required placeholder="Tu nombre" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lead-email">Correo electrónico</Label>
              <Input
                id="lead-email"
                name="email"
                type="email"
                required
                placeholder="tu@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lead-phone">Teléfono / WhatsApp</Label>
              <Input
                id="lead-phone"
                name="phone"
                required
                placeholder="+1 809 ···"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lead-msg">Mensaje (opcional)</Label>
              <textarea
                id="lead-msg"
                name="message"
                rows={3}
                className="flex w-full rounded-xl border border-input bg-white px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/20"
                placeholder="Horario preferido, financiamiento, etc."
              />
            </div>
            <Button type="submit" className="w-full">
              Solicitar información
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Al enviar, aceptas nuestros términos de contacto y política de
              privacidad.
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
