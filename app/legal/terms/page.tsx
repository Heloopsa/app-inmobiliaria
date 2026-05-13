import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Scale, AlertTriangle, CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

const sections = [
  {
    id: "aceptacion",
    title: "1. Aceptación de los términos",
    content: "Al acceder y utilizar la plataforma de InmueblePro, usted acepta quedar vinculado por estos Términos de Uso y todas las políticas y reglas aquí establecidas. Nos reservamos el derecho de modificar estos términos en cualquier momento, y los cambios entrarán en vigor inmediatamente después de su publicación.",
  },
  {
    id: "servicio",
    title: "2. Descripción del servicio",
    content: "InmueblePro proporciona una plataforma de marketplace inmobiliario que conecta a compradores, arrendatarios, vendedores y agentes inmobiliarios. Nuestra plataforma permite la publicación, búsqueda y contacto relacionado con propiedades, pero no participa directamente en ninguna transacción inmobiliaria ni actúa como intermediario legal en acuerdos entre usuarios.",
  },
  {
    id: "cuentas",
    title: "3. Cuentas y registro",
    content: "Para acceder a ciertas funcionalidades, usted deberá crear una cuenta proporcionando información veraz, completa y actualizada. Usted es responsable de mantener la confidencialidad de sus credenciales y de todas las actividades que ocurran bajo su cuenta. Nos reservamos el derecho de suspender cuentas que violen estos términos.",
  },
  {
    id: "contenido",
    title: "4. Contenido del usuario",
    content: "Los usuarios son responsables del contenido que publiquen en la plataforma. Se prohíbe publicar información falsa, engañosa o inexacta sobre las propiedades. Nos reservamos el derecho de eliminar contenido que viole estos términos o que consideremos inapropiado, a nuestra entera discreción.",
  },
  {
    id: "propiedad-intelectual",
    title: "5. Propiedad intelectual",
    content: "Todo el contenido de la plataforma, incluyendo textos, gráficos, logotipos, íconos, imágenes y software, es propiedad de InmueblePro o sus licenciantes y está protegido por las leyes de propiedad intelectual. No se permite el uso de nuestro material sin autorización expresa por escrito.",
  },
  {
    id: "pagos",
    title: "6. Pagos y facturación",
    content: "Algunas funcionalidades de la plataforma requieren el pago de una suscripción. Todos los pagos son procesados de forma segura a través de proveedores de pago terceros. Los reembolsos se procesarán según nuestra política de reembolsos. Nos reservamos el derecho de cambiar los precios con previo aviso.",
  },
  {
    id: "limitacion",
    title: "7. Limitación de responsabilidad",
    content: "InmueblePro no garantiza que los resultados o información proporcionados a través de la plataforma sean completos, precisos o actualizados. No somos responsables de daños directos, indirectos, incidentales o consecuentes derivados del uso de nuestra plataforma.",
  },
  {
    id: "indemnizacion",
    title: "8. Indemnización",
    content: "Usted acepta indemnizar y mantener inofensivo a InmueblePro, sus directores, empleados y agentes, frente a cualquier reclamo, daño, pérdida o gasto, incluyendo honorarios razonables de abogados, derivados de su uso de la plataforma o violación de estos términos.",
  },
  {
    id: "terminacion",
    title: "9. Terminación",
    content: "Nos reservamos el derecho de suspender o terminar su acceso a la plataforma en cualquier momento y por cualquier motivo, con o sin previo aviso. Al terminar, todas las disposiciones de estos términos que por su naturaleza deban sobrevivir continuarán vigentes.",
  },
  {
    id: "ley-aplicable",
    title: "10. Ley aplicable y jurisdicción",
    content: "Estos términos se rigen por las leyes de la República Dominicana. Cualquier disputa derivada de estos términos será resuelta en los tribunales competentes de Santo Domingo, Distrito Nacional.",
  },
];

export const metadata = {
  title: "Términos de uso · InmueblePro",
  description:
    "Lee nuestros términos y condiciones de uso de la plataforma InmueblePro.",
};

export default function TerminosPage() {
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
                <Scale className="h-8 w-8 text-emerald-300" />
              </div>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Términos de uso
            </h1>
            <p className="mt-6 text-lg text-white/80 sm:text-xl max-w-3xl mx-auto">
              Última actualización: 1 de enero de 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Alert */}
      <section className="px-4 py-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/50 dark:bg-amber-950/30">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                Por favor, lee estos términos cuidadosamente antes de usar InmueblePro.
              </p>
              <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">
                Tu acceso y uso de la plataforma implica tu aceptación de estos términos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-8">
            {sections.map((section, i) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="rounded-2xl border border-border/60 p-8 dark:bg-zinc-900"
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
          <div className="mt-12 rounded-2xl bg-[#F9FAFB] p-8 text-center dark:bg-zinc-900">
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-brand mb-4" />
            <h3 className="text-xl font-semibold text-navy dark:text-zinc-100">
              ¿Tienes preguntas sobre estos términos?
            </h3>
            <p className="mt-2 text-muted-foreground max-w-lg mx-auto">
              Nuestro equipo legal está disponible para aclarar cualquier duda que puedas tener.
            </p>
            <div className="mt-6">
              <Button asChild>
                <Link href="/contacto-comercial">Contactar legal</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}