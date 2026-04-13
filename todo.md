# SANUI E-commerce TODO

## Design System & Base
- [x] CSS global con paleta SANUI (azul, verde, amarillo, kraft, negro)
- [x] Tipografía bold e impactante (Bebas Neue + Space Grotesk)
- [x] Variables CSS y tokens de diseño SANUI
- [x] Componentes base reutilizables

## Navigation & Layout
- [x] Header persistente con logo SANUI
- [x] Hamburger menu en mobile
- [x] Ícono de carrito con contador en header
- [x] Footer con links, redes sociales y contacto

## Home Page
- [x] Hero section full-screen con tagline y CTA
- [x] Sección de highlights del producto (valores: vegano, sin gluten, sin azúcar)
- [x] Bloque lifestyle (verano/frescura)
- [x] Bloque gym/rendimiento (oscuro, contraste)
- [x] Social proof / reseñas
- [x] CTA directo a la tienda

## Store Page
- [x] Grid de productos
- [x] Filtros por sabor y categoría
- [x] Búsqueda de productos
- [x] Botón add-to-cart en cada producto
- [x] Estado vacío

## Product Page
- [x] Galería de fotos del producto con navegación
- [x] Highlights nutricionales
- [x] Selector de sabor
- [x] Selector de cantidad
- [x] Botón de compra
- [x] Descripción del producto
- [x] Tabs (descripción, nutrición, ingredientes)
- [x] Productos relacionados

## About SANUI Page
- [x] Historia de la marca
- [x] Valores core (vegano, sin gluten, sin azúcar)
- [x] Sección comunidad
- [x] Sección sostenibilidad
- [x] Stats section

## FAQ Page
- [x] Layout accordion
- [x] Preguntas sobre ingredientes
- [x] Preguntas sobre envíos
- [x] Preguntas sobre pedidos
- [x] Preguntas sobre nutrición
- [x] Filtros por categoría

## Shopping Cart
- [x] Drawer lateral del carrito
- [x] Gestión de items (agregar, quitar)
- [x] Controles de cantidad
- [x] Resumen del pedido con totales
- [x] Persistencia en localStorage

## Checkout Flow
- [x] Formulario de pedido (nombre, dirección, contacto)
- [x] Selector de método de pago
- [x] Cálculo de envío
- [x] Pantalla de confirmación del pedido
- [x] Validación del formulario

## State Management
- [x] Context global del carrito (CartContext)
- [x] Persistencia del carrito (localStorage)
- [x] Datos de productos (mock data con 6 productos)

## Routing
- [x] / → Home
- [x] /tienda → Store
- [x] /producto/:id → Product Page
- [x] /sobre → About
- [x] /faq → FAQ
- [x] /checkout → Checkout
- [x] Scroll to top on route change

## Tests
- [x] Tests de auth (login/logout)
- [x] Tests de datos de productos
- [x] Tests de lógica del carrito
- [x] Tests de validación del checkout

## Rediseño Visual Premium (v2)
- [ ] Generar imágenes de producto con IA (6 productos × 2 imágenes)
- [ ] Generar imágenes lifestyle (playa, gym, producto en mano)
- [ ] Subir todas las imágenes al CDN
- [ ] Actualizar datos de productos con URLs reales
- [ ] Instalar y configurar Framer Motion para animaciones
- [ ] Hero: animación 3D del producto, partículas flotantes, texto animado
- [ ] Hero: efecto parallax en scroll
- [ ] Sección valores: cards con hover 3D tilt effect
- [ ] Productos: cards con glassmorphism y hover elevado
- [ ] Bloque gym: imagen real con overlay y texto animado
- [ ] Sección lifestyle: grid de fotos reales con animaciones de entrada
- [ ] Micro-interacciones en botones (scale, glow, ripple)
- [ ] Cursor personalizado o efectos de hover avanzados
- [ ] Animaciones de entrada (fade-in, slide-up) en scroll
- [ ] Navbar con blur/glassmorphism al hacer scroll
- [ ] Floating elements decorativos (orbes, gradientes animados)

## Comunidad & Instagram (v2)
- [ ] Explorar API de Instagram MCP para @sanui.uy
- [ ] Backend: endpoint tRPC para obtener posts de Instagram
- [ ] Sección "Team SANUI" en Home con feed real de Instagram
- [ ] Página /comunidad con feed completo y stats
- [ ] Mostrar likes, comentarios y métricas reales
- [ ] CTA para seguir en Instagram integrado en feed

## Fotos reales de Instagram (v3)
- [x] Reemplazar imágenes generadas con IA por fotos reales de @sanui.uy
- [x] Obtener media URLs de carousels de Instagram para más variedad
- [x] Asignar fotos reales al hero, lifestyle, gym y productos
- [x] Actualizar Home con imágenes reales en todas las secciones
