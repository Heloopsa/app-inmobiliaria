import Link from "next/link";
import { motion } from "framer-motion";
import { BadgeCheck, Users, Star, TrendingUp, Shield, MessageSquare, Camera, FileText, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

const steps = [
  {
    step: "01",
    icon: BadgeCheck,
    title: "Regístrate en InmueblePro",
    description: "Crea tu cuenta personal con tu correo electrónico y datos básicos de identificación.",
  },
  {
    step: "02",
    icon: FileText,
    title: "Completa tu perfil profesional",
    description: "Agregúa tu experiencia, especialización, zona de cobertura y enlaces a redes profesionales.",
  },
  {
    step: "03",
    icon: Shield,
    title: "Envía tu documentación",
    description: "Proporciona tu cédula, licencia profesional y referencias para el proceso de verificación.",
  },
  {
    step: "04",
    icon: Users,
    title: "Espera la revisión",
    description: "Nuestro equipo revisará tu solicitud en un plazo de 2-3 días hábiles.",
  },
  {
    step: "05",
    icon: Star,
    title: "Recibe tu insignia verificada",
    description: "Una vez aprobado, recibirás el sello de agente verificado y acceso a todas las herramientas.",
  },
  {
    step: "06",
    icon: TrendingUp,
    title: "¡Empieza a publicar!",
    description: "Publica propiedades ilimitadas, accede a analíticas avanzadas y conecta con clientes potenciales.",
  },
];

const features = [
  {
    icon: Camera,
    title: "Galería profesional",
    description: "Crea perfiles con fotos de alta calidad, tours virtuales y documentos de propiedades.",
  },
  {
    icon: MessageSquare,
    title: "Mensajería integrada",
    description: "Comunícate directamente con interesados sin compartir tu número personal.",
  },
  {
    icon: TrendingUp,
    title: "Analíticas avanzadas",
    description: "Conoce cuántas personas ven tus listados, hacen clic y se interesan en tus propiedades.",
  },
  {
    icon: Star,
    title: "Sistema de reputación",
    description: "Construye tu reputación con calificaciones y reseñas de otros usuarios.",
  },
];

const plans = [
  {
    name: "Básico",
    price: "Gratis",
    description: "Para agentes que están comenzando",
    features: [
      "Hasta 5 propiedades activas",
      "Perfil público básico",
      "Mensajería integrada",
      "Soporte por email",
    ],
  },
  {
    name: "Profesional",
    price: "$299",
    period: "RD / mes",
    description: "Para agentes activos",
    features: [
      "Propiedades ilimitadas",
      "Insignia de verificado",
      "Analíticas avanzadas",
      "Destacar propiedades",
      "Soporte prioritario",
      "Perfil personalizado",
    ],
    popular: true,
  },
  {
    name: "Agencia",
    price: "$799",
    period: "RD / mes",
    description: "Para inmobiliarias y equipos",
    features: [
      "Todo lo de Profesional",
      "Hasta 10 agentes",
      "Panel de administración",
      "Reportes de equipo",
      "API access",
      "Gerente de cuenta dedicado",
    ],
  },
];

export const metadata = {
  title: "Guía para agentes · InmueblePro",
  description:
    "Aprende cómo registrarte como agente verificado y aprovechar todas las herramientas de InmueblePro.",
};

export default function GuiaAgentesPage() {
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
                <BadgeCheck className="h-8 w-8 text-emerald-300" />
              </div>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Guía para agentes
            </h1>
            <p className="mt-6 text-lg text-white/80 sm:text-xl max-w-3xl mx-auto">
              Todo lo que necesitas saber para registrarte como agente verificado y potenciar tu negocio inmobiliario.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl">
              ¿Cómo registrarse?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Sigue estos sencillos pasos para convertirte en un agente verificado en InmueblePro.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative rounded-2xl border border-border/60 bg-white p-8 dark:bg-zinc-900"
              >
                <div className="absolute -top-4 left-6 rounded-full bg-navy px-3 py-1 text-sm font-bold text-white">
                  {step.step}
                </div>
                <div className="mb-4 mt-2 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-brand/10">
                  <step.icon className="h-7 w-7 text-emerald-brand" />
                </div>
                <h3 className="text-lg font-semibold text-navy dark:text-zinc-100 mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#F9FAFB] px-4 py-20 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl">
              Herramientas para agentes
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Accede a herramientas profesionales que te ayudarán a vender más y mejor.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-border/60 bg-white p-8 dark:bg-zinc-800"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-brand/10">
                  <feature.icon className="h-7 w-7 text-emerald-brand" />
                </div>
                <h3 className="text-lg font-semibold text-navy dark:text-zinc-100 mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl">
              Planes y precios
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Elige el plan que mejor se adapte a tu volumen de negocio.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`rounded-2xl border p-8 ${
                  plan.popular
                    ? "border-emerald-brand bg-emerald-brand/5 dark:border-emerald-brand"
                    : "border-border/60 bg-white dark:bg-zinc-900"
                }`}
              >
                {plan.popular && (
                  <span className="mb-4 inline-block rounded-full bg-emerald-brand px-3 py-1 text-xs font-medium text-white">
                    Más popular
                  </span>
                )}
                <h3 className="text-xl font-semibold text-navy dark:text-zinc-100">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-navy dark:text-zinc-100">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-brand" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`mt-8 w-full ${
                    plan.popular ? "bg-emerald-brand hover:bg-emerald-brand/90" : ""
                  }`}
                  asChild
                >
                  <Link href="/pricing">Comenzar</Link>
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
              ¿Listo para unirte como agente verificado?
            </h2>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Comienza hoy mismo y accede a miles de compradores potenciales en toda República Dominicana.
            </p>
            <div className="mt-10">
              <Button size="lg" variant="accent" asChild>
                <Link href="/cuenta">
                  Registrarme ahora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}