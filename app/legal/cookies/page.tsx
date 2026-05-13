import Link from "next/link";
import { motion } from "framer-motion";
import { Cookie, Settings, Trash2, Info, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

const cookieTypes = [
  {
    name: "Esenciales",
    description: "Necesarios para el funcionamiento básico de la plataforma. No requieren consentimiento.",
    examples: ["Sesión del usuario", "Seguridad", "Ajustes de idioma"],
  },
  {
    name: "Funcionales",
    description: "Permiten recordar elecciones como preferencias de búsqueda y personalización.",
    examples: ["Favoritos guardados", "Vista preferida", "Zonas de búsqueda"],
  },
  {
    name: "Analíticos",
    description: "Nos ayudan a entender cómo los visitantes interactúan con la plataforma.",
    examples: ["Google Analytics", "Heatmaps", "Tiempo en página"],
  },
  {
    name: "De marketing",
    description: "Se utilizan para entregar anuncios relevantes y medir su efectividad.",
    examples: ["Facebook Pixel", "Google Ads", "Retargeting"],
  },
];

const browserSettings = [
  { browser: "Chrome", url: "https://support.google.com/chrome/answer/95647" },
  { browser: "Firefox", url: "https://support.mozilla.org/es-ES/kb/cookies" },
  { browser: "Safari", url: "https://support.apple.com/es-es/guide/safari/sfri11471" },
  { browser: "Edge", url: "https://support.microsoft.com/es-es/microsoft-edge" },
];

export const metadata = {
  title: "Cookies · InmueblePro",
  description:
    "Conoce nuestra política de cookies y cómo las utilizamos para mejorar tu experiencia.",
};

export default function CookiesPage() {
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
                <Cookie className="h-8 w-8 text-emerald-300" />
              </div>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Política de cookies
            </h1>
            <p className="mt-6 text-lg text-white/80 sm:text-xl max-w-3xl mx-auto">
              Utilizamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar contenido. Aquí te explicamos cómo y por qué las usamos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cookie Types */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl">
              Tipos de cookies que usamos
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Cada tipo de cookie cumple una función específica para ofrecerte la mejor experiencia posible.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            {cookieTypes.map((cookie, i) => (
              <motion.div
                key={cookie.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-border/60 bg-white p-8 dark:bg-zinc-900"
              >
                <h3 className="text-lg font-semibold text-navy dark:text-zinc-100 mb-2">{cookie.name}</h3>
                <p className="text-muted-foreground mb-4">{cookie.description}</p>
                <div className="flex flex-wrap gap-2">
                  {cookie.examples.map((ex) => (
                    <span key={ex} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      {ex}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Browser Settings */}
      <section className="bg-[#F9FAFB] px-4 py-20 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Settings className="h-8 w-8 text-emerald-brand" />
                <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl">
                  Controla tus cookies
                </h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Puedes gestionar y configurar las cookies a través de la configuración de tu navegador. También puedes eliminarlas o bloquearlas completamente.
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  { icon: Settings, text: "Configura tu navegador para rechazar cookies" },
                  { icon: Trash2, text: "Elimina las cookies existentes en cualquier momento" },
                  { icon: Info, text: "Las cookies de sesión se eliminan al cerrar el navegador" },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-brand" />
                    <span className="text-muted-foreground">{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-navy dark:text-zinc-100 mb-6">
                Configuración por navegador
              </h3>
              <div className="space-y-3">
                {browserSettings.map((browser) => (
                  <a
                    key={browser.browser}
                    href={browser.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-border/60 bg-white p-4 transition-colors hover:border-emerald-brand/30 dark:bg-zinc-800"
                  >
                    <span className="font-medium text-navy dark:text-zinc-100">{browser.browser}</span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                ))}
              </div>
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
              ¿Tienes preguntas sobre nuestras cookies?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Si tienes alguna duda o quieres más información sobre nuestro uso de cookies, no dudes en contactarnos.
            </p>
            <div className="mt-8">
              <Button asChild>
                <Link href="/contacto-comercial">Contactar soporte</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}