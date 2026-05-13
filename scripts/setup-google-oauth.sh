#!/bin/bash
# =====================================================
# InmueblePro — Setup Google OAuth con Supabase
# =====================================================
# Este script te guía paso a paso para configurar
# el inicio de sesión con Google en Supabase.
# =====================================================

set -e

echo "================================================"
echo "  🏠 InmueblePro — Google OAuth Setup"
echo "================================================"
echo ""

# Verificar si las variables de entorno existen
if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_ACCESS_TOKEN" ]; then
    echo "❌ Necesitas configurar las variables de entorno:"
    echo ""
    echo "  export SUPABASE_URL='tu-proyecto.supabase.co'"
    echo "  export SUPABASE_ACCESS_TOKEN='tu-access-token'"
    echo ""
    echo "O puedes ejecutar los pasos manualmente siguiendo la guía en:"
    echo "  SETUP.md (sección Google OAuth)"
    echo ""
    echo "¿Deseas ver la guía manual? (s/n)"
    read -r answer
    
    if [ "$answer" = "s" ] || [ "$answer" = "S" ]; then
        echo ""
        echo "================================================"
        echo "  Guía manual para habilitar Google OAuth"
        echo "================================================"
        echo ""
        echo "Paso 1: Configurar Google Cloud Console"
        echo "----------------------------------------"
        echo "1. Ir a https://console.cloud.google.com/"
        echo "2. Crear nuevo proyecto (o seleccionar existente)"
        echo "3. Habilitar API: Google+ API"
        echo "4. Configurar pantalla de consentimiento:"
        echo "   - Ir a APIs & Services > Consent screen"
        echo "   - User Type = External"
        echo "   - Fill app name, email, logo"
        echo "   - Add scope: openid, email, profile"
        echo "   - Save"
        echo "5. Crear credenciales OAuth:"
        echo "   - Go to APIs & Services > Credentials"
        echo "   - Create Credentials > OAuth Client ID"
        echo "   - Application type = Web application"
        echo "   - Authorized JavaScript origins:"
        echo "     http://localhost:3000"
        echo "     https://tu-dominio.com"
        echo "   - Authorized redirect URIs:"
        echo "     http://localhost:3000/auth/callback"
        echo "     https://tu-dominio.com/auth/callback"
        echo "   - Copy Client ID and Client Secret"
        echo ""
        echo "Paso 2: Configurar Supabase"
        echo "----------------------------------------"
        echo "1. Ir a https://app.supabase.com"
        echo "2. Seleccionar tu proyecto"
        echo "3. Authentication > Providers"
        echo "4. Habilitar Google"
        echo "5. Pegar Client ID y Client Secret"
        echo "6. Save"
        echo ""
        echo "Paso 3: Actualizar .env.local"
        echo "----------------------------------------"
        echo "Agregar las credenciales de Google:"
        echo ""
        echo "  # Google OAuth (para Supabase)"
        echo "  NEXT_PUBLIC_GOOGLE_CLIENT_ID=tu-client-id"
        echo "  NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=tu-client-secret"
        echo ""
    fi
    exit 0
fi

SUPABASE_PROJECT="$1"
GOOGLE_CLIENT_ID="$2"
GOOGLE_CLIENT_SECRET="$3"

if [ -z "$SUPABASE_PROJECT" ] || [ -z "$GOOGLE_CLIENT_ID" ] || [ -z "$GOOGLE_CLIENT_SECRET" ]; then
    echo "Uso: $0 <supabase-project> <google-client-id> <google-client-secret>"
    echo ""
    echo "Ejemplo:"
    echo "  $0 abc123.supabase.co AIzaSyD1234... GoogleSecret123..."
    exit 1
fi

echo "📦 Configurando Google OAuth para: $SUPABASE_PROJECT"
echo ""

# Obtener el API URL
API_URL="https://api.supabase.com/v1/projects/$SUPABASE_PROJECT"

# Obtener el token de acceso si no se proporcionó
if [ -z "$SUPABASE_ACCESS_TOKEN" ]; then
    echo "🔑 Obteniendo token de acceso..."
    # Necesitas iniciar sesión primero con: supabase login
    SUPABASE_ACCESS_TOKEN=$(supabase tokens list | grep service_role | head -1 | cut -d' ' -f1)
fi

# Habilitar Google provider via API
echo "🔧 Habilitando Google provider..."

curl -s -X PATCH "$API_URL/config/auth/providers" \
    -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
        \"google\": {
            \"enabled\": true,
            \"client_id\": \"$GOOGLE_CLIENT_ID\",
            \"secret\": \"$GOOGLE_CLIENT_SECRET\",
            \"redirect_uri\": \"https://$SUPABASE_PROJECT.supabase.co/auth/v1/callback\"
        }
    }" | python3 -m json.tool 2>/dev/null || echo "Response received (check Supabase dashboard to verify)"

echo ""
echo "✅ Configuración completada!"
echo ""
echo "Ahora necesitas:"
echo "1. Verificar en el dashboard de Supabase que Google está habilitado"
echo "2. Configurar los redirect URIs correctos"
echo "3. Reiniciar tu aplicación Next.js"
echo ""
echo "Para reinar:"
echo "  npm run dev"