# 🏠 InmueblePro — Guía de Configuración del Backend (Open Source) 

Este documento te guía paso a paso para configurar el backend de InmueblePro con herramientas open-source.

## Stack Tecnológico

| Componente | Herramienta | URL |
|------------|-------------|-----|
| Base de datos | PostgreSQL 15 | https://supabase.com |
| Autenticación | Supabase Auth | https://supabase.com/docs/auth |
| Storage | Supabase Storage | https://supabase.com/docs/storage |
| API | Next.js 14 App Router | https://nextjs.org |

## Paso 1: Crear proyecto en Supabase

1. Ir a https://supabase.com y crear una cuenta gratuita
2. Hacer clic en **"New Project"**
3. Completar el formulario:
   - **Name**: InmueblePro (o el nombre que prefieras)
   - **Database Password**: Generar una contraseña segura (guárdala)
   - **Region**: Seleccionar la más cercana (ej: US East para América)
4. Esperar ~2 minutos a que se provisione el proyecto

## Paso 2: Ejecutar el esquema de base de datos

1. En tu panel de Supabase, ir a **SQL Editor** (menú lateral izquierdo)
2. Hacer clic en **"New query"**
3. Copiar todo el contenido del archivo `supabase/migrations/001_initial_schema.sql`
4. Hacer clic en **"Run"** (o presionar Ctrl+Enter)
5. Verificar que aparece **"Success. No rows returned"**

### Tablas creadas:

| Tabla | Descripción |
|-------|-------------|
| `profiles` | Perfiles de usuarios (vinculado a Auth) |
| `properties` | Propiedades publicadas |
| `property_images` | Imágenes de propiedades |
| `property_views` | Analíticas de vistas |
| `contact_requests` | Solicitudes de contacto |

## Paso 3: Configurar Storage (imágenes)

1. Ir a **Storage** en el menú lateral
2. Hacer clic en **"New bucket"**
3. Configurar:
   - **Name**: `property-images`
   - **Public**: ✅ Sí (lectura pública para propiedades aprobadas)
   - **File size limit**: `52428800` (50 MB)
   - Allowed MIME types: `image/jpeg, image/png, image/webp`
4. Hacer clic en **"Create"**

### Políticas de seguridad del bucket:

Las políticas RLS de las tablas ya están configuradas. Para el bucket, agregar estas políticas en **Storage > Policies**:

```sql
-- Lectura pública (para mostrar propiedades al público)
CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT USING (bucket_id = 'property-images');

-- Solo usuarios autenticados pueden subir
CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'property-images'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Solo el dueño puede eliminar
CREATE POLICY "Owners can delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'property-images'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
```

## Paso 4: Obtener las credenciales

1. Ir a **Settings > API** (menú lateral)
2. Copiar los siguientes valores:

| Variable | Dónde encontrarla |
|----------|-------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL → "URL" |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | API Keys → "anon public" |
| `SUPABASE_SERVICE_ROLE_KEY` | API Keys → "service_role" (¡no compartir!) |

3. Copiar `.env.example` a `.env.local`:
```bash
cp .env.example .env.local
```

4. Completar `.env.local` con las credenciales:
```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anon-publica
SUPABASE_SERVICE_ROLE_KEY=tu-clave-service-role-OCULTA
```

## Paso 5: Configurar autenticación (opcional)

Supabase Auth viene configurado por defecto. Para personalizarlo:

1. Ir a **Authentication > Providers**
2. Habilitar/deshabilitar proveedores:
   - **Email** ✅ (habilitado por defecto)
   - **Google** (requiere configuración de Google Console)
   - **GitHub** (requiere configuración de GitHub OAuth)

### Configuración de Email:

1. Ir a **Authentication > Email Templates**
2. Personalizar el template de confirmación de email
3. Ir a **Authentication > Settings**
4. Configurar:
   - **Enable email confirmations**: ✅ Sí
   - **Enable double opt-in**: ✅ Sí

## Paso 6: Ejecutar la aplicación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

La aplicación estará disponible en http://localhost:3000

## API Endpoints disponibles

### Propiedades (Público)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/properties` | Listar propiedades aprobadas (con filtros) |
| GET | `/api/properties/[slug]` | Ver propiedad individual |

**Filtros para GET /api/properties:**
- `city` — Ciudad (ej: "Santo Domingo")
- `category` — Categoría (ej: "Apartamento")
- `dealType` — Tipo de operación ("venta" | "alquiler")
- `minPrice` — Precio mínimo
- `maxPrice` — Precio máximo
- `minBeds` — Mínimo de habitaciones
- `minBaths` — Mínimo de baños
- `minArea` — Área mínima en m²
- `page` — Página (default: 1)
- `limit` — Resultados por página (default: 12, máx: 50)

### Propiedades (Usuario autenticado)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/user/properties` | Crear nueva propiedad |
| GET | `/api/user/properties` | Listar propiedades del usuario |

**Crear propiedad (POST body):**
```json
{
  "title": "Penthouse con vista al mar",
  "slug": "penthouse-vista-mar",
  "description": "Hermoso penthouse...",
  "deal_type": "venta",
  "category": "Apartamento",
  "city": "Santo Domingo",
  "zone": "Piantini",
  "currency": "USD",
  "price": 250000,
  "beds": 3,
  "baths": 2,
  "area_m2": 150,
  "lat": 18.4799,
  "lng": -69.9368,
  "amenities": ["parking", "gym", "pool"],
  "matricula_ref": "RD-12345"
}
```

