import Link from "next/link";
import { motion } from "framer-motion";
import { Code, Palette, Megaphone, Heart, Users, Rocket, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

const benefits = [
  {
    icon: Heart,
    title: "Salud y bienestar integral",
    description: "Seguro médico premium para ti y tus dependientes. Acceso a programas de bienestar mental y físico.",
  },
  {
    icon: Rocket,
    title: "Crecimiento profesional",
    description: "Presupuesto anual para capacitación, conferencias y cursos. Planes de carrera claros y transparentes.",
  },
  {
    icon: Users,
    title: "Flexibilidad laboral",
    description: "Trabajo remoto híbrido, horarios flexibles y días libres adicionales por cumpleaños y aniversarios.",
  },
  {
    icon: Palette,
    title: "Equipo de primer nivel",
    description: "Trabaja con profesionales talentosos de todo el mundo en un ambiente inclusivo y colaborativo.",
  },
];

const openings = [
  { department: "Ingeniería", role: "Senior Frontend Developer", type: "Tiempo completo", location: "Remoto / RD", level: "Senior" },
  { department: "Ingeniería", role: "Backend Engineer (Node.js)", type: "Tiempo completo", location: "Remoto / RD", level: "Mid-Senior" },
  { department: "Diseño", role: "Product Designer UI/UX", type: "Tiempo completo", location: "Remoto / RD", level: "Senior" },
  { department: "Marketing", role: "Growth Marketing Manager", type: "Tiempo completo", location: "Remoto / RD", level: "Senior" },
  { department: "Ventas", role: "Account Executive LATAM", type: "Tiempo completo", location: "Remoto / RD", level: "Mid-Senior" },
  { department: "Soporte", role: "Customer Success Lead", type: "Tiempo completo", location: "Remoto / RD", level: "Senior" },
];

const culture = [
  "Reuniones mensuales de todo el equipo en persona",
  "Programa de referencias con bonificación",
  "Días de voluntariado corporativo pagados",
  "Comunidad de mujeres en tecnología",
  "Hackathons trimestrales internos",
  "Plan de acciones para empleados (EPO)",
];

export const metadata = {
  title: "Carreras · InmueblePro",
  description:
    "Únete al equipo de InmueblePro y ayuda a transformar el mercado inmobiliario en Latinoamérica.",
};

export default function CarrerasPage() {
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
              Construye el futuro inmobiliario con nosotros
            </h1>
            <p className="mt-6 text-lg text-white/80 sm:text-xl max-w-3xl mx-auto">
              Buscamos personas talentosas, apasionadas y con mentalidad de crecimiento que quieran marcar la diferencia en Latinoamérica.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl">
              ¿Por qué trabajar con nosotros?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Ofrecemos un paquete de beneficios completo para que puedas dar lo mejor de ti, tanto en el trabajo como en tu vida personal.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-border/60 bg-white p-8 transition-colors hover:border-emerald-brand/30 dark:bg-zinc-900"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-brand/10">
                  <b.icon className="h-7 w-7 text-emerald-brand" />
                </div>
                <h3 className="text-lg font-semibold text-navy dark:text-zinc-100">{b.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="bg-[#F9FAFB] px-4 py-20 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl">
                Nuestra cultura
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Creemos en un ambiente de trabajo donde la diversidad se celebra, la innovación es parte del día a día y cada persona tiene voz y voto.
              </p>
              <ul className="mt-6 space-y-3">
                {culture.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-brand" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { num: "50+", label: "Miembros del equipo" },
                { num: "12", label: "Nationalidades" },
                { num: "95%", label: "Tasa de retención" },
                { num: "4.8/5", label: "eNPS score" },
              ].map((stat, i) => (
                <div key={stat.label} className="rounded-xl bg-white p-6 text-center dark:bg-zinc-800">
                  <div className="text-3xl font-bold text-emerald-brand">{stat.num}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Openings */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl">
              Posiciones abiertas
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Encuentra tu próximo desafío profesional. Todas las posiciones son remotas con flexibilidad horaria.
            </p>
          </div>
          <div className="space-y-4 max-w-4xl mx-auto">
            {openings.map((job, i) => (
              <motion.div
                key={job.role}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="group flex flex-col gap-4 rounded-xl border border-border/60 p-6 transition-colors hover:border-emerald-brand/30 dark:bg-zinc-900 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-semibold text-navy dark:text-zinc-100 group-hover:text-emerald-brand transition-colors">
                    {job.role}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-navy/10 px-3 py-1 text-xs font-medium text-navy dark:bg-navy/20">
                      {job.department}
                    </span>
                    <span className="rounded-full bg-emerald-brand/10 px-3 py-1 text-xs font-medium text-emerald-brand">
                      {job.type}
                    </span>
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      {job.location}
                    </span>
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                      {job.level}
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="shrink-0 group-hover:border-emerald-brand group-hover:text-emerald-brand transition-colors">
                  Ver detalle
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
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
              ¿No ves tu posición?
            </h2>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Siempre buscamos talento excepcional. Envíanos tu perfil y te contactaremos cuando haya una oportunidad disponible.
            </p>
            <div className="mt-10">
              <Button size="lg" variant="accent" asChild>
                <Link href="/contact">Enviar mi perfil</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}