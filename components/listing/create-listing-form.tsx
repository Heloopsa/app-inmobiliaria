"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { listingAmenityOptions } from "@/lib/amenities";
import { slugify } from "@/lib/formatters";
import {
  PROPERTY_CATEGORIES,
  PROPERTY_CITIES,
  ZONES_BY_CITY,
} from "@/lib/property-options";

const amenityList = listingAmenityOptions();

export function CreateListingForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [dealType, setDealType] = useState<"venta" | "alquiler">("venta");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState<string>(PROPERTY_CITIES[0]);
  const [zone, setZone] = useState("");
  const [currency, setCurrency] = useState<"USD" | "DOP">("USD");
  const [price, setPrice] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [areaM2, setAreaM2] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [amenities, setAmenities] = useState<Set<string>>(new Set());
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [cedulaOrRnc, setCedulaOrRnc] = useState("");
  const [matricula, setMatricula] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptTruth, setAcceptTruth] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [uploadedPropertyId, setUploadedPropertyId] = useState<string | null>(null);

  const zoneOptions = useMemo(() => {
    const list = ZONES_BY_CITY[city];
    return list ? [...list] : [];
  }, [city]);

  function onTitleBlur() {
    if (!slug && title.trim()) setSlug(slugify(title));
  }

  function toggleAmenity(key: string) {
    setAmenities((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  async function getSupabaseToken(): Promise<string | null> {
    try {
      const { getSupabaseBrowserClient } = await import("@/lib/supabase-client");
      const client = getSupabaseBrowserClient();
      const { data } = await client.auth.getSession();
      return data.session?.access_token || null;
    } catch {
      return null;
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!acceptTerms || !acceptTruth) {
      setError("Debes aceptar los términos y declarar que la información es veraz.");
      return;
    }

    setSubmitting(true);

    try {
      // Obtener token de autenticación
      const token = await getSupabaseToken();
      if (!token) {
        router.push("/login?redirect=/publicar");
        return;
      }

      // Paso 1: Crear la propiedad con token en Authorization header
      const propertyRes = await fetch("/api/user/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug?.trim() || "",
          description: description.trim(),
          deal_type: dealType,
          category,
          city,
          zone,
          currency,
          price: parseFloat(price),
          beds: beds ? parseInt(beds) : null,
          baths: parseInt(baths),
          area_m2: parseFloat(areaM2),
          lat: lat ? parseFloat(lat) : null,
          lng: lng ? parseFloat(lng) : null,
          amenities: Array.from(amenities),
          matricula_ref: matricula?.trim() || null,
        }),
      });

      const propertyData = await propertyRes.json();

      if (!propertyRes.ok) {
        if (propertyRes.status === 401) {
          router.push("/login?redirect=/publicar");
          return;
        }
        throw new Error(propertyData.error || "Error al crear la propiedad");
      }

      const propertyId = propertyData.property.id;
      setUploadedPropertyId(propertyId);

      // Paso 2: Subir imágenes si hay
      const photoInput = document.getElementById("pub-photos") as HTMLInputElement;
      if (photoInput && photoInput.files?.length) {
        const formData = new FormData();
        formData.append("property_id", propertyId);
        for (let i = 0; i < photoInput.files.length; i++) {
          formData.append("images", photoInput.files[i]);
        }

        const uploadRes = await fetch("/api/properties/upload-images", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        if (!uploadRes.ok) {
          const uploadError = await uploadRes.json();
          console.warn("Warning uploading images:", uploadError);
        }
      }

      setDone(true);
    } catch (err: any) {
      setError(err.message || "Ocurrió un error inesperado");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <Card className="border-emerald-brand/30 bg-emerald-brand/5">
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <CheckCircle2 className="h-12 w-12 text-emerald-brand" aria-hidden />
          <h2 className="text-xl font-semibold text-navy">¡Propiedad enviada exitosamente!</h2>
          <p className="max-w-md text-sm text-muted-foreground">
            Tu propiedad ha sido creada y está pendiente de revisión por nuestro equipo.
            Una vez aprobada, aparecerá públicamente en el sitio.
          </p>
          <div className="mt-4 flex gap-3">
            <Button type="button" variant="outline" onClick={() => router.push("/cuenta")}>
              Ver mis propiedades
            </Button>
            <Button type="button" onClick={() => window.location.reload()}>
              Nueva propiedad
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
          <AlertCircle className="h-5 w-5 shrink-0" />
          {error}
        </div>
      )}

      {/* Datos principales */}
      <Card>
        <CardHeader>
          <CardTitle>Datos principales</CardTitle>
          <CardDescription>
            Título comercial, URL amigable y descripción detallada.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pub-title">Título de la publicación *</Label>
            <Input
              id="pub-title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={onTitleBlur}
              placeholder="Ej. Penthouse con vista al mar — Piantini"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pub-slug">Slug (URL) *</Label>
            <Input
              id="pub-slug"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="penthouse-piantini"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pub-type">Operación *</Label>
              <select
                id="pub-type"
                className="flex h-10 w-full rounded-xl border border-input bg-white px-3 text-sm shadow-sm"
                value={dealType}
                onChange={(e) => setDealType(e.target.value as "venta" | "alquiler")}
              >
                <option value="venta">Venta</option>
                <option value="alquiler">Alquiler</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pub-category">Categoría *</Label>
              <select
                id="pub-category"
                required
                className="flex h-10 w-full rounded-xl border border-input bg-white px-3 text-sm shadow-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>Selecciona…</option>
                {PROPERTY_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pub-desc">Descripción *</Label>
            <Textarea
              id="pub-desc"
              required
              minLength={40}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Destaca ubicación, acabados, servicios incluidos y condiciones de venta o alquiler."
            />
          </div>
        </CardContent>
      </Card>

      {/* Ubicación */}
      <Card>
        <CardHeader>
          <CardTitle>Ubicación</CardTitle>
          <CardDescription>
            Ciudad y sector exactos para mapa y búsqueda.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pub-city">Ciudad / municipio *</Label>
              <select
                id="pub-city"
                required
                className="flex h-10 w-full rounded-xl border border-input bg-white px-3 text-sm shadow-sm"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setZone("");
                }}
              >
                {PROPERTY_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pub-zone">Sector / zona *</Label>
              {zoneOptions.length ? (
                <select
                  id="pub-zone"
                  required
                  className="flex h-10 w-full rounded-xl border border-input bg-white px-3 text-sm shadow-sm"
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                >
                  <option value="" disabled>Selecciona sector…</option>
                  {zoneOptions.map((z) => (
                    <option key={z} value={z}>
                      {z}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  id="pub-zone"
                  required
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  placeholder="Nombre del sector"
                />
              )}
            </div>
          </div>
          <Separator />
          <p className="text-xs font-medium text-muted-foreground">
            Coordenadas (opcional, decimales)
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pub-lat">Latitud</Label>
              <Input
                id="pub-lat"
                inputMode="decimal"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                placeholder="18.47"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pub-lng">Longitud</Label>
              <Input
                id="pub-lng"
                inputMode="decimal"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                placeholder="-69.93"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Precio y superficie */}
      <Card>
        <CardHeader>
          <CardTitle>Precio y superficie</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="pub-currency">Moneda *</Label>
              <select
                id="pub-currency"
                className="flex h-10 w-full rounded-xl border border-input bg-white px-3 text-sm shadow-sm"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as "USD" | "DOP")}
              >
                <option value="USD">USD</option>
                <option value="DOP">DOP</option>
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="pub-price">Precio *</Label>
              <Input
                id="pub-price"
                required
                inputMode="decimal"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder={dealType === "alquiler" ? "Mensual" : "Total"}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="pub-beds">Habitaciones</Label>
              <Input
                id="pub-beds"
                inputMode="numeric"
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                placeholder="0 = estudio"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pub-baths">Baños *</Label>
              <Input
                id="pub-baths"
                required
                inputMode="numeric"
                value={baths}
                onChange={(e) => setBaths(e.target.value)}
                placeholder="2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pub-area">Área m² *</Label>
              <Input
                id="pub-area"
                required
                inputMode="decimal"
                value={areaM2}
                onChange={(e) => setAreaM2(e.target.value)}
                placeholder="145"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Amenidades */}
      <Card>
        <CardHeader>
          <CardTitle>Amenidades</CardTitle>
          <CardDescription>Marca todo lo que aplique.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {amenityList.map(({ key, label }) => (
              <label
                key={key}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted/50"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-input text-navy focus:ring-navy"
                  checked={amenities.has(key)}
                  onChange={() => toggleAmenity(key)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fotos y documentación */}
      <Card>
        <CardHeader>
          <CardTitle>Fotos y documentación</CardTitle>
          <CardDescription>
            Mínimo 3 fotos HD recomendadas. Formatos aceptados: JPEG, PNG, WebP (máx 10MB cada una).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pub-photos">Imágenes (recomendado, mín. 3)</Label>
            <Input
              id="pub-photos"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="cursor-pointer text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-navy file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pub-matricula">Matrícula / certificado (referencia)</Label>
              <Input
                id="pub-matricula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                placeholder="Nº de expediente o título"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pub-rnc">Cédula o RNC del titular *</Label>
              <Input
                id="pub-rnc"
                required
                value={cedulaOrRnc}
                onChange={(e) => setCedulaOrRnc(e.target.value)}
                placeholder="001-0000000-0 o 131xxxxxx"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contacto del anunciante */}
      <Card>
        <CardHeader>
          <CardTitle>Contacto del anunciante</CardTitle>
          <CardDescription>Visible solo para el equipo hasta verificar la cuenta.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pub-cname">Nombre completo *</Label>
            <Input
              id="pub-cname"
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pub-cemail">Correo *</Label>
              <Input
                id="pub-cemail"
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pub-cphone">Teléfono / WhatsApp *</Label>
              <Input
                id="pub-cphone"
                required
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Términos y enviar */}
      <Card>
        <CardContent className="space-y-4 pt-6">
          <label className="flex cursor-pointer items-start gap-3 text-sm">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-input"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              required
            />
            <span className="text-muted-foreground">
              Acepto los términos de publicación, políticas de contenido y comisiones
              aplicables en InmueblePro.
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-3 text-sm">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-input"
              checked={acceptTruth}
              onChange={(e) => setAcceptTruth(e.target.checked)}
              required
            />
            <span className="text-muted-foreground">
              Declaro que la información y documentos son veraces y autorizo la revisión
              por el equipo de curaduría.
            </span>
          </label>
          <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                Enviando…
              </>
            ) : (
              "Enviar a revisión"
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}