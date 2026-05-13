import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Eye, Lock, Database, AlertTriangle, CheckCircle2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

const sections = [
  {
    id: "informacion-recopilamos",
    title: "1. Información que recopilamos",
    content: "Recopilamos información que nos proporcionas directamente (nombre, correo, teléfono), información de uso (navegación, búsqueda, interacciones), información técnica (tipo de dispositivo, navegador, IP) y datos de ubicación geográfica para mejorar la experiencia.",
  },
  {
    id: "como-usamos",
    title: "2. Cómo usamos tu información",
    content: "Utilizamos tu información para proporcionar y mejorar nuestros servicios, procesar transacciones, enviar comunicaciones relacionadas con tu cuenta, personalizar tu experiencia, analizar el uso de la plataforma y cumplir con obligaciones legales.",
  },
  {
    id: "compartir-info",
    title: "3. Compartir información",
    content: "No vendemos tu información personal. Podemos compartir información con proveedores de servicios que nos ayudan a operar, cuando lo requiera la ley, para proteger nuestros derechos, o con tu consentimiento explícito.",
  },
  {
    id: "seguridad",
    title: "4. Seguridad de datos",
    content: "Implementamos medidas de seguridad técnicas y organizativas para proteger tu información contra acceso no autorizado, alteración, divulgación o destrucción, incluyendo encriptación SSL, almacenamiento seguro y controles de acceso estrictos.",
  },
  {
    id: "cookies-privacy",
    title: "5. Cookies y tecnologías similares",
    content: "Usamos cookies para mejorar tu experiencia, analizar el uso del sitio y personalizar contenido. Puedes controlar las cookies a través de la configuración de tu navegador. Consulta nuestra Política de Cookies para más detalles.",
  },
  {
    id: "tus-derechos",
    title: "6. Tus derechos (ARCO)",
    content: "Tienes derecho a Acceder, Rectificar, Cancelar y Oponerte al tratamiento de tus datos personales. Para ejercer estos derechos, contáctanos en privacidad@inmueblepro.com. Respondemos a todas las solicitudes en un plazo de 30 días hábiles.",
  },
  {
    id: "menores",
    title: "7. Menores de edad",
    content: "Nuestros servicios no están dirigidos a menores de 18 años. No recopilizamos intencionalmente información de menores. Si tenemos conocimiento de que hemos recopilizado información de un menor, procedemos a eliminarla.",
  },
  {
    id: "cambios",
    title: "8. Cambios en esta política",
    content: "Podemos actualizar esta política periódicamente. Te notificaremos sobre cambios materialmente importantes mediante un aviso destacado en nuestra plataforma o por correo electrónico.",
  },
];

export const metadata = {
  title: "Privacidad · InmueblePro",
  description:
    "Conoce cómo protegemos y utilizamos tu información personal en InmueblePro.",
};

const rights = [
  { icon: Eye, title: "Acceder", desc: "Saber qué datos tenemos sobre ti" },
  { icon: Shield, title: "Rectificar", desc: "Corregir datos inexactos o incompletos" },
  { icon: Lock, title: "Cancelar", desc: "Solicitar la eliminación de tus datos" },
  { icon: Database, title: "Oponerse", desc: "Limitar el procesamiento de tus datos" },
];

export default function PrivacidadPage() {
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
                <Shield className="h-8 w-8 text-emerald-300" />
              </div>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Política de privacidad
            </h1>
            <p className="mt-6 text-lg text-white/80 sm:text-xl max-w-3xl mx-auto">
              Tu privacidad es importante para nosotros. Esta política explica cómo recopilamos, usamos y protegemos tu información personal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ARCO Rights */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl">
              Tus derechos ARCO
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Según la legislación de protección de datos de República Dominicana, tienes los siguientes derechos sobre tu información personal.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {rights.map((right, i) => (
              <motion.div
                key={right.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-border/60 bg-white p-8 text-center dark:bg-zinc-900"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-brand/10">
                  <right.icon className="h-7 w-7 text-emerald-brand" />
                </div>
                <h3 className="text-lg font-semibold text-navy dark:text-zinc-100">{right.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{right.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#F9FAFB] px-4 py-20 dark:bg-zinc-900">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-6">
            {sections.map((section, i) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="rounded-2xl border border-border/60 bg-white p-8 dark:bg-zinc-800"
              >
                <h2 className="text-xl font-semibold text-navy dark:text-zinc-100 mb-4">
                  {section.title}
                </h2>
                <p className="leading-relaxed text-muted-foreground">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 rounded-2xl bg-white p-8 text-center dark:bg-zinc-800">
            <Mail className="mx-auto h-12 w-12 text-emerald-brand mb-4" />
            <h3 className="text-xl font-semibold text-navy dark:text-zinc-100">
              ¿Preguntas sobre tu privacidad?
            </h3>
            <p className="mt-2 text-muted-foreground max-w-lg mx-auto">
              Nuestro equipo de protección de datos está disponible para resolver cualquier consulta.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a href="mailto:privacidad@inmueblepro.com" className="flex items-center gap-2 text-emerald-brand hover:underline">
                <Mail className="h-4 w-4" />
                privacidad@inmueblepro.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}