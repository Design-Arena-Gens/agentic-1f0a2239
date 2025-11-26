# ODIGO-RCS · Sistema de Certificación y Preservación Digital

Plataforma web construida con Next.js 14 para gestionar la certificación, trazabilidad y preservación de activos electromecánicos con un ticker operativo en tiempo real. Diseñada para desplegarse en Vercel o sobre infraestructura propia que incluya PostgreSQL, Redis y PM2.

## ✨ Características clave

- Dashboard con métricas en vivo de certificaciones, revisiones y observaciones.
- Ticker en tiempo real que refleja la actividad del registro ODIGO-RCS.
- Módulo de registro de activos con hash de integridad y cadena de custodia.
- Bóveda de preservación con controles automatizados y criticidades.
- UI responsiva basada en Tailwind y componentes reutilizables.

## 🛠️ Tecnologías

- [Next.js 14](https://nextjs.org/) con App Router y TypeScript.
- Tailwind CSS con personalización para animaciones de ticker.
- [lucide-react](https://lucide.dev/) para iconografía ligera.
- Arquitectura lista para integrarse con PostgreSQL, Redis y orquestadores como PM2.

## 📁 Estructura principal

```
src/
  app/
    layout.tsx        # Layout global y metadatos
    page.tsx          # Dashboard principal ODIGO-RCS
    globals.css       # Estilos globales y animaciones
  components/
    certificate-board.tsx
    certificate-form.tsx
    preservation-vault.tsx
    ticker.tsx
```

## ⚙️ Puesta en marcha local

```bash
npm install
npm run dev
# Aplicación en http://localhost:3000
```

### Scripts disponibles

- `npm run dev` – Entorno de desarrollo con hot reload.
- `npm run build` – Compilación para producción.
- `npm start` – Servir el build compilado.
- `npm run lint` – Reglas ESLint/TypeScript.

## 🧱 Infraestructura recomendada (Ubuntu Server)

```bash
# 1. Dependencias del sistema
sudo apt update
sudo apt install -y postgresql postgresql-contrib redis-server nginx certbot python3-certbot-nginx git curl wget

# 2. Node.js 18 + PM2
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2

# 3. PostgreSQL inicial
sudo -u postgres psql -c "CREATE USER odigo WITH PASSWORD 'change-this-password';"
sudo -u postgres psql -c "CREATE DATABASE odigo_rcs OWNER odigo;"
```

Configura un archivo `.env` con las credenciales de PostgreSQL y Redis si decides acoplar un backend usando API Routes, Edge Functions o microservicios.

## 🚀 Despliegue

1. Ejecuta `npm run build` y valida que no existan errores.
2. Despliega a Vercel con `vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-1f0a2239`.
3. Verifica en `https://agentic-1f0a2239.vercel.app` tras unos segundos.

## 🔐 Próximos pasos sugeridos

- Conectar formularios a una API/DB (PostgreSQL + Prisma o Drizzle).
- Alimentar el ticker con colas de eventos en Redis.
- Integrar autenticación (NextAuth, Supabase Auth) para control de acceso.
- Añadir pruebas E2E (Playwright/Cypress) para validar flujos críticos.

---

Proyecto versión **1.0.0** · Autor: **Ingeniero Electromecánico**.
