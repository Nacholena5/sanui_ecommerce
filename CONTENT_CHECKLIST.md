# ✅ Checklist de Revisión de Contenido - SANUI Online

Después de que el sitio esté deployado en Vercel, usa este checklist para revisar el contenido real en vivo.

---

## 📋 Secciones a revisar

### 🏠 HOME PAGE (`/`)

- [ ] **Hero Section**
  - [ ] Imagen hero carga correctamente
  - [ ] Texto "Bolitas proteicas con 20g de proteína" es visible
  - [ ] Botones de CTA funcionan (clickeables)
  - [ ] Animaciones de Framer Motion estan suaves
  - [ ] Responsive en mobile

- [ ] **Valores (Vegano, Sin gluten, Sin azúcar, 20g proteína)**
  - [ ] Badges se ven claramente
  - [ ] Colores son justos
  - [ ] Texto legible

- [ ] **Sección Lifestyle**
  - [ ] Imágenes de MVD Beach Run cargan
  - [ ] Texto describe bien los eventos
  - [ ] Layout responsive

- [ ] **Sección Gym/Rendimiento**
  - [ ] Stats (20g proteína, 0g azúcar, 100% vegano) son visibles
  - [ ] Imagen de gym se ve bien
  - [ ] Contraste y legibilidad OK

- [ ] **Social Proof / Reseñas**
  - [ ] Testimonios se muestran correctamente
  - [ ] Estrellas de rating visibles
  - [ ] Nombres de clientes están ahí

- [ ] **Footer**
  - [ ] Links a sociales funcionan
  - [ ] Links internos funcionan
  - [ ] Contacto WhatsApp es correcto

---

### 🛍️ TIENDA (`/tienda`)

- [ ] **Grid de productos**
  - [ ] Mostrar 3 productos (Chocolate, Vainilla, Pack 2x)
  - [ ] Precios están visuales: $320, $320, $550
  - [ ] Imágenes de productos cargan
  - [ ] Badges "Más vendido", "Favorito", "Ahorra $90" se ven

- [ ] **Filtros**
  - [ ] Filtro por sabor funciona (aunque no todas opciones tengan productos)
  - [ ] Filtro por categoría funciona
  - [ ] Búsqueda funciona

- [ ] **Responsive**
  - [ ] En tablet: 2 columnas
  - [ ] En mobile: 1 columna
  - [ ] No hay overflow horizontal

---

### 📦 PRODUCTO DETAIL (`/producto/pb-chocolate`, etc)

- [ ] **Galería de fotos**
  - [ ] Primera image carga (thumbnail de bolita)
  - [ ] Botones para siguiente/anterior funcionan
  - [ ] Info de "Imagen X de Y" está clara

- [ ] **Info del producto**
  - [ ] Nombre: "Bolitas Proteicas SANUI Chocolate"
  - [ ] Precio: $320
  - [ ] Descripción con 20g de proteína está ahí
  - [ ] Ingredientes listados correctamente

- [ ] **Nutrición**
  - [ ] 20g proteína
  - [ ] 180 calorías
  - [ ] 15g carbos
  - [ ] 6g grasas
  - [ ] 3g fibra

- [ ] **Destacados de nutrición**
  - [ ] Lista con iconos de checkmark
  - [ ] Texto legible

- [ ] **Botones**
  - [ ] "Agregar al carrito" está (aunque no funcione backend)
  - [ ] Links relacionados a otros productos muestran

---

### ℹ️ ABOUT (`/sobre`)

- [ ] **Historia**
  - [ ] Sección "Sobre SANUI" se lee bien
  - [ ] Párrafos están formateados
  - [ ] Imágenes cargan

- [ ] **Valores principales**
  - [ ] "20g de Proteína" está destacado
  - [ ] "Sin Azúcar Agregado" está visible
  - [ ] Cards con iconos estan alineadas

- [ ] **Stats al final**
  - [ ] "100% Vegano"
  - [ ] "0g Azúcar agregado"
  - [ ] "20g Proteína"

---

### ❓ FAQ (`/faq`)

- [ ] **Acordeón funciona**
  - [ ] Click en pregunta expande respuesta
  - [ ] Click nuevamente la cierra
  - [ ] Smooth animation

- [ ] **Selección por categoría**
  - [ ] "Ingredientes", "Pedidos", "Nutrición" son clickeables
  - [ ] Filtra preguntas correctamente

- [ ] **Contenido**
  - [ ] "Bolitas Proteicas" está en lugar de "Protein Balls"
  - [ ] "20g de proteína" está mencionado
  - [ ] Respuestas son claras

---

### 📱 RESPONSIVE (Revisar en mobile/tablet)

- [ ] **Mobile (iPhone)**
  - [ ] Navbar hamburger funciona (click abre/cierra)
  - [ ] No hay scroll horizontal
  - [ ] Imágenes se adaptan
  - [ ] Botones son clickeables (target 44x44 mínimo)
  - [ ] Footer está clickeable

- [ ] **Tablet (iPad)**
  - [ ] Layout se adapta bien
  - [ ] Grid de productos: 2 columnas
  - [ ] Imágenes se ven grandes pero no pixeladas

---

### 🎨 Diseño & Visual

- [ ] **Colores SANUI**
  - [ ] Azul (#1ABCFE) se ve en botones y acentos
  - [ ] Verde (#00B84D) se ve en call-to-actions
  - [ ] Amarillo (#FFC700) en badges
  - [ ] Blanco/Off-white en fondos

- [ ] **Tipografía**
  - [ ] Bebas Neue (títulos) se ve bold y grande
  - [ ] Inter (body) se ve legible
  - [ ] Space Grotesk (secondary) se usa donde corresponde

- [ ] **Imágenes**
  - [ ] Todas cargan sin delays
  - [ ] Bolitas proteicas se ven deliciosas 😋
  - [ ] Beach Run x HOKA se ve profesional
  - [ ] No hay imágenes rotas o placeholders

---

## 🐛 Issues encontrados

Si encuentras algo que NO se ve bien, anota aquí:

**Issue 1:**
- Dónde: (página/sección)
- Qué: (descripción)
- En qué dispositivo: (mobile/tablet/desktop)
- Screenshot: (si es posible)

**Issue 2:**
- ...

---

## ✨ Feedback de contenido

¿Hay algo que quieras cambiar o agregar?

**Textos:** (revisar redacción, claridad, tono)
- ¿Está claro qué es SANUI?
- ¿Se entiende "20g de proteína"?
- ¿El tone/voz es consistente?

**Imágenes:** (revisar selección, orden)
- ¿Las imágenes representan bien el producto?
- ¿El orden de galerías tiene sentido?
- ¿Falta alguna foto importante?

**Precios:** (revisar actualización)
- ¿Son los precios correctos?
- ¿En pesos uruguayos ($)?

**Productos:** (revisar catálogo)
- ¿Hay que agregar o quitar sabores?
- ¿Los packs están bien definidos?

---

## 🚀 Próximo paso

Cuando tengas el checklist completado:

1. Recolecta todos los issues/feedback
2. Priorizalos (qué es lo más importante)
3. Haremos commits pequeños para cada cambio
4. Vercel auto-redeployará después de cada push

**La idea es iterar rápido sobre contenido ANTES de agregar checkout/pagos.**

---

**Checklist creado:** 13 de Abril de 2026  
**Versión:** Frontend-Only v1.0 (Vercel)
