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
- [x] Fotos reales de Instagram en lugar de IA
- [x] Instalar y configurar Framer Motion para animaciones
- [x] Hero: texto animado con stagger, orbes pulsantes
- [x] Sección valores: cards con hover 3D (motion.div)
- [x] Productos: cards con hover elevado (y: -8)
- [x] Sección lifestyle: FadeIn desde izquierda/derecha
- [x] Sección gym: FadeIn con delay
- [x] Micro-interacciones en botones (scale, spring)
- [x] Animaciones de entrada (FadeIn helper con useInView)
- [x] Navbar con glassmorphism al hacer scroll
- [x] Navbar mobile: slide-in + stagger en links
- [x] Orbes animados en hero (pulse/breathe loop)

## Comunidad & Instagram (v2)
- [x] Explorar API de Instagram MCP para @sanui.uy
- [x] Backend: endpoint tRPC para obtener posts de Instagram
- [x] Sección "Team SANUI" en Home con feed real de Instagram
- [x] Página /comunidad con feed completo y stats
- [x] Mostrar likes, comentarios y métricas reales
- [x] CTA para seguir en Instagram integrado en feed

## Fotos reales de Instagram (v3)
- [x] Reemplazar imágenes generadas con IA por fotos reales de @sanui.uy
- [x] Obtener media URLs de carousels de Instagram para más variedad
- [x] Asignar fotos reales al hero, lifestyle, gym y productos
- [x] Actualizar Home con imágenes reales en todas las secciones