### Subir imágenes

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/properties/upload-images` | Subir imágenes a Supabase Storage |

**Body (multipart/form-data):**
- `images[]` — Archivos de imagen (JPEG, PNG, WebP, máx 10MB cada uno)
- `property_id` — UUID de la propiedad

## Estructura de datos

### Propiedad

```typescript
interface Property {
  id: string;              // UUID auto-generado
  user_id: string;         // UUID del propietario
  title: string;           // Título de la publicación
  slug: string;            // URL amigable única
  description: string;     // Descripción detallada
  deal_type: "venta" | "alquiler";
  category: string;        // "Apartamento", "Casa", etc.
  city: string;            // Ciudad
  zone: string;            // Sector/Zona
  currency: "USD" | "DOP";
  price: number;           // Precio
  beds: number | null;     // Habitaciones
  baths: number;           // Baños
  area_m2: number;         // Área en m²
  lat: number | null;      // Latitud
  lng: number | null;      // Longitud
  amenities: string[];     // Amenidades
  matricula_ref: string | null;  // Referencia de matrícula
  status: "borrador" | "revision" | "aprobada" | "rechazada";
  published_at: Date | null;
  created_at: Date;
  updated_at: Date;
}
```

## Solución de problemas

### Error: "Supabase no configurado" (503)

Verificar que las variables de entorno están correctamente configuradas en `.env.local`:
```bash
cat .env.local
```

### Error: "No autorizado" (401)

- Asegurarse de que el usuario está autenticado
- Verificar que la cookie de sesión existe
- Revisar que las políticas RLS están configuradas correctamente

### Error: "unique_constraint" (409)

Ya existe una propiedad con ese slug. Cambiar el título o el slug.

### Error al subir imágenes

- Verificar que el bucket `property-images` existe
- Verificar que los archivos son JPEG, PNG o WebP
- Verificar que cada archivo es menor a 10MB

## Migraciones futuras

Para agregar nuevas tablas o columnas:

1. Crear un nuevo archivo en `supabase/migrations/002_nombre_migracion.sql`
2. Ejecutar el SQL en Supabase SQL Editor
3. Hacer commit del archivo de migración

## Habilitar inicio de sesión con Google

El error `{"code":400,"error_code":"validation_failed","msg":"Unsupported provider: provider is not enabled"}` indica que Google no está habilitado como proveedor en tu instancia de Supabase. Sigue estos pasos:

### Paso 1: Crear proyecto en Google Cloud Console

1. Ir a https://console.cloud.google.com/
2. Hacer clic en el selector de proyectos (arriba) > **"New Project"**
3. Nombre: `InmueblePro` (o el que prefieras) > Create
4. Esperar a que se cree el proyecto

### Paso 2: Configurar pantalla de consentimiento

1. Ir a **APIs & Services > Consent screen**
2. User Type = **External** > Create
3. Completar el formulario:
   - **App name**: InmueblePro
   - **User support email**: Tu correo
   - **Developer contact email**: Tu correo
4. Hacer clic en **Save and Continue**
5. Scopes > hacer clic en **Save and Continue** (no necesitas añadir scopes extra)
6. Test users > Añadir tu correo de Google > **Save and Continue**

### Paso 3: Crear credenciales OAuth

1. Ir a **APIs & Services > Credentials**
2. Hacer clic en **+ CREATE CREDENTIALS** > **OAuth client ID**
3. Application type = **Web application**
4. Nombre: `InmueblePro Web`
5. Authorized JavaScript origins:
   ```
   http://localhost:3000
   https://tu-dominio.com
   ```
6. Authorized redirect URIs:
   ```
   http://localhost:3000/auth/callback
   https://tu-dominio.com/auth/callback
   ```
7. Hacer clic en **Create**
8. **Copiar el Client ID y Client Secret**

### Paso 4: Habilitar Google en Supabase

1. Ir a https://app.supabase.com
2. Seleccionar tu proyecto
3. Ir a **Authentication > Providers**
4. Habilitar **Google**
5. Pegar el **Client ID** y **Client Secret** de Google
6. Hacer clic en **Save**

### Paso 5: Configurar redirect URIs en Supabase

1. En Supabase, ir a **Authentication > URL Configuration**
2. En **Site URL**, poner:
   ```
   http://localhost:3000
   ```
   (o `https://tu-dominio.com` en producción)

### Paso 6: Reiniciar la aplicación

```bash
npm run dev
```

Ahora el botón "Continuar con Google" debería funcionar correctamente.

---

## Solución de errores comunes

### Error: "Unsupported provider: provider is not enabled"

✅ **Solución**: Google no está habilitado en Supabase. Seguir los pasos 1-6 arriba.

### Error: "redirect_uri_mismatch"

✅ **Solución**: Verificar que el redirect URI en Google Cloud (`http://localhost:3000/auth/callback`) coincide exactamente con el configurado en Supabase.

### Error: "This app has not been verified"

✅ **Solución**: En producción, completar la verificación de la app en Google Console. Para desarrollo, puedes acceder directamente (aparecerá un aviso de seguridad).

---

## Licencia

Este proyecto es open-source y está disponible bajo la licencia MIT.
