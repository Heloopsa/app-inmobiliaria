import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, Users, TrendingUp, Shield, Globe, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

const stats = [
  { value: "10,000+", label: "Propiedades listadas", icon: Globe },
  { value: "5,000+", label: "Agentes activos", icon: Users },
  { value: "98%", label: "Satisfacción cliente", icon: Heart },
  { value: "15+", label: "Años en el mercado", icon: TrendingUp },
];

const values = [
  {
    icon: Shield,
    title: "Confianza y transparencia",
    description:
      "Operamos con total transparencia en cada transacción. Cada propiedad verificada pasa por un riguroso proceso de validación.",
  },
  {
    icon: Users,
    title: "Comunidad primero",
    description:
      "Construimos herramientas que conectan compradores, vendedores y agentes profesionales en un solo ecosistema.",
  },
  {
    icon: TrendingUp,
    title: "Innovación constante",
    description:
      "Utilizamos tecnología de vanguardia para mejorar la experiencia inmobiliaria en República Dominicana y LATAM.",
  },
  {
    icon: Heart,
    title: "Compromiso local",
    description:
      "Entendemos el mercado dominicano. Nuestro equipo conoce cada zona, cada comunidad y sus particularidades.",
  },
];

const team = [
  { name: "María González", role: "CEO & Fundadora", avatar: "MG" },
  { name: "Carlos Ramírez", role: "CTO", avatar: "CR" },
  { name: "Ana Martínez", role: "VP de Producto", avatar: "AM" },
  { name: "José Hernández", role: "VP de Ventas", avatar: "JH" },
];

export const metadata = {
  title: "Empresa · InmueblePro",
  description:
    "Conoce la historia detrás de InmueblePro, el marketplace inmobiliario líder en República Dominicana.",
};

export default function EmpresaPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy/95 to-emerald-brand/80 px-4 py-24 text-white sm:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-emerald-brand/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="mb-6 flex items-center gap-2 text-emerald-300">
              <Building2 className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wider">InmueblePro</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Transformando el mercado inmobiliario en Latinoamérica
            </h1>
            <p className="mt-6 text-lg text-white/80 sm:text-xl">
              Conectamos personas con sus sueños habitacionales a través de tecnología, transparencia y compromiso con la comunidad.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg" variant="accent" asChild>
                <Link href="/search">Explorar propiedades</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Contáctanos</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-12 z-10 px-4 pb-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                className="rounded-2xl border border-border/60 bg-white p-6 shadow-lg dark:bg-zinc-900"
              >
                <stat.icon className="mb-3 h-8 w-8 text-emerald-brand" />
                <div className="text-3xl font-bold text-navy dark:text-zinc-100">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl">
                Nuestra misión
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                En InmueblePro, nos dedicamos a revolucionar la forma en que las personas interactúan con el mercado inmobiliario en República Dominicana. Creemos que encontrar un hogar ideal debería ser simple, transparente y accesible para todos.
              </p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Nuestra plataforma combina tecnología de punta con un profundo conocimiento del mercado local, ofreciendo herramientas poderosas tanto para compradores como para agentes profesionales.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl bg-gradient-to-br from-emerald-brand/20 to-navy/10 p-8 dark:from-emerald-brand/10 dark:to-navy/20"
            >
               <blockquote className="text-xl font-medium text-navy dark:text-zinc-100 italic">
                 {`"No solo listamos propiedades, construimos puentes entre personas y sus próximos capítulos de vida."`}
               </blockquote>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white font-semibold text-sm">
                  MG
                </div>
                <div>
                  <div className="font-semibold text-navy dark:text-zinc-100">María González</div>
                  <div className="text-sm text-muted-foreground">CEO & Fundadora</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#F9FAFB] px-4 py-20 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl">
              Nuestros valores
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Los principios que guían cada decisión que tomamos y cada línea de código que escribimos.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-2xl bg-white p-8 shadow-sm dark:bg-zinc-800"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-brand/10">
                  <v.icon className="h-7 w-7 text-emerald-brand" />
                </div>
                <h3 className="text-lg font-semibold text-navy dark:text-zinc-100">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl">
              Nuestro equipo
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Un equipo diverso y apasionado que trabaja cada día para mejorar la experiencia inmobiliaria.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-navy to-emerald-brand text-2xl font-bold text-white">
                  {member.avatar}
                </div>
                <h3 className="text-lg font-semibold text-navy dark:text-zinc-100">{member.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy px-4 py-20 dark:bg-zinc-900">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            ¿Listo para comenzar tu búsqueda?
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Únete a miles de personas que ya confían en InmueblePro para encontrar su propiedad ideal.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="accent" asChild>
              <Link href="/search">Explorar propiedades</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/pricing">Ver planes y precios</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}