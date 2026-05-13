"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Menu, X, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDarkMode } from "@/hooks/use-dark-mode";

const nav = [
  { href: "/search", label: "Explorar" },
  { href: "/pricing", label: "Precios" },
  { href: "/cuenta", label: "Mi cuenta" },
];

/** Icono de dark mode (sol/luna) */
function DarkModeIcon({ dark }: { dark: boolean }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {dark ? (
        <motion.div
          key="moon"
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <Moon className="h-4 w-4" />
        </motion.div>
      ) : (
        <motion.div
          key="sun"
          initial={{ rotate: 90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -90, opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <Sun className="h-4 w-4" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Toggle de dark mode para header (pequeño) */
function DarkModeToggle() {
  const { isDark, toggle } = useDarkMode();

  return (
    <button
      type="button"
      onClick={toggle}
      className="relative flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-muted"
      aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
    >
      <DarkModeIcon dark={isDark} />
    </button>
  );
}

/** Toggle de dark mode para menú mobile (grande con texto) */
function DarkModeToggleMobile() {
  const { isDark, toggle } = useDarkMode();

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-navy dark:text-zinc-300 hover:bg-muted"
    >
      <DarkModeIcon dark={isDark} />
      {isDark ? "Modo claro" : "Modo oscuro"}
    </button>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b",
        "border-border/60 bg-white/80 dark:border-zinc-800 dark:bg-zinc-950/80",
        "backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/60"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 shrink items-center gap-2 text-navy dark:text-zinc-100">
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy text-white shadow-soft">
              <Building2 className="h-5 w-5" aria-hidden />
            </span>
            <span className="truncate text-lg font-semibold tracking-tight dark:text-zinc-100">
              Inmueble<span className="text-emerald-brand">Pro</span>
            </span>
          </motion.span>
        </Link>

        <nav className="hidden min-w-0 items-center gap-5 md:flex lg:gap-8">
          {/* Dark mode toggle en desktop */}
          <DarkModeToggle />
          
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 text-sm font-medium text-navy/80 transition hover:text-navy dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 sm:gap-3 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Entrar</Link>
          </Button>
          <Button size="sm" className="shadow-soft whitespace-nowrap px-3 sm:px-4" asChild>
            <Link href="/publicar">Publicar</Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center rounded-xl p-2 text-navy dark:text-zinc-300 md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-border bg-white/95 px-4 py-4 md:hidden dark:bg-zinc-950/95 dark:border-zinc-800"
        >
          <div className="flex flex-col gap-3">
            {/* Dark mode toggle en mobile */}
            <DarkModeToggleMobile />

            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-2 py-2 text-sm font-medium text-navy dark:text-zinc-300"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button variant="outline" asChild>
              <Link href="/login" onClick={() => setOpen(false)}>
                Entrar
              </Link>
            </Button>
            <Button asChild>
              <Link href="/publicar" onClick={() => setOpen(false)}>
                Publicar
              </Link>
            </Button>
          </div>
        </motion.div>
      ) : null}
    </header>
  );
}