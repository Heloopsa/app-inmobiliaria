"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  UserRound,
  Building2,
  Phone,
  Mail,
  MapPin,
  Globe,
  Linkedin,
  Instagram as InstaIcon,
  Camera,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ProfileFormProps {
  initialData?: {
    name?: string;
    company?: string;
    license?: string;
    bio?: string;
    phone?: string;
    email?: string;
    website?: string;
    linkedin?: string;
    instagram?: string;
    city?: string;
    verified?: boolean;
    photoUrl?: string;
  };
}

async function getSupabaseToken(): Promise<string | null> {
  try {
    const { getSupabaseBrowserClient } = await import("@/lib/supabase-client");
    const client = getSupabaseBrowserClient();
    
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (url === "https://placeholder.supabase.co") {
      console.warn("[ProfileForm] Supabase no configurado (modo demo)");
      return null;
    }
    
    const { data, error } = await client.auth.getSession();
    
    if (error) {
      console.error("[ProfileForm] Error obteniendo sesión:", error.message);
      return null;
    }
    
    if (data.session?.access_token) {
      console.log("[ProfileForm] Token obtenido, usuario:", data.session.user?.email);
      return data.session.access_token;
    }
    
    console.warn("[ProfileForm] No hay sesión activa");
    return null;
  } catch (err) {
    console.error("[ProfileForm] Error obteniendo token:", err);
    return null;
  }
}

export function ProfileForm({ initialData = {} }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [photoPreview, setPhotoPreview] = useState(initialData.photoUrl);
  const [refreshKey, setRefreshKey] = useState(0);

  // Estados del formulario
  const [name, setName] = useState(initialData.name || "");
  const [company, setCompany] = useState(initialData.company || "");
  const [license, setLicense] = useState(initialData.license || "");
  const [bio, setBio] = useState(initialData.bio || "");
  const [phone, setPhone] = useState(initialData.phone || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [website, setWebsite] = useState(initialData.website || "");
  const [linkedin, setLinkedin] = useState(initialData.linkedin || "");
  const [instagram, setInstagram] = useState(initialData.instagram || "");
  const [city, setCity] = useState(initialData.city || "Santo Domingo");

  // Cargar perfil del usuario autenticado al montar o después de guardar
  useEffect(() => {
    let cancelled = false;
    async function loadProfile() {
      setFetching(true);
      try {
        const token = await getSupabaseToken();
        if (!token) {
          setFetching(false);
          return;
        }

        const res = await fetch("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          if (!cancelled && data.profile) {
            setName(data.profile.full_name || "");
            setPhone(data.profile.phone || "");
            setLicense(data.profile.agent_license || "");
            setBio(data.profile.bio || "");
            setEmail(data.profile.email || "");
            const meta = (data.profile as any).raw_user_meta_data || {};
            setCompany(meta.company || "");
            setWebsite(meta.website || "");
            setLinkedin(meta.linkedin || "");
            setInstagram(meta.instagram || "");
            setCity(meta.city || "Santo Domingo");
          }
        }
      } catch (err) {
        console.error("Error cargando perfil:", err);
      } finally {
        if (!cancelled) setFetching(false);
      }
    }
    loadProfile();
    return () => { cancelled = true; };
  }, [refreshKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    try {
      console.log("[ProfileForm] Iniciando guardado...");
      const token = await getSupabaseToken();
      
      if (!token) {
        console.error("[ProfileForm] No se pudo obtener el token");
        window.location.href = "/login?redirect=/cuenta";
        return;
      }

      console.log("[ProfileForm] Enviando datos al servidor...");
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name, company, license, bio, phone, email, website, linkedin, instagram, city,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error al guardar");
      }

      setSaved(true);
      // Trigger re-fetch to get updated data from server
      setTimeout(() => {
        setRefreshKey((k: number) => k + 1);
        setSaved(false);
      }, 1000);
    } catch (err: any) {
      alert(err.message || "Error al guardar el perfil");
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Mostrar loading mientras se carga el perfil
  if (fetching) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-brand" />
        <span className="ml-3 text-muted-foreground">Cargando perfil...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Sección: Foto y datos básicos */}
      <Card className="border-border/80 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <UserRound className="h-5 w-5 text-emerald-brand" />
            Información personal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Foto de perfil */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="relative">
              <div
                className={`h-24 w-24 rounded-full border-4 overflow-hidden ${
                  initialData.verified
                    ? "border-emerald-brand ring-4 ring-emerald-brand/20"
                    : "border-border"
                }`}
              >
                {photoPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photoPreview}
                    alt="Foto de perfil"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted text-2xl font-semibold text-navy">
                    {(name || initialData.name || "Agente").charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <label
                htmlFor="photo-upload"
                className="absolute -bottom-1 -right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-navy text-white shadow-md transition hover:bg-navy/80"
              >
                <Camera className="h-3.5 w-3.5" />
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </div>

            <div className="flex flex-col gap-2">
              {initialData.verified ? (
                <Badge variant="success" className="gap-1 self-start">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Agente Verificado
                </Badge>
              ) : (
                <Badge variant="secondary" className="gap-1 self-start">
                  <Building2 className="h-3.5 w-3.5" />
                  Solicitud pendiente
                </Badge>
              )}
              <div className="text-xs text-muted-foreground max-w-xs">
                La insignia de verificado se otorga tras validar identidad y licencia
                profesional.
              </div>
            </div>
          </div>

          <Separator />

          {/* Campos del formulario */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-navy">
                Nombre completo <span className="text-red-400">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="María García"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-medium text-navy">
                Inmobiliaria / Empresa
              </Label>
              <Input
                id="company"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="InmueblePro Agency"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="license" className="text-sm font-medium text-navy">
                Licencia profesional
              </Label>
              <Input
                id="license"
                name="license"
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                placeholder="RD-RE-2024-12345"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-medium text-navy">
                Ciudad principal
              </Label>
              <select
                id="city"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex h-10 w-full rounded-xl border border-input bg-white px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/20"
              >
                <option value="Santo Domingo">Santo Domingo</option>
                <option value="Punta Cana">Punta Cana</option>
                <option value="Puerto Plata">Puerto Plata</option>
                <option value="Santiago">Santiago</option>
                <option value="Jarabacoa">Jarabacoa</option>
                <option value="Las Terrenas">Las Terrenas</option>
                <option value="La Romana">La Romana</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-navy">
                Teléfono / WhatsApp
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 809-555-1234"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-navy">
                Correo electrónico
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="maria@inmueblepro.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-sm font-medium text-navy">
              Biografía profesional
            </Label>
            <Textarea
              id="bio"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Describe tu experiencia, especialidades y por qué trabajar contigo..."
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right">
              {bio.length}/500 caracteres
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Sección: Redes sociales y web */}
      <Card className="border-border/80 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald-brand" />
            Redes sociales y web
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="website" className="text-sm font-medium text-navy flex items-center gap-2">
                <Globe className="h-3.5 w-3.5" />
                Sitio web
              </Label>
              <Input
                id="website"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://tu-sitio.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-sm font-medium text-navy flex items-center gap-2">
                <Linkedin className="h-3.5 w-3.5" />
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                name="linkedin"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/in/tu-perfil"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram" className="text-sm font-medium text-navy flex items-center gap-2">
                <InstaIcon className="h-3.5 w-3.5" />
                Instagram
              </Label>
              <Input
                id="instagram"
                name="instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="@tu-inmobiliaria"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botones de acción */}
      <div className="flex flex-wrap justify-end gap-3">
        <Button variant="outline" type="button">
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : saved ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              ¡Guardado!
            </>
          ) : (
            "Guardar cambios"
          )}
        </Button>
      </div>

      {/* Toast de éxito animado */}
      {saved && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 z-50 rounded-xl border border-emerald-brand/30 bg-white px-5 py-4 shadow-lg"
        >
          <p className="flex items-center gap-2 text-sm font-medium text-emerald-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-brand" />
            Perfil actualizado correctamente
          </p>
        </motion.div>
      )}
    </form>
  );
}