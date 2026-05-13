"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { getSupabaseBrowserClient } from "@/lib/supabase-client";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<"login" | "signup" | "reset">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const isRealSupabase = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    return url && url !== "https://placeholder.supabase.co";
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (!isRealSupabase()) {
        // Modo demo: redirigir al dashboard
        await new Promise((r) => setTimeout(r, 800));
        setMessage({ text: "Modo demo: redirigiendo al panel...", type: "success" });
        setTimeout(() => router.push("/dashboard"), 1000);
        return;
      }

      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setMessage({ text: error.message, type: "error" });
      } else {
        setMessage({ text: "¡Inicio de sesión exitoso!", type: "success" });
        setTimeout(() => router.push("/dashboard"), 800);
      }
    } catch (err) {
      setMessage({ text: "Error de conexión. Intenta de nuevo.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (!isRealSupabase()) {
        await new Promise((r) => setTimeout(r, 800));
        setMessage({ text: "Modo demo: registro simulado. ¡Bienvenido!", type: "success" });
        setTimeout(() => setMode("login"), 1500);
        setLoading(false);
        return;
      }

      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name: "Nuevo Agente" },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setMessage({ text: error.message, type: "error" });
      } else {
        setMessage({
          text: "¡Cuenta creada! Revisa tu correo para confirmar.",
          type: "success",
        });
        setTimeout(() => setMode("login"), 2000);
      }
    } catch {
      setMessage({ text: "Error de conexión. Intenta de nuevo.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (!isRealSupabase()) {
        await new Promise((r) => setTimeout(r, 800));
        setMessage({ text: "Modo demo: revisa tu correo para restablecer.", type: "success" });
        setTimeout(() => setMode("login"), 2000);
        setLoading(false);
        return;
      }

      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback`,
      });

      if (error) {
        setMessage({ text: error.message, type: "error" });
      } else {
        setMessage({ text: "Correo de restablecimiento enviado.", type: "success" });
      }
    } catch {
      setMessage({ text: "Error de conexión. Intenta de nuevo.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[85vh] max-w-md flex-col justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo / Branding */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-bold tracking-tight text-navy">
              🏠 Inmueble<span className="text-emerald-brand">Pro</span>
            </h1>
          </Link>
          {!isRealSupabase() && (
            <Badge variant="secondary" className="mt-2 gap-1">
              <ShieldCheck className="h-3 w-3" />
              Modo demo
            </Badge>
          )}
        </div>

        <Card className="border-border/80 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl">
              {mode === "login" && "Bienvenido de vuelta"}
              {mode === "signup" && "Crear cuenta"}
              {mode === "reset" && "Restablecer contraseña"}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {mode === "login" && "Ingresa a tu cuenta de agente."}
              {mode === "signup" && "Regístrate para publicar propiedades."}
              {mode === "reset" && "Te enviaremos un enlace a tu correo."}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Mensaje de feedback */}
            {message && (
              <div
                className={`rounded-xl border px-4 py-3 text-sm ${
                  message.type === "success"
                    ? "border-emerald-brand/30 bg-emerald-brand/10 text-emerald-800"
                    : "border-red-300 bg-red-50 text-red-700"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Formulario principal */}
            <form className="space-y-4" onSubmit={mode === "reset" ? handleReset : mode === "signup" ? handleSignup : handleLogin}>
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="tu@email.com"
                />
              </div>

              {mode !== "reset" && (
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete={mode === "login" ? "current-password" : "new-password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-navy"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}

              {mode === "login" && (
                <button
                  type="button"
                  onClick={() => setMode("reset")}
                  className="text-xs font-medium text-emerald-brand hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : mode === "login" ? (
                  "Iniciar sesión"
                ) : mode === "signup" ? (
                  "Crear cuenta"
                ) : (
                  "Enviar enlace"
                )}
              </Button>
            </form>

            {/* Separador */}
            {mode !== "reset" && (
              <>
                <div className="flex items-center gap-3">
                  <Separator className="flex-1" />
                  <span className="text-xs text-muted-foreground">o</span>
                  <Separator className="flex-1" />
                </div>

                {/* Google OAuth demo */}
                <Button
                  variant="outline"
                  type="button"
                  className="w-full gap-2"
                  onClick={async () => {
                    setLoading(true);
                    try {
                      if (!isRealSupabase()) {
                        await new Promise((r) => setTimeout(r, 800));
                        setMessage({ text: "Modo demo: login con Google simulado.", type: "success" });
                        setTimeout(() => router.push("/dashboard"), 1000);
                      } else {
                        const supabase = getSupabaseBrowserClient();
                        await supabase.auth.signInWithOAuth({
                          provider: "google",
                          options: { redirectTo: `${window.location.origin}/auth/callback` },
                        });
                      }
                    } catch {
                      setMessage({ text: "Error con Google. Intenta de nuevo.", type: "error" });
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32l-.08.06 3.18 2.46.28.28A9.38 9.38 0 0 0 22.56 12.25z" />
                    <path fill="#34A853" d="M12 23c2.45 0 4.5-.8 6.02-2.18l-3.18-2.46a7.03 7.03 0 0 1-10.48-3.96l-.07-.32-.3 2.32A10.01 10.01 0 0 0 12 23z" />
                    <path fill="#FBBC05" d="M11.47 14.4a7.03 7.03 0 0 1-.36-4.56l.07-.32H3.12l-.3 2.32A10 10 0 0 0 12 23l2.92-2.46A7.03 7.03 0 0 1 11.47 14.4z" fillOpacity={0} />
                    <path fill="#EA4335" d="M12 4.5C14.3 4.5 16.2 5.56 17.38 7.12l3.2-2.46A9.97 9.97 0 0 0 12 2 10 10 0 0 0 2.12 7.12l3.18 2.32A9.97 9.97 0 0 1 12 4.5z" />
                  </svg>
                  Continuar con Google
                </Button>
              </>
            )}

            {/* Links de navegación */}
            <div className="text-center text-sm">
              {mode === "login" ? (
                <p className="text-muted-foreground">
                  ¿No tienes cuenta?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup");
                      setMessage(null);
                    }}
                    className="font-medium text-emerald-brand hover:underline"
                  >
                    Regístrate gratis
                  </button>
                </p>
              ) : (
                <p className="text-muted-foreground">
                  {mode === "reset" ? (
                    <>
                      ¿Recordaste tu contraseña?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setMode("login");
                          setMessage(null);
                        }}
                        className="font-medium text-emerald-brand hover:underline"
                      >
                        Volver al login
                      </button>
                    </>
                  ) : (
                    <>
                      ¿Ya tienes cuenta?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setMode("login");
                          setMessage(null);
                        }}
                        className="font-medium text-emerald-brand hover:underline"
                      >
                        Iniciar sesión
                      </button>
                    </>
                  )}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Al continuar, aceptas nuestros{" "}
          <Link href="/terms" className="underline hover:text-navy">
            términos
          </Link>{" "}
          y{" "}
          <Link href="/privacy" className="underline hover:text-navy">
            política de privacidad
          </Link>
          .
        </p>
      </motion.div>
    </div>
  );
}