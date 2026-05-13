import Link from "next/link";
import { motion } from "framer-motion";
import { Scale, Shield, FileText, Lock, Building2, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

const laws = [
  {
    title: "Ley 172-13: Protección de Datos Personales",
    number: "001",
    description: "Ley fundamental que regula el tratamiento de los datos personales en República Dominicana. Garantiza la privacidad, libertad y dignidad de las personas.",
    keyPoints: [
      "Consentimiento explícito del titular",
      "Derechos ARCO (Acceder, Rectificar, Cancelar, Oponerse)",
      "Medidas de seguridad para el tratamiento",
      "Transferencia nacional e internacional de datos",
    ],
  },
  {
    title: "Ley 358-06: Turismo",
    number: "002",
    description: "Regula las actividades relacionadas con el sector turístico y el alojamiento turístico, relevante para propiedades de inversión turística.",
    keyPoints: [
      "Registro de propiedades turísticas",
      "Derechos de inversionistas extranjeros",
      "Zonas de desarrollo turístico",
      "Incentivos fiscales para inversionistas",
    ],
  },
  {
    title: "Ley 85-98: Trato Electrónico de Documentos",
    number: "003",
    description: "Reconoce validez jurídica a los documentos electrónicos, facilitando las transacciones digitales en la plataforma.",
    keyPoints: [
      "Validez jurídica de contratos digitales",
      "Firma electrónica",
      "Consentimiento electrónico",
      "Mecanismos de seguridad",
    ],
  },
  {
    title: "Código Civil Dominicano",
    number: "004",
    description: "Marco legal fundamental que regula la propiedad, los contratos y las obligaciones en materia inmobiliaria.",
    keyPoints: [
      "Derecho de propiedad",
      "Contratos de compraventa",
      "Arrendamientos",
      "Registro title property (DGTA)",
    ],
  },
];

const complianceFeatures = [
  { icon: Shield, title: "Registro mercantil", desc: "Empresa debidamente registrada ante el Ministerio de Industria y Comercio." },
  { icon: FileText, title: "RNC activo", desc: "Registro Nacional del Contribuyente vigente con obligaciones tributarias al día." },
  { icon: Lock, title: "Protección de datos", desc: "Cumplimiento total con la Ley 172-13 de protección de datos personales." },
  { icon: Building2, title: "Transparencia fiscal", desc: "Declaraciones tributarias presentadas y pago de impuestos conforme a la ley." },
];

export const metadata = {
  title: "Cumplimiento RD · InmueblePro",
  description:
    "Información sobre nuestro cumplimiento de las leyes y regulaciones de República Dominicana.",
};

export default function CumplimientoRDPage() {
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
                <Scale className="h-8 w-8 text-emerald-300" />
              </div>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Cumplimiento legal RD
            </h1>
            <p className="mt-6 text-lg text-white/80 sm:text-xl max-w-3xl mx-auto">
              Nuestro compromiso con el cumplimiento normativo y las leyes de la República Dominicana.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Compliance Badges */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {complianceFeatures.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-border/60 bg-white p-8 text-center dark:bg-zinc-900"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-brand/10">
                  <item.icon className="h-7 w-7 text-emerald-brand" />
                </div>
                <h3 className="text-lg font-semibold text-navy dark:text-zinc-100">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Laws */}
      <section className="bg-[#F9FAFB] px-4 py-20 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl">
              Marco legal
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Leyes y regulaciones aplicables que rigen nuestras operaciones en República Dominicana.
            </p>
          </div>
          <div className="space-y-6 max-w-5xl mx-auto">
            {laws.map((law, i) => (
              <motion.div
                key={law.number}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-border/60 bg-white p-8 dark:bg-zinc-800"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-white font-bold text-sm">
                    {law.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-navy dark:text-zinc-100 mb-2">{law.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{law.description}</p>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {law.keyPoints.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-brand" />
                          <span className="text-sm text-muted-foreground">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
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
            <AlertTriangle className="mx-auto h-12 w-12 text-emerald-brand mb-4" />
            <h2 className="text-3xl font-bold text-navy dark:text-zinc-100 sm:text-4xl">
              ¿Preguntas sobre nuestro cumplimiento legal?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Nuestro equipo legal está disponible para responder cualquier consulta sobre nuestro cumplimiento normativo.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link href="/contacto-comercial">Contactar legal</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/legal/privacy">Política de privacidad</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}