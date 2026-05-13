"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";
import {
  CreditCard,
  Heart,
  LayoutDashboard,
  PlusCircle,
  Settings,
  UserRound,
  LogOut,
  Bell,
  Globe,
  Shield,
  Trash2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ProfileForm } from "@/components/shared/profile-form";
import { FavoritesClient } from "@/components/shared/favorites-client";

type TabType = "overview" | "perfil" | "favoritos" | "ajustes";

export default function CuentaPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const tabs = [
    { id: "overview" as TabType, label: "Resumen", icon: LayoutDashboard },
    { id: "perfil" as TabType, label: "Perfil", icon: UserRound },
    { id: "favoritos" as TabType, label: "Favoritos", icon: Heart },
    { id: "ajustes" as TabType, label: "Ajustes", icon: Settings },
  ];

  const handleLogout = () => {
    // Limpiar sesión de Supabase si está activa
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (url && url !== "https://placeholder.supabase.co") {
      // Supabase real: llamar signOut
      import("@/lib/supabase-client").then(({ getSupabaseBrowserClient }) => {
        getSupabaseBrowserClient().auth.signOut();
      });
    }
    // Redirigir al home (en demo, solo recargar)
    window.location.href = "/";
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-navy">Mi cuenta</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Gestiona tu perfil, favoritos y preferencias.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/publicar">
              <PlusCircle className="mr-2 h-4 w-4" aria-hidden />
              Nueva publicación
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" aria-hidden />
              Dashboard
            </Link>
          </Button>
        </div>
      </div>

      {/* Tabs de navegación */}
      <div className="my-8 overflow-x-auto">
        <nav className="flex gap-1 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "border-emerald-brand text-emerald-brand"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-navy"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {tab.id === "favoritos" && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  4
                </Badge>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Contenido de cada tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Tarjetas de acceso rápido */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Perfil y verificación",
                desc: "Datos del agente, insignia verificada y documentos.",
                icon: UserRound,
                href: () => setActiveTab("perfil"),
                color: "text-blue-500",
              },
              {
                title: "Favoritos",
                desc: "Listings guardados para compartir con clientes.",
                icon: Heart,
                href: () => setActiveTab("favoritos"),
                color: "text-pink-500",
              },
              {
                title: "Facturación",
                desc: "Planes Promo, Destacada y Boost; historial de pagos.",
                icon: CreditCard,
                href: () => window.location.assign("/pricing"),
                color: "text-amber-500",
              },
              {
                title: "Ajustes",
                desc: "Notificaciones, idioma y sesiones activas.",
                icon: Settings,
                href: () => setActiveTab("ajustes"),
                color: "text-gray-500",
              },
            ].map((card) => (
              <button
                key={card.title}
                onClick={card.href}
                className="group text-left rounded-xl border border-border/80 bg-white p-5 shadow-sm transition hover:border-navy/20 hover:shadow-md"
              >
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F9FAFB] group-hover:bg-emerald-brand/10`}>
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </div>
                <CardTitle className="text-base">{card.title}</CardTitle>
                <CardDescription className="mt-1 block">{card.desc}</CardDescription>
              </button>
            ))}
          </div>

          {/* Resumen rápido */}
          <Card className="border-border/80 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Resumen rápido</CardTitle>
              <CardDescription>Actividad reciente en tu cuenta.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-white p-4 text-center shadow-sm">
                  <LayoutDashboard className="mx-auto h-6 w-6 text-emerald-brand" />
                  <p className="mt-2 text-2xl font-semibold text-navy">18</p>
                  <p className="text-xs text-muted-foreground">Propiedades publicadas</p>
                </div>
                <div className="rounded-xl border border-border bg-white p-4 text-center shadow-sm">
                  <Heart className="mx-auto h-6 w-6 text-pink-500" />
                  <p className="mt-2 text-2xl font-semibold text-navy">4</p>
                  <p className="text-xs text-muted-foreground">Favoritos guardados</p>
                </div>
                <div className="rounded-xl border border-border bg-white p-4 text-center shadow-sm">
                  <UserRound className="mx-auto h-6 w-6 text-blue-500" />
                  <p className="mt-2 text-2xl font-semibold text-navy">
                    <Badge variant="success" className="text-xs">
                      Verificado
                    </Badge>
                  </p>
                  <p className="text-xs text-muted-foreground">Estado de cuenta</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "perfil" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-navy">Perfil del agente</h2>
            <p className="text-sm text-muted-foreground">
              Actualiza tu información personal y profesional. Los cambios se reflejan en tu
              perfil público.
            </p>
          </div>
          <Separator />
          <ProfileForm
            initialData={{
              name: "María García",
              company: "InmueblePro Agency",
              license: "RD-RE-2024-12345",
              bio: "Especialista en propiedades de lujo con más de 8 años de experiencia en el mercado inmobiliario dominicano. Experta en Punta Cana, Piantini y Naco.",
              phone: "+1 809-555-1234",
              email: "maria@inmueblepro.com",
              website: "https://maria.inmueblepro.com",
              linkedin: "https://linkedin.com/in/mariagarcia",
              instagram: "@mariainmuebles",
              city: "Santo Domingo",
              verified: true,
            }}
          />
        </div>
      )}

      {activeTab === "favoritos" && <FavoritesClient />}

      {activeTab === "ajustes" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-navy">Ajustes de cuenta</h2>
            <p className="text-sm text-muted-foreground">
              Configura notificaciones, idioma y gestiona tu sesión.
            </p>
          </div>
          <Separator />

          {/* Notificaciones */}
          <Card className="border-border/80 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5 text-emerald-brand" />
                Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Nuevos mensajes de leads", defaultChecked: true },
                { label: "Actualizaciones de propiedades favoritas", defaultChecked: true },
                { label: "Reporte semanal de métricas", defaultChecked: false },
                { label: "Ofertas y promociones", defaultChecked: false },
              ].map((item) => (
                <label
                  key={item.label}
                  className="flex items-center gap-3 rounded-lg bg-[#F9FAFB] p-3"
                >
                  <input
                    type="checkbox"
                    defaultChecked={item.defaultChecked}
                    className="h-4 w-4 rounded border-border text-emerald-brand focus:ring-emerald-brand"
                  />
                  <span className="text-sm text-navy">{item.label}</span>
                </label>
              ))}
            </CardContent>
          </Card>

          {/* Idioma */}
          <Card className="border-border/80 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="h-5 w-5 text-emerald-brand" />
                Idioma y región
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="language" className="text-sm font-medium text-navy">
                  Idioma
                </label>
                <select
                  id="language"
                  defaultValue="es"
                  className="flex h-10 w-full max-w-md rounded-xl border border-input bg-white px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/20"
                >
                  <option value="es">🇩🇴 Español</option>
                  <option value="en">🇺🇸 English</option>
                  <option value="fr">🇫🇷 Français</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="currency" className="text-sm font-medium text-navy">
                  Moneda por defecto
                </label>
                <select
                  id="currency"
                  defaultValue="DOP"
                  className="flex h-10 w-full max-w-md rounded-xl border border-input bg-white px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/20"
                >
                  <option value="DOP">🇩🇴 DOP (Peso dominicano)</option>
                  <option value="USD">🇺🇸 USD (Dólar)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Sesiones activas */}
          <Card className="border-border/80 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-brand" />
                Sesiones activas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-border bg-white p-3">
                <div>
                  <p className="text-sm font-medium text-navy">
                    Chrome · Santo Domingo, RD
                  </p>
                  <p className="text-xs text-muted-foreground">Sesión actual · Ahora</p>
                </div>
                <Badge variant="success" className="text-xs">
                  Activa
                </Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-white p-3">
                <div>
                  <p className="text-sm font-medium text-navy">
                    Safari · iPhone 15
                  </p>
                  <p className="text-xs text-muted-foreground">Hace 2 días</p>
                </div>
                <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Zona de peligro */}
          <Card className="border-red-200 bg-red-50/50">
            <CardHeader>
              <CardTitle className="text-lg text-red-700">Zona de peligro</CardTitle>
              <CardDescription className="text-red-600/80">
                Acciones irreversibles. Piensa dos veces antes de actuar.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {!showLogoutConfirm ? (
                <Button
                  variant="outline"
                  className="gap-2 border-red-300 text-red-600 hover:bg-red-100"
                  onClick={() => setShowLogoutConfirm(true)}
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar sesión
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-red-700">¿Estás seguro?</span>
                  <Button
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                    onClick={handleLogout}
                  >
                    Sí, cerrar sesión
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowLogoutConfirm(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              )}

              <Separator className="my-3 bg-red-200" />

              <p className="text-xs text-red-600/80">
                Para eliminar tu cuenta permanentemente, envía un correo a{" "}
                <Link href="mailto:support@inmueblepro.com" className="underline">
                  support@inmueblepro.com
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}