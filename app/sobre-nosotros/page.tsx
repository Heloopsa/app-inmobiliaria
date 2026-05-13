import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Calendar, Target, Lightbulb, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

const timeline = [
  {
    year: "2018",
    title: "El inicio",
    description:
      "Todo comenzó con la frustración de buscar propiedades en Santo Domingo. Sin plataformas confiables, decidimos crear una.",
  },
  {
    year: "2019",
    title: "Primeros pasos",
    description:
      "Lanzamos el MVP en Santo Domingo con 200 propiedades. Los primeros agentes se unieron entusiasmados con la plataforma.",
  },
  {
    year: "2020",
    title: "Crecimiento acelerado",
    description:
      "Durante la pandemia, la demanda de bienes raíces digitales se disparó. Nos adaptamos y crecimos un 300%.",
  },
  {
    year: "2022",
    title: "Expansión nacional",
    description:
      "Llegamos a Punta Cana, Santiago, La Romana y otras ciudades clave de la República Dominicana.",
  },
  {
    year: "2024",
    title: "Ecosistema completo",
    description:
      "Hoy somos el marketplace inmobiliario más completo de RD con miles de agentes y propiedades verificadas.",
  },
];

const cities = [
  { name: "Santo Domingo", properties: "4,500+" },
  { name: "Punta Cana", properties: "2,100+" },
  { name: "Santiago", properties: "1,800+" },
  { name: "La Romana", properties: "900+" },
  { name: "Puerto Plata", properties: "700+" },
  { name: "San Pedro de Macorís", properties: "500+" },
];

export const metadata = {
  title: "Sobre nosotros · InmueblePro",
  description:
    "Conoce nuestra historia, misión y cómo hemos transformado el mercado inmobiliario en República Dominicana.",
};

export default function SobreNosotrosPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy/95 to-emerald-brand/60 px-4 py-24 text-white sm:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-emerald-brand/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Nuestra historia
            </h1>
            <p className="mt-6 text-lg text-white/80 sm:text-xl max-w-3xl mx-auto">
              Desde 2018, hemos trabajado incansablemente para transformar la experiencia inmobiliaria en República Dominicana. Todo comenzó con una idea simple: hacer que encontrar propiedades sea fácil, transparente y confiable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-border/60 bg-[#F9FAFB] p-8 dark:bg-zinc-900"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-navy/10">
                <Target className="h-7 w-7 text-navy dark:text-emerald-brand" />
              </div>
              <h2 className="text-2xl font-bold text-navy dark:text-zinc-100">Nuestra misión</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Democratizar el acceso a la información inmobiliaria en República Dominicana, brindando herramientas digitales que empoderen a compradores, vendedores y agentes profesionales para tomar mejores decisiones.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-border/60 bg-[#F9FAFB] p-8 dark:bg-zinc-900"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-brand/10">
                <Lightbulb className="h-7 w-7 text-emerald-brand" />
              </div>
              <h2 className="text-2xl font-bold text-navy dark:text-zinc-100">Nuestra visión</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Ser la plataforma inmobiliaria líder en Latinoamérica para el año 2027, reconocidos por nuestra innovación tecnológica, confiabilidad y compromiso con el desarrollo de comunidades prósperas.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#F9FAFB] px-4 py-20 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl">
              Nuestro recorrido
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Un historial de crecimiento, aprendizaje y compromiso con la excelencia.
            </p>
          </div>
          <div className="relative mt-12 max-w-3xl mx-auto">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-navy/20 dark:bg-emerald-brand/20" />
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative pl-16 pb-12 last:pb-0"
              >
                <div className="absolute left-2 top-1 h-5 w-5 rounded-full bg-navy dark:bg-emerald-brand ring-4 ring-white dark:ring-zinc-900" />
                <span className="text-sm font-bold text-emerald-brand">{item.year}</span>
                <h3 className="mt-1 text-xl font-semibold text-navy dark:text-zinc-100">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl">
              Cobertura nacional
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Presentes en las principales ciudades y zonas turísticas de República Dominicana.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city, i) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="flex items-center justify-between rounded-xl border border-border/60 p-5 transition-colors hover:border-emerald-brand/30 dark:bg-zinc-900"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-emerald-brand" />
                  <span className="font-medium text-navy dark:text-zinc-100">{city.name}</span>
                </div>
                <span className="rounded-full bg-emerald-brand/10 px-3 py-1 text-sm font-medium text-emerald-brand">
                  {city.properties}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-navy to-emerald-brand/80 px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Sé parte de nuestra historia
            </h2>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Ya seas comprador, vendedor o agente profesional, hay un lugar para ti en InmueblePro.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="accent" asChild>
                <Link href="/search">Explorar propiedades</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/pricing">Publicar mi primera propiedad</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}