# 🚀 Despliegue SANUI - Frontend-Only (Vercel)

## Objetivo
Visualizar el ecommerce SANUI en vivo para revisar contenido: textos, imágenes, productos y precios reales.

**Tiempo:** 5 minutos  
**Complejidad:** Mínima

---

## ✅ Qué funciona en este deploy

- ✅ Hero section con imágenes
- ✅ Tienda con productos y filtros
- ✅ Páginas: About, FAQ, Producto Detail
- ✅ Footer con links
- ✅ Responsive design
- ✅ Animaciones (Framer Motion)
- ✅ PWA (manifest, robots.txt, sitemap.xml)

**Nota:** Carrito y checkout NO funcionarán (sin backend)  
Eso se agregará cuando el contenido esté validado.

---

## 📋 Pasos para desplegar en Vercel

### 1️⃣ Preparar repositorio (ya hecho)
```bash
# Verifica que vercel.json existe
cat vercel.json
```

### 2️⃣ Connect a Vercel
Opción A (recomendada - automático):
```bash
# Si tienes Vercel CLI instalado:
npm i -g vercel
cd /Users/martinlena/sanui_ecommerce
vercel
# Sigue los pasos: conecta a GitHub, autoriza, etc.
```

Opción B (manual web):
1. Ve a https://vercel.com
2. Sign up / Login con GitHub
3. Click "Add New..." → "Project"
4. Importa `martinlena/sanui_ecommerce`
5. Click Deploy

### 3️⃣ Verifica el deploy
- Espera 2-3 minutos
- Abrirá URL: `sanui-ecommerce.vercel.app` (o similar)
- ¡Listo para revisar contenido en vivo!

---

## 🔍 Qué revisar PRIMERO online

1. **Home page**
   - ¿Hero section se ve bien?
   - ¿Las imágenes cargan?
   - ¿Texto y CTA son claros?

2. **Tienda (/tienda)**
   - ¿Productos se muestran correctamente?
   - ¿Precios están actualizados?
   - ¿Imágenes de productos se ven bien?

3. **Producto detail (/producto/:id)**
   - ¿Galería de fotos funciona?
   - ¿Descripción es clara?
   - ¿Nutrición se ve legible?

4. **About & FAQ**
   - ¿Contenido se lee bien?
   - ¿Links funcionan?

5. **Responsive**
   - Abre en mobile (DevTools F12)
   - ¿Se ve bien en pantalla chica?

---

## 📝 Próximos pasos (después del deploy)

Con el sitio en vivo, podés:

1. **Revisar contenido real**
   - ¿Los textos estan OK?
   - ¿Las imágenes se ven profesionales?
   - ¿Los precios son correctos?

2. **Iterar sobre contenido**
   - Editar textos en código
   - Cambiar imágenes
   - Ajustar precios
   - Commit → Auto-redeploy en Vercel

3. **Agregar features** cuando estés satisfecho
   - Carrito funcional
   - Checkout
   - Sistema de órdenes
   - Pagos (Mercado Pago)

---

## 🆘 Troubleshooting

**¿Build falla?**
```bash
# Verifica que Vite está configurado correctamente:
cd client && npm run build
# Si tienes errores, arregla localmente primero
```

**¿Deploy se demora mucho?**
- Normal: 2-3 minutos para build + upload
- Vercel te avisa por email cuando está listo

**¿Imágenes no cargan?**
- Verifica que están en `client/public/images/`
- Recarga página (Cmd+Shift+R en Mac)

---

## 🎯 Comando único para desplegar

Si ya tienes Vercel CLI:
```bash
cd /Users/martinlena/sanui_ecommerce
vercel --prod
```

---

**Listo. Cuando des el go, pasas los pasos y el sitio está online en 5 minutos.**
