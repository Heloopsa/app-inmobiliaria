import Link from "next/link";
import { motion } from "framer-motion";
import { MessageSquare, Phone, Mail, MessageCircle, Clock, MapPin, ArrowRight, Send, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const dynamic = 'force-dynamic';

const supportChannels = [
  {
    icon: MessageCircle,
    title: "Chat en vivo",
    description: "Habla con un agente en tiempo real. Disponible 24/7 para emergencias.",
    response: "Respuesta inmediata",
    available: true,
  },
  {
    icon: Mail,
    title: "Email",
    description: "Envíanos tu consulta y te responderemos en menos de 4 horas.",
    email: "soporte@inmueblepro.com",
    response: "Menos de 4 horas",
    available: true,
  },
  {
    icon: Phone,
    title: "Teléfono",
    description: "Línea directa para urgencias y clientes Premium.",
    phone: "+1 (809) 555-0199",
    response: "Disponible 24/7",
    available: true,
  },
];

const faqs = [
  {
    question: "¿Cómo reporto un problema técnico?",
    answer: "Puedes reportar cualquier problema técnico a través de nuestro chat en vivo, enviando un email a soporte@inmueblepro.com, o completando el formulario de contacto en esta página.",
  },
  {
    question: "¿Cuál es el horario de soporte?",
    answer: "Nuestro chat en vivo y teléfono están disponibles 24/7. El soporte por email responde en menos de 4 horas durante horario laboral (L-V, 8AM-6PM).",
  },
  {
    question: "¿Cómo hago seguimiento de mi ticket?",
    answer: "Una vez creado tu ticket de soporte, recibirás un correo con el número de ticket y un enlace para hacer seguimiento en tiempo real del estado de tu solicitud.",
  },
];

export const metadata = {
  title: "Soporte 24/7 · InmueblePro",
  description:
    "Nuestro equipo de soporte está disponible las 24 horas, los 7 días de la semana para ayudarte.",
};

export default function SoportePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy/95 to-emerald-brand/60 px-4 py-24 text-white sm:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-emerald-brand/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                <MessageSquare className="h-8 w-8 text-emerald-300" />
              </div>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Soporte 24/7
            </h1>
            <p className="mt-6 text-lg text-white/80 sm:text-xl max-w-3xl mx-auto">
              Estamos aquí para ayudarte en cualquier momento. Elige el canal que prefieras y te responderemos lo antes posible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl">
              Canales de soporte
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Elige el medio que te resulte más cómodo para contactarnos.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {supportChannels.map((channel, i) => (
              <motion.div
                key={channel.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-border/60 bg-white p-8 text-center dark:bg-zinc-900"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-brand/10">
                  <channel.icon className="h-7 w-7 text-emerald-brand" />
                </div>
                <h3 className="text-lg font-semibold text-navy dark:text-zinc-100">{channel.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{channel.description}</p>
                {channel.email && (
                  <a href={`mailto:${channel.email}`} className="mt-4 block text-emerald-brand hover:underline text-sm">
                    {channel.email}
                  </a>
                )}
                {channel.phone && (
                  <a href={`tel:${channel.phone.replace(/\s/g, "")}`} className="mt-4 block text-muted-foreground hover:text-navy dark:hover:text-zinc-100 text-sm">
                    {channel.phone}
                  </a>
                )}
                <div className="mt-4 flex items-center justify-center gap-2">
                  <Clock className="h-4 w-4 text-emerald-brand" />
                  <span className="text-xs font-medium text-muted-foreground">{channel.response}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-[#F9FAFB] px-4 py-20 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl mb-6">
                Envíanos un ticket
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Completa el formulario y nuestro equipo técnico revisará tu caso. Te responderemos lo antes posible con una solución o actualización.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Clock className="mt-1 h-5 w-5 shrink-0 text-emerald-brand" />
                  <div>
                    <h3 className="font-semibold text-navy dark:text-zinc-100">Horarios de respuesta</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Chat: 24/7 | Email: {"<"}4h response | Tel: 24/7</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <HelpCircle className="mt-1 h-5 w-5 shrink-0 text-emerald-brand" />
                  <div>
                    <h3 className="font-semibold text-navy dark:text-zinc-100">Centro de ayuda</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      <Link href="/ayuda" className="text-emerald-brand hover:underline">
                        Consulta nuestras preguntas frecuentes
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-emerald-brand" />
                  <div>
                    <h3 className="font-semibold text-navy dark:text-zinc-100">Oficina de soporte</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Piantini, Santo Domingo, RD</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-border/60 bg-white p-8 dark:bg-zinc-800"
            >
              <form className="space-y-5">
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input id="nombre" placeholder="Tu nombre" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellido">Apellido</Label>
                    <Input id="apellido" placeholder="Tu apellido" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-soporte">Correo electrónico</Label>
                  <Input id="email-soporte" type="email" placeholder="tu@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de consulta</Label>
                  <select id="tipo" className="flex h-10 w-full rounded-xl border border-border bg-transparent px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option value="">Selecciona un tipo</option>
                    <option value="tecnico">Problema técnico</option>
                    <option value="cuenta">Problema con mi cuenta</option>
                    <option value="pagos">Consulta de pagos</option>
                    <option value="seguridad">Reporte de seguridad</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prioridad">Prioridad</Label>
                  <select id="prioridad" className="flex h-10 w-full rounded-xl border border-border bg-transparent px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option value="baja">Baja - Consulta general</option>
                    <option value="media" selected>Media - Necesito ayuda pronto</option>
                    <option value="alta">Alta - Problema urgente</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mensaje">Describe tu problema</Label>
                  <Textarea id="mensaje" placeholder="Cuéntanos qué está sucediendo..." rows={5} />
                </div>
                <Button type="submit" className="w-full gap-2">
                  <Send className="h-4 w-4" />
                  Enviar ticket
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl">
              Preguntas rápidas
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Respuestas a las consultas más comunes de soporte.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="rounded-xl border border-border/60 bg-white p-6 dark:bg-zinc-900"
              >
                <h3 className="text-lg font-semibold text-navy dark:text-zinc-100 mb-2">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy px-4 py-20 dark:bg-zinc-900">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              ¿Prefieres chatear ahora?
            </h2>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Nuestro equipo de soporte en línea está disponible ahora mismo. Sin esperas, sin formularios.
            </p>
            <div className="mt-10">
              <Button size="lg" variant="accent" asChild>
                <Link href="#">
                  Iniciar chat en vivo
                  <MessageCircle className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}