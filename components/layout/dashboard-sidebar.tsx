"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, List, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Resumen", icon: LayoutDashboard },
  { href: "/search", label: "Explorar mercado", icon: List },
  { href: "/pricing", label: "Planes & Boost", icon: Sparkles },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <>
      <nav className="mb-6 flex gap-2 overflow-x-auto pb-1 lg:hidden">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition",
                active
                  ? "border-navy bg-navy text-white"
                  : "border-border bg-white text-navy hover:bg-muted"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {label}
            </Link>
          );
        })}
      </nav>
      <aside className="hidden w-64 shrink-0 border-r border-border bg-white lg:block">
        <div className="sticky top-24 flex flex-col gap-1 p-4">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Panel agente
          </p>
          {items.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                  active
                    ? "bg-navy text-white shadow-soft"
                    : "text-navy/80 hover:bg-muted"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                {label}
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
}
