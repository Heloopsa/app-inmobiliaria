import Link from "next/link";
import { Building2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const columns = [
  {
    title: "Empresa",
    links: [
      { href: "/empresa", label: "Empresa" },
      { href: "/sobre-nosotros", label: "Sobre nosotros" },
      { href: "/carreras", label: "Carreras" },
      { href: "/prensa", label: "Prensa" },
      { href: "/contacto-comercial", label: "Contacto comercial" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/terms", label: "Términos de uso" },
      { href: "/legal/privacy", label: "Privacidad" },
      { href: "/legal/cookies", label: "Cookies" },
      { href: "/legal/rd-law", label: "Cumplimiento RD" },
    ],
  },
  {
    title: "Soporte",
    links: [
      { href: "/ayuda", label: "Centro de ayuda" },
      { href: "/ayuda/guia-agentes", label: "Guía para agentes" },
      { href: "/estado-servicio", label: "Estado del servicio" },
      { href: "/soporte", label: "Soporte 24/7" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-navy">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition hover:text-navy"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold text-navy">Newsletter</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Tendencias del mercado inmobiliario en RD y oportunidades para
              agentes profesionales.
            </p>
            <form className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Input
                type="email"
                required
                placeholder="tu@email.com"
                className="bg-[#F9FAFB]"
                aria-label="Correo para newsletter"
              />
              <Button type="submit" className="shrink-0">
                Suscribirme
              </Button>
            </form>
            <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
              <Mail className="h-3.5 w-3.5" aria-hidden />
              Sin spam. Cancela cuando quieras.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-center">
          <Link href="/" className="flex items-center gap-2 text-navy">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-white shadow-soft">
              <Building2 className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-sm font-semibold">
              Inmueble<span className="text-emerald-brand">Pro</span>
            </span>
          </Link>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} InmueblePro. Santo Domingo, República
            Dominicana. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
