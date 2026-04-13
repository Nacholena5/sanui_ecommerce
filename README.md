# 🍫 SANUI E-Commerce

**Bolitas Proteicas Veganas | 20g Proteína | Uruguay 🇺🇾**

Una plataforma de e-commerce moderna para SANUI, marca uruguaya de snacks proteicos veganos, sin gluten y sin azúcar.

---

## 📋 Estado del Proyecto

| Área | Estado | Detalles |
|------|--------|----------|
| **Frontend** | ✅ Listo | Home, Tienda, Productos, About, FAQ - todo responsive |
| **Imágenes** | ✅ Listo | 40 imágenes reales (13 SANUI + 27 del archivo sanuiprotee), optimizadas |
| **Deploy** | 🟢 Ready | Configurado para Vercel (frontend-only) |
| **Carrito** | ⏳ Next | Será agregado después de validar contenido |
| **Checkout** | ⏳ Next | Será agregado después de validar contenido |
| **Pagos** | ⏳ Next | Mercado Pago (infraestructura lista, implementación next) |

---

## 🚀 Deploy en Vercel (5 minutos)

```bash
# Opción 1: Con Vercel CLI
vercel

# Opción 2: Manual en https://vercel.com
# → Add New Project → Selecciona repo → Deploy
```

📖 Instrucciones completas en **DEPLOY.md**

---

## 📁 Estructura del Proyecto

```
sanui_ecommerce/
├── client/                    # Frontend React + Vite
│   ├── src/
│   │   ├── pages/            # Home, Store, Product, About, FAQ
│   │   ├── components/       # UI reutilizable, Analytics, SEO
│   │   ├── data/             # products.ts, igPhotos.ts
│   │   ├── hooks/            # useAuth, useAccessibility, etc
│   │   └── styles/           # Tailwind + variables SANUI
│   └── public/
│       └── images/           # 40 imágenes optimizadas (94 MB)
├── server/                    # Backend (inactivo en fase 1)
│   ├── routers/              # API routes (ready for next phase)
│   ├── db.ts                 # Drizzle ORM
│   └── _core/                # Context, auth, Mercado Pago (ready)
├── drizzle/                   # Schema BD, migrations
├── vercel.json               # Config para Vercel
├── DEPLOY.md                 # 📖 Guía de despliegue
├── CONTENT_CHECKLIST.md      # ✅ Qué revisar online
├── WORKFLOW.md               # 🔄 Cómo iterar rápido
└── NEXT_STEPS.md            # 🎯 Próximos pasos

```

---

## 🎨 Tech Stack

**Frontend:**
- React 19 + TypeScript
- Vite (build super rápido)
- Tailwind CSS 4 (diseño responsivo)
- Framer Motion (animaciones suaves)
- Wouter (routing)
- Radix UI (componentes accesible)

**Backend (Ready, no activo en v1):**
- Express.js
- Drizzle ORM + MySQL
- tRPC (type-safe API)
- Mercado Pago API

**Deployment:**
- Vercel (frontend-only)
- GitHub (version control)

---

## 📦 Productos (v1.0)

| Producto | Precio | Proteína | Stock |
|----------|--------|----------|-------|
| **Bolitas Proteicas Chocolate** | $320 | 20g | ✅ |
| **Bolitas Proteicas Vainilla** | $320 | 20g | ✅ |
| **Pack 2x (Chocolate + Vainilla)** | $550 | 20g c/u | ✅ |

---

## 📸 Imágenes Cargadas

**SANUI Real (13 fotos):**
- 8 imágenes de productos
- 4 imágenes evento MVD Beach Run
- 1 concepto creativo

**Sanuiprotee (27 fotos):**
- Fotos de producto detail
- Eventos y lifestyle
- Fotos del equipo

**Total:** 40 imágenes, 94 MB (todas optimizadas para web)

---

## ✨ Características Actuales

✅ **UI/UX:**
- Hero animado con Framer Motion
- Grid responsivo de productos
- Galería de fotos por producto
- Secciones lifestyle, gym, social proof
- Footer con links y sociales

✅ **SEO & PWA:**
- Meta tags dinámicos (OG tags, description, keywords)
- Schema.org structured data
- Service Worker (SW.js)
- Manifest.json para instalación mobile
- Sitemap.xml + robots.txt

✅ **Performance:**
- Code splitting (Vite chunks)
- Image optimization (versiones -web)
- Lazy loading de páginas
- Minificación + terser

✅ **Accesibilidad:**
- ARIA labels
- Keyboard navigation
- Screen reader support
- High contrast

---

## 🔄 Próximos Pasos (After Content Validation)

**Fase 2 (Carrito & Checkout):**
- [ ] Carrito funcional con localStorage
- [ ] Formulario de checkout
- [ ] Validación de envíos (Montevideo vs interior)
- [ ] Cálculo dinámico de precios

**Fase 3 (Pagos):**
- [ ] Integración Mercado Pago
- [ ] Webhook para pagos
- [ ] Email de confirmación
- [ ] Admin dashboard

**Fase 4 (Growth):**
- [ ] Blog/contenido (SEO)
- [ ] Email marketing
- [ ] Analytics detallado
- [ ] Mobile app (React Native)

---

## 📖 Documentación

| Archivo | Propósito |
|---------|-----------|
| **DEPLOY.md** | Cómo desplegar en Vercel (paso a paso) |
| **CONTENT_CHECKLIST.md** | Qué revisar cuando esté online |
| **WORKFLOW.md** | Cómo iterar rápido sobre contenido |
| **NEXT_STEPS.md** | Resumen del estado actual |

---

## 🛠️ Comandos Útiles

```bash
# Desarrollo local
npm run dev              # Inicia servidor dev (localhost:5173)

# Build & Deploy
npm run build            # Build frontend
npm run check            # TypeScript check
npm run test             # Run tests

# Utilities
npm run format           # Prettier
npm run db:push          # Drizzle migrations (no necesario fase 1)
```

---

## 🎯 Filosofía del Proyecto

> **"Contenido primero, tecnología segundo"**

- Nos enfocamos en que se vea bien online ANTES de agregar complejidad
- Cada feature se agrega después de validar lo anterior
- Iteración rápida sobre contenido
- No sobre-ingeniería innecesaria

---

## 📞 Contacto SANUI

- **WhatsApp:** +598 92 435 222
- **Instagram:** @sanui.uy
- **Email:** (configurar después)

---

## 📄 Licencia

MIT

---

**Versión:** 1.0.0 Frontend-Only  
**Última actualización:** 13 de Abril de 2026  
**Deploy:** Ready en Vercel  

🚀 **¿Listo para ir online? Mira DEPLOY.md**
