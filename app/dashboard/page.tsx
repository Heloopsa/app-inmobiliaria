import type { Metadata } from "next";
import { AgentDashboardView } from "@/components/dashboard/agent-dashboard-view";

export const metadata: Metadata = {
  title: "Panel de agente",
  description: "Gestiona listings, leads y boosts desde tu dashboard InmueblePro.",
};

export default function DashboardPage() {
  return <AgentDashboardView />;
}
