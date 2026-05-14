import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DarkModeProvider } from "@/hooks/use-dark-mode";
import { ToastProvider } from "@/components/ui/toast";
import { AuthToastHandler } from "@/components/auth-toast-handler";
import { SpeedInsights } from "@vercel/speed-insights/next";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "InmueblePro — Propiedades en República Dominicana",
    template: "%s · InmueblePro",
  },
  description:
    "Marketplace inmobiliario para LATAM. Encuentra y publica propiedades verificadas en RD con mapa, leads y herramientas para agentes.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "InmueblePro",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={jakarta.variable} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased transition-colors duration-200">
        <ToastProvider>
          <DarkModeProvider>
            <AuthToastHandler />
            <Header />
            <main className="min-h-[calc(100vh-5rem)]">{children}</main>
            <Footer />
          </DarkModeProvider>
        </ToastProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
