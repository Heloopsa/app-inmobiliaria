import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle, Clock, Server, Database, Wifi, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

const services = [
  { name: "API Principal", status: "Operativo", uptime: "99.99%", icon: Server },
  { name: "Base de datos", status: "Operativo", uptime: "99.97%", icon: Database },
  { name: "Autenticación", status: "Operativo", uptime: "99.95%", icon: CheckCircle2 },
  { name: "Almacenamiento", status: "Operativo", uptime: "100%", icon: Server },
  { name: "CDN / Assets", status: "Operativo", uptime: "99.99%", icon: Wifi },
  { name: "Email", status: "Degradado", uptime: "98.5%", icon: Globe },
];

const incidents = [
  {
    date: "28 Diciembre, 2024",
    title: "Lentitud en la API principal",
    description: "Experimentamos un aumento en los tiempos de respuesta debido a un pico de tráfico inesperado. El problema fue resuelto en 45 minutos.",
    status: "Resuelto",
  },
  {
    date: "15 Noviembre, 2024",
    title: "Mantenimiento programado",
    description: "Realizamos una actualización de infraestructura para mejorar el rendimiento general de la plataforma. Tiempo de inactividad estimado: 2 horas.",
    status: "Completado",
  },
  {
    date: "3 Octubre, 2024",
    title: "Intermitencia en servicio de email",
    description: "El proveedor de servicios de email experimentó problemas globales. Se implementaron rutas alternativas para garantizar la entrega.",
    status: "Resuelto",
  },
];

const statusColors = {
  Operativo: "text-emerald-600 dark:text-emerald-400",
  Degradado: "text-amber-600 dark:text-amber-400",
  "Fuera de servicio": "text-red-600 dark:text-red-400",
};

const statusBg = {
  Operativo: "bg-emerald-brand/10",
  Degradado: "bg-amber-500/10",
  "Fuera de servicio": "bg-red-500/10",
};

export const metadata = {
  title: "Estado del servicio · InmueblePro",
  description:
    "Monitorea el estado actual de todos los servicios de InmueblePro en tiempo real.",
};

export default function EstadoServicioPage() {
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
                <CheckCircle2 className="h-8 w-8 text-emerald-300" />
              </div>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Estado del servicio
            </h1>
            <p className="mt-6 text-lg text-white/80 sm:text-xl max-w-3xl mx-auto">
              Monitorea en tiempo real el estado de todos nuestros servicios e infraestructura.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overall Status */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-2xl border border-emerald-brand/30 bg-emerald-brand/5 p-8 text-center"
          >
            <div className="inline-flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-6 w-6 text-emerald-brand" />
              <span className="text-lg font-semibold text-emerald-brand">Todos los servicios operativos</span>
            </div>
            <p className="text-muted-foreground">
              Última actualización: hace 5 minutos
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-navy dark:text-zinc-100 mb-8 text-center">
            Estado de servicios individuales
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {services.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className={`rounded-xl border p-6 ${statusBg[service.status as keyof typeof statusBg] || "bg-white"} border-border/60 dark:bg-zinc-900`}
              >
                <div className="flex items-center justify-between mb-4">
                  <service.icon className={`h-6 w-6 ${statusColors[service.status as keyof typeof statusColors] || "text-emerald-brand"}`} />
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusBg[service.status as keyof typeof statusBg]} ${statusColors[service.status as keyof typeof statusColors]}`}>
                    {service.status}
                  </span>
                </div>
                <h3 className="font-semibold text-navy dark:text-zinc-100">{service.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">Uptime: {service.uptime}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Incident History */}
      <section className="bg-[#F9FAFB] px-4 py-20 dark:bg-zinc-900">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl">
              Historial de incidentes
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Transparencia total sobre los incidentes que han afectado nuestros servicios.
            </p>
          </div>
          <div className="space-y-6 max-w-4xl mx-auto">
            {incidents.map((incident, i) => (
              <motion.div
                key={incident.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-xl border border-border/60 bg-white p-8 dark:bg-zinc-800"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <time className="text-sm text-muted-foreground">{incident.date}</time>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusBg[incident.status as keyof typeof statusBg]} ${statusColors[incident.status as keyof typeof statusColors]}`}>
                    {incident.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-navy dark:text-zinc-100">{incident.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{incident.description}</p>
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
            <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl">
              ¿El servicio afecta tu negocio?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Si experimentas problemas técnicos, nuestro equipo de soporte está disponible 24/7 para ayudarte.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/soporte">
                  Contactar soporte
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