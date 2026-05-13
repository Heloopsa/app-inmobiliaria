import Link from "next/link";
import { motion } from "framer-motion";
import { Search, MessageSquare, HelpCircle, Building2, Key, CreditCard, User, Shield, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const dynamic = 'force-dynamic';

const categories = [
  {
    icon: Key,
    title: "Cuenta y registro",
    description: "Crea tu cuenta, recupera tu contraseña y gestiona tu perfil.",
    articles: [
      "¿Cómo crear una cuenta en InmueblePro?",
      "¿Cómo restablecer mi contraseña?",
      "¿Cómo actualizar mi información personal?",
      "¿Cómo verifico mi correo electrónico?",
      "¿Cómo cierro mi cuenta?",
    ],
  },
  {
    icon: Building2,
    title: "Publicar propiedades",
    description: "Aprende a publicar y gestionar tus listados inmobiliarios.",
    articles: [
      "¿Cómo publicar mi primera propiedad?",
      "¿Qué fotos debo incluir en mi anuncio?",
      "¿Cómo editar una propiedad publicada?",
      "¿Cómo elimino un listado?",
      "¿Cómo destaco una propiedad?",
    ],
  },
  {
    icon: Search,
    title: "Buscar propiedades",
    description: "Encuentra la propiedad ideal con nuestras herramientas de búsqueda.",
    articles: [
      "¿Cómo usar el buscador avanzado?",
      "¿Cómo guardar propiedades en favoritos?",
      "¿Cómo recibir alertas de nuevas propiedades?",
      "¿Cómo ver propiedades en el mapa?",
      "¿Cómo comparar propiedades?",
    ],
  },
  {
    icon: CreditCard,
    title: "Pagos y suscripciones",
    description: "Información sobre planes, precios y métodos de pago.",
    articles: [
      "¿Qué planes están disponibles?",
      "¿Cómo cambio mi plan actual?",
      "¿Cuáles son los métodos de pago aceptados?",
      "¿Cómo solicito una factura?",
      "¿Cuál es la política de reembolsos?",
    ],
  },
  {
    icon: User,
    title: "Agentes inmobiliarios",
    description: "Herramientas y recursos para agentes profesionales.",
    articles: [
      "¿Cómo me verifico como agente?",
      "¿Qué beneficios tiene ser agente verificado?",
      "¿Cómo gestiono mis contactos?",
      "¿Cómo uso el panel de agente?",
      "¿Cómo recibo calificaciones?",
    ],
  },
  {
    icon: Shield,
    title: "Seguridad y privacidad",
    description: "Protección de datos y seguridad en la plataforma.",
    articles: [
      "¿Cómo protejo mi cuenta?",
      "¿Cómo funciona la verificación de identidad?",
      "¿Puedo confiar en los anuncios?",
      "¿Cómo reporto contenido inapropiado?",
      "¿Cómo gestionan mis datos personales?",
    ],
  },
];

export const metadata = {
  title: "Centro de ayuda · InmueblePro",
  description:
    "Encuentra respuestas a las preguntas más frecuentes sobre InmueblePro.",
};

const faqs = [
  {
    question: "¿InmueblePro es gratuito?",
    answer: "Sí, puedes explorar y buscar propiedades de forma completamente gratuita. Ofrecemos planes opcionales para agentes y vendedores que deseen mayor visibilidad.",
  },
  {
    question: "¿Cómo verifico que una propiedad esté disponible?",
    answer: "Recomendamos contactar directamente al publicador a través de los datos de contacto proporcionados en el listado para confirmar la disponibilidad antes de agendar una visita.",
  },
  {
    question: "¿Puedo publicar propiedades desde mi celular?",
    answer: "Sí, nuestra plataforma es completamente responsive y puedes publicar propiedades desde cualquier dispositivo con conexión a internet.",
  },
  {
    question: "¿Cómo manejo las quejas sobre contenido inapropiado?",
    answer: "Contamos con un sistema de reporte integrado. Cualquier usuario puede reportar contenido que considere inapropiado y nuestro equipo lo revisará en un plazo máximo de 24 horas.",
  },
];

export default function AyudaPage() {
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
                <HelpCircle className="h-8 w-8 text-emerald-300" />
              </div>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Centro de ayuda
            </h1>
            <p className="mt-6 text-lg text-white/80 sm:text-xl max-w-3xl mx-auto">
              Encuentra respuestas rápidas a las preguntas más comunes sobre InmueblePro.
            </p>
            <div className="mt-8 mx-auto max-w-xl">
              <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-3">
                <Search className="h-5 w-5 text-white/60" />
                <Input
                  type="search"
                  placeholder="Buscar en el centro de ayuda..."
                  className="border-0 bg-transparent text-white placeholder:text-white/50 shadow-none focus-visible:ring-white/30"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="group rounded-2xl border border-border/60 bg-white p-8 transition-colors hover:border-emerald-brand/30 dark:bg-zinc-900"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-brand/10">
                  <cat.icon className="h-7 w-7 text-emerald-brand" />
                </div>
                <h3 className="text-lg font-semibold text-navy dark:text-zinc-100 mb-2">{cat.title}</h3>
                <p className="text-sm text-muted-foreground mb-6">{cat.description}</p>
                <ul className="space-y-2">
                  {cat.articles.slice(0, 3).map((article) => (
                    <li key={article}>
                      <Link href="#" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-emerald-brand transition-colors">
                        <ChevronRight className="h-3 w-3" />
                        {article}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-[#F9FAFB] px-4 py-20 dark:bg-zinc-900">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl">
              Preguntas frecuentes
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Respuestas rápidas a las consultas más comunes de nuestros usuarios.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="rounded-xl border border-border/60 bg-white p-6 dark:bg-zinc-800"
              >
                <h3 className="text-lg font-semibold text-navy dark:text-zinc-100 mb-2">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
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
            <MessageSquare className="mx-auto h-12 w-12 text-emerald-brand mb-4" />
            <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl">
              ¿No encontraste lo que buscabas?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Nuestro equipo de soporte está disponible para ayudarte. Contáctanos por cualquiera de estos medios.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/soporte">
                  Soporte 24/7
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/ayuda/guia-agentes">Guía para agentes</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}