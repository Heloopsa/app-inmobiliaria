import Link from "next/link";
import { motion } from "framer-motion";
import { Megaphone, FileText, ExternalLink, Calendar, Image as ImageIcon, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

const pressReleases = [
  {
    date: "15 Enero, 2025",
    title: "InmueblePro lanza nueva plataforma de tours virtuales con IA",
    excerpt: "La nueva funcionalidad permite a los compradores recorrer propiedades de forma inmersiva desde cualquier lugar del mundo.",
    link: "#",
  },
  {
    date: "3 Noviembre, 2024",
    title: "InmueblePro supera las 10,000 propiedades verificadas en toda RD",
    excerpt: "El marketplace inmobiliario más grande de República Dominicana alcanza un hito histórico con el crecimiento sostenido del último año.",
    link: "#",
  },
  {
    date: "20 Agosto, 2024",
    title: "InmueblePro cierra ronda de inversión seed de $3M USD",
    excerpt: "La inversión será utilizada para expandir la plataforma a nuevos mercados de Centroamérica y fortalecer el equipo tecnológico.",
    link: "#",
  },
];

const media = [
  { type: "logo", name: "InmueblePro Logo Horizontal", desc: "PNG + SVG, fondo transparente" },
  { type: "logo", name: "InmueblePro Logo Vertical", desc: "PNG + SVG, fondo transparente" },
  { type: "screenshot", name: "Screenshots App Desktop", desc: "1920x1080, PNG" },
  { type: "screenshot", name: "Screenshots App Mobile", desc: "1080x1920, PNG" },
  { type: "brand", name: "Kit de Marca Completo", desc: "PDF + archivos fuente" },
];

export const metadata = {
  title: "Prensa · InmueblePro",
  description:
    "Recursos para periodistas, bloggers y medios de comunicación sobre InmueblePro.",
};

export default function PrensaPage() {
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
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                <Megaphone className="h-8 w-8 text-emerald-300" />
              </div>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Sala de prensa
            </h1>
            <p className="mt-6 text-lg text-white/80 sm:text-xl max-w-3xl mx-auto">
              Recursos, comunicados de prensa y material multimedia para periodistas y medios de comunicación.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl">
              Comunicados de prensa
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Las últimas noticias y anuncios sobre InmueblePro.
            </p>
          </div>
          <div className="space-y-6 max-w-4xl mx-auto">
            {pressReleases.map((release, i) => (
              <motion.article
                key={release.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-border/60 p-8 transition-colors hover:border-emerald-brand/30 dark:bg-zinc-900"
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="h-4 w-4" />
                  <time>{release.date}</time>
                </div>
                <h3 className="text-xl font-semibold text-navy dark:text-zinc-100 mb-2">{release.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{release.excerpt}</p>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={release.link}>
                    Leer más
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="bg-[#F9FAFB] px-4 py-20 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl">
              Kit de medios
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Logos, capturas de pantalla y material de marca listo para usar.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {media.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="rounded-xl border border-border/60 bg-white p-6 text-center dark:bg-zinc-800"
              >
                {item.type === "logo" ? (
                  <FileText className="mx-auto h-12 w-12 text-emerald-brand mb-4" />
                ) : item.type === "screenshot" ? (
                  <ImageIcon className="mx-auto h-12 w-12 text-emerald-brand mb-4" />
                ) : (
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-navy to-emerald-brand">
                    <span className="text-white font-bold text-xs">BRAND</span>
                  </div>
                )}
                <h3 className="font-semibold text-navy dark:text-zinc-100">{item.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  Descargar
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl">
              Contacto para prensa
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Para entrevistas, pedidos de información o cualquier consulta de prensa, no dudes en contactarnos.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-border/60 bg-[#F9FAFB] px-6 py-4 dark:bg-zinc-900">
              <Mail className="h-5 w-5 text-emerald-brand" />
              <span className="font-medium text-navy dark:text-zinc-100">prensa@inmueblepro.com</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}