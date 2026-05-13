import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Building2, Users, Briefcase, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const dynamic = 'force-dynamic';

const contactOptions = [
  {
    icon: Building2,
    title: "Ventas corporativas",
    description: "Planes para equipos y empresas",
    email: "ventas@inmueblepro.com",
    phone: "+1 (809) 555-0100",
  },
  {
    icon: Users,
    title: "Partnerships",
    description: "Colaboraciones estratégicas",
    email: "partners@inmueblepro.com",
    phone: "+1 (809) 555-0101",
  },
  {
    icon: Briefcase,
    title: "Agentes inmobiliarios",
    description: "Únete como agente verificado",
    email: "agentes@inmueblepro.com",
    phone: "+1 (809) 555-0102",
  },
];

export const metadata = {
  title: "Contacto comercial · InmueblePro",
  description:
    "¿Tienes preguntas sobre nuestros planes comerciales? Contáctanos y un asesor te ayudará.",
};

export default function ContactoComercialPage() {
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
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Contacto comercial
            </h1>
            <p className="mt-6 text-lg text-white/80 sm:text-xl max-w-3xl mx-auto">
              ¿Eres agente, desarrollador o empresa? Tenemos soluciones a medida para impulsar tu negocio inmobiliario.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {contactOptions.map((opt, i) => (
              <motion.div
                key={opt.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-border/60 bg-white p-8 text-center dark:bg-zinc-900"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-brand/10">
                  <opt.icon className="h-7 w-7 text-emerald-brand" />
                </div>
                <h3 className="text-lg font-semibold text-navy dark:text-zinc-100">{opt.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{opt.description}</p>
                <div className="mt-6 space-y-2">
                  <a href={`mailto:${opt.email}`} className="flex items-center justify-center gap-2 text-sm text-emerald-brand hover:underline">
                    <Mail className="h-4 w-4" />
                    {opt.email}
                  </a>
                  <a href={`tel:${opt.phone.replace(/\s/g, "")}`} className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-navy dark:hover:text-zinc-100">
                    <Phone className="h-4 w-4" />
                    {opt.phone}
                  </a>
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
              <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl">
                Envíanos un mensaje
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Completa el formulario y un asesor comercial se pondrá en contacto contigo en menos de 24 horas hábiles.
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <Clock className="mt-1 h-5 w-5 shrink-0 text-emerald-brand" />
                  <div>
                    <h3 className="font-semibold text-navy dark:text-zinc-100">Horario de atención</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Lunes a viernes, 8:00 AM - 6:00 PM (AST)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-emerald-brand" />
                  <div>
                    <h3 className="font-semibold text-navy dark:text-zinc-100">Oficina principal</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Piantini, Santo Domingo<br />
                      Av. Winston Churchill #42
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="mt-1 h-5 w-5 shrink-0 text-emerald-brand" />
                  <div>
                    <h3 className="font-semibold text-navy dark:text-zinc-100">Teléfono directo</h3>
                    <p className="mt-1 text-sm text-muted-foreground">+1 (809) 555-0100</p>
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
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empresa">Empresa (opcional)</Label>
                  <Input id="empresa" placeholder="Nombre de tu empresa" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="asunto">Asunto</Label>
                  <select id="asunto" className="flex h-10 w-full rounded-xl border border-border bg-transparent px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option value="">Selecciona un asunto</option>
                    <option value="ventas">Ventas corporativas</option>
                    <option value="partners">Partnerships</option>
                    <option value="agentes">Agentes inmobiliarios</option>
                    <option value="soporte">Soporte técnico</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mensaje">Mensaje</Label>
                  <Textarea id="mensaje" placeholder="Cuéntanos cómo podemos ayudarte..." rows={4} />
                </div>
                <Button type="submit" className="w-full gap-2">
                  <Send className="h-4 w-4" />
                  Enviar mensaje
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl">
              ¿Prefieres empezar solo?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Explora nuestros planes y precios disponibles para encontrar el que mejor se adapte a tus necesidades.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/pricing">Ver planes y precios</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}