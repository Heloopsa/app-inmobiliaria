"use client";

import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Zap, Eye, Users, Home, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_PROPERTIES, type PropertyStatus } from "@/lib/mock-data";
import { formatCompactNumber } from "@/lib/formatters";

const chartData = [
  { name: "Lun", vistas: 1200, leads: 12 },
  { name: "Mar", vistas: 1800, leads: 18 },
  { name: "Mié", vistas: 2100, leads: 22 },
  { name: "Jue", vistas: 1900, leads: 17 },
  { name: "Vie", vistas: 2400, leads: 26 },
  { name: "Sáb", vistas: 2800, leads: 30 },
  { name: "Dom", vistas: 2600, leads: 28 },
];

const statusRotation: PropertyStatus[] = ["activa", "pausada", "destacada"];

export function AgentDashboardView() {
  const rows = useMemo(
    () =>
      MOCK_PROPERTIES.map((p, i) => ({
        id: p.id,
        title: p.title,
        zone: p.zone,
        status: statusRotation[i % statusRotation.length],
        views: 2200 + i * 420,
        leads: 4 + (i % 5),
        expiresLabel: i === 1 ? "En 6 días" : "Al día",
      })),
    []
  );

  const kpis = [
    {
      label: "Vistas (7d)",
      value: formatCompactNumber(18420),
      hint: "+12% vs semana anterior",
      icon: Eye,
    },
    {
      label: "Leads nuevos",
      value: "142",
      hint: "SLA medio 1h 48m",
      icon: Users,
    },
    {
      label: "Listings activos",
      value: String(rows.filter((r) => r.status === "activa").length),
      hint: "Sincronizado con Supabase",
      icon: Home,
    },
    {
      label: "Expira pronto",
      value: "1",
      hint: "Renueva desde Precios",
      icon: Clock,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
          Hola, equipo InmueblePro
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          KPIs de ejemplo · conecta esta vista a tablas con RLS en Supabase.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label} className="border-border/80 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {k.label}
              </CardTitle>
              <k.icon className="h-4 w-4 text-emerald-brand" aria-hidden />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-navy">{k.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{k.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/80 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Tráfico y leads</CardTitle>
          <p className="text-sm text-muted-foreground">
            Serie semanal · componente Recharts listo para datos reales.
          </p>
        </CardHeader>
        <CardContent className="h-72 pl-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ left: 8, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="colorVistas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F172A" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#0F172A" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  borderColor: "#E2E8F0",
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="vistas"
                stroke="#0F172A"
                fillOpacity={1}
                fill="url(#colorVistas)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="leads"
                stroke="#10B981"
                fillOpacity={1}
                fill="url(#colorLeads)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-border/80 shadow-sm" id="listings-table">
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-lg">Mis propiedades</CardTitle>
            <p className="text-sm text-muted-foreground">
              Estados operativos y acciones rápidas.
            </p>
          </div>
          <Button size="sm" className="gap-2 self-start sm:self-auto">
            <Zap className="h-4 w-4" aria-hidden />
            Nuevo listing
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0 sm:p-6">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase text-muted-foreground">
                <th className="px-4 py-3 font-medium sm:px-0">Propiedad</th>
                <th className="px-4 py-3 font-medium">Zona</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Vistas</th>
                <th className="px-4 py-3 font-medium">Leads</th>
                <th className="px-4 py-3 font-medium">Renovación</th>
                <th className="px-4 py-3 font-medium text-right sm:pr-0">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-border/80 last:border-0 hover:bg-muted/40"
                >
                  <td className="max-w-[220px] px-4 py-3 font-medium text-navy sm:px-0">
                    {row.title}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{row.zone}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        row.status === "activa"
                          ? "success"
                          : row.status === "destacada"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {row.status === "activa"
                        ? "Activa"
                        : row.status === "destacada"
                          ? "Destacada"
                          : "Pausada"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 tabular-nums text-muted-foreground">
                    {formatCompactNumber(row.views)}
                  </td>
                  <td className="px-4 py-3 tabular-nums text-muted-foreground">
                    {row.leads}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {row.expiresLabel}
                  </td>
                  <td className="px-4 py-3 text-right sm:pr-0">
                    <Button size="sm" variant="outline" className="gap-1">
                      <Zap className="h-3.5 w-3.5" aria-hidden />
                      Boost
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
