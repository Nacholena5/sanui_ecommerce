# 🔄 Workflow post-Vercel Deploy

## Objetivo
Iterar rápidamente sobre contenido sin agregar nuevas features.

---

## 📋 Ciclo de iteración (Rápido)

```
1. Revisar sitio en vivo ✅
   ↓
2. Encontrar issues/feedback 🐛
   ↓
3. Editar localmente (SOLO contenido) ✏️
   ↓
4. Commit pequeño (1 cambio = 1 commit) 📝
   ↓
5. Push a main → Vercel auto-redeploy 🚀
   ↓
6. Verificar en vivo en 2-3 minutos ⏱️
   ↓
7. Volver a paso 2
```

---

## 💻 Dónde editar cada cosa

### 📝 Textos

**Home page:**
```
client/src/pages/Home.tsx (líneas 80-95 para hero, etc)
```

**About:**
```
client/src/pages/About.tsx
```

**FAQ:**
```
client/src/pages/FAQ.tsx (faqData array)
```

**Footer:**
```
client/src/components/Footer.tsx
```

### 💰 Precios y productos

**Datos de productos:**
```
client/src/data/products.ts
→ Cambiar "price: 320" (en pesos)
```

**Ejemplo cambio de precio:**
```javascript
// ANTES
{
  id: "pb-chocolate",
  name: "Bolitas Proteicas SANUI Chocolate",
  price: 320,  // ← Cambiar aquí
}

// DESPUÉS
{
  id: "pb-chocolate",
  name: "Bolitas Proteicas SANUI Chocolate",
  price: 350,  // ← Nuevo precio
}
```

### 🖼️ Imágenes

**Para cambiar imagen de producto o hero:**

1. Copia imagen a `client/public/images/`
2. Usa en componente:
   ```jsx
   <img src="/images/mi-imagen-web.png" alt="..." />
   ```
3. Las imágenes en public/ NO necesitan rebuild

**Para imágenes en igPhotos.ts:**
```typescript
// client/src/data/igPhotos.ts
export const IG = {
  product_hero: "/images/SANUI - 8-web.png",  // ← Cambiar referencia
  // ...
}
```

---

## 🔧 Tipos de cambios PERMITIDOS en esta fase

✅ **Permitido (solo contenido):**
- Editar textos/copy
- Cambiar precios
- Agregar/quitar imágenes
- Modificar descripciones
- Cambiar ingredientes listados
- Editar stats/números

❌ **NO permitido (requiere nueva fase):**
- Agregar carrito funcional
- Agregar checkout
- Integrar Mercado Pago
- Crear tablas nuevas (BD)
- Agregar nuevas secciones/componentes
- Cambiar estructura de rutas

---

## 📝 Ejemplo de workflow - Cambiar precio

### Paso 1: Editar localmente
```bash
# Abre archivo
code client/src/data/products.ts

# Busca el producto y cambiar precio
# Guarda (Cmd+S)
```

### Paso 2: Commitear
```bash
cd /Users/martinlena/sanui_ecommerce

git add client/src/data/products.ts

git commit -m "feat: Actualiza precio Bolitas Proteicas Chocolate a $350"
```

### Paso 3: Push
```bash
git push origin main
```

### Paso 4: Esperar
- Vercel recibe el push automáticamente
- Build empieza en 10 segundos
- Deploy listo en 2-3 minutos
- Recibís email cuando está ready

### Paso 5: Verificar
- Abre https://sanui-ecommerce.vercel.app
- Recarga (Cmd+Shift+R para limpiar cache)
- Verifica que el precio cambió ✅

---

## 🚨 Si algo sale mal

**El build falla:**
```bash
# Verifica localmente
npm run build
# Si hay error, git fix y repite
```

**Los cambios no se ven:**
```bash
# 1. Recarga la página (Cmd+Shift+R en Mac)
# 2. Espera 30 segundos más (a veces cache)
# 3. Verifica console (F12) para errores
```

**Necesitas revertir un cambio:**
```bash
git revert HEAD  # Revierte el último commit
git push origin main  # Vercel redeploya automático
```

---

## 📊 Estado de deploy

Puedes ver el estado en:
- Vercel dashboard: https://vercel.com/dashboard
- Logs en tiempo real de cada deploy
- Emails de Vercel cuando termina

---

## 🎯 Sugerencias de orden de iteración

1. **Primero:** Verificar que todo carga sin errores
2. **Segundo:** Revisar textos en Home y FAQ (lo que más ve la gente)
3. **Tercero:** Validar precios y productos
4. **Cuarto:** Revisar imágenes y galerías
5. **Quinto:** Ajustar elementos visuales (estos requieren rebuild)

---

## ⏱️ Tiempos típicos

| Acción | Tiempo |
|--------|--------|
| Editar archivo local | 5 minutos |
| Commit + Push | 1 minuto |
| Vercel build | 2-3 minutos |
| Verificar en vivo | 1 minuto |
| **Total ciclo** | **~10 minutos** |

---

**Listo. Estás preparado para iterar rápido sobre contenido. Cuando veas algo que quieras cambiar, edita, commitea y push. ¡Vercel hace el resto automático!**
