import { useCart } from "@/contexts/CartContext";
import { products } from "@/data/products";
import { ArrowRight, CheckCircle2, ChevronRight, Leaf, ShieldCheck, Star, Zap } from "lucide-react";
import { Link } from "wouter";

// ─── Hero Section ────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-sanui-dark">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-sanui-blue/30 via-sanui-dark to-sanui-dark" />

      {/* Decorative circles */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-sanui-blue/10 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-sanui-green/10 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-sanui-yellow/20 border border-sanui-yellow/40 text-sanui-yellow px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Zap size={12} />
              Protein Balls Veganas · Uruguay 🇺🇾
            </div>

            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl text-white leading-none mb-4">
              RICO.
              <br />
              <span className="text-sanui-yellow">PRÁCTICO.</span>
              <br />
              <span className="text-sanui-blue">SANUI.</span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-md">
              Protein balls con personalidad. Veganas, sin gluten y sin azúcar.
              El snack que tu rutina necesitaba.
            </p>

            {/* Values pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {["Vegano", "Sin gluten", "Sin azúcar", "12g+ proteína"].map((v) => (
                <span
                  key={v}
                  className="flex items-center gap-1.5 bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full"
                >
                  <CheckCircle2 size={12} className="text-sanui-green" />
                  {v}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/tienda"
                className="inline-flex items-center justify-center gap-2 bg-sanui-blue text-white px-8 py-4 rounded-2xl font-bold text-base uppercase tracking-wider hover:bg-sanui-blue-dark transition-all hover:scale-105 shadow-lg shadow-sanui-blue/30"
              >
                Comprar ahora
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/sobre"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-base uppercase tracking-wider hover:border-sanui-yellow hover:text-sanui-yellow transition-all"
              >
                Nuestra historia
              </Link>
            </div>
          </div>

          {/* Product visual */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* Main product placeholder */}
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden animate-float shadow-2xl shadow-sanui-blue/20">
                <div className="w-full h-full bg-gradient-to-br from-sanui-blue via-sanui-blue-dark to-sanui-dark flex flex-col items-center justify-center gap-4 p-8">
                  <div className="text-center">
                    <span className="font-display text-5xl text-sanui-yellow tracking-widest block">
                      SANUI
                    </span>
                    <span className="text-white/60 text-xs uppercase tracking-widest block mt-1">
                      Protein Balls
                    </span>
                  </div>
                  <div className="w-32 h-32 rounded-full bg-white/10 border-2 border-sanui-yellow/40 flex items-center justify-center">
                    <div className="text-center">
                      <span className="font-display text-3xl text-white block">120g</span>
                      <span className="text-sanui-green text-xs font-bold block">VEGANO</span>
                    </div>
                  </div>
                  <p className="text-white/50 text-xs text-center">
                    [Foto real del producto]
                  </p>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-sanui-yellow text-sanui-dark px-4 py-2 rounded-2xl font-black text-sm shadow-lg rotate-3">
                12g proteína
              </div>
              <div className="absolute -bottom-4 -left-4 bg-sanui-green text-white px-4 py-2 rounded-2xl font-black text-sm shadow-lg -rotate-2">
                Sin azúcar 🌿
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}

// ─── Values Section ──────────────────────────────────────────────────────────
function ValuesSection() {
  const values = [
    {
      icon: <Leaf size={28} className="text-sanui-green" />,
      title: "100% Vegano",
      description: "Ingredientes de origen vegetal. Sin comprometer el sabor ni la proteína.",
    },
    {
      icon: <ShieldCheck size={28} className="text-sanui-blue" />,
      title: "Sin Gluten",
      description: "Apto para celíacos y para todos los que eligen comer mejor.",
    },
    {
      icon: <CheckCircle2 size={28} className="text-sanui-yellow" />,
      title: "Sin Azúcar Agregado",
      description: "Dulce natural de los dátiles. Sin azúcar refinado, sin culpa.",
    },
    {
      icon: <Zap size={28} className="text-sanui-blue" />,
      title: "12g+ de Proteína",
      description: "Proteína real para una rutina real. Gym, trabajo o donde sea.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-sanui-blue text-sm font-bold uppercase tracking-widest">
            Por qué SANUI
          </span>
          <h2 className="font-display text-5xl md:text-6xl text-sanui-dark mt-2">
            PROTEÍNA CON PERSONALIDAD
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl border border-gray-100 hover:border-sanui-blue/30 hover:shadow-lg transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gray-50 group-hover:bg-sanui-blue/10 flex items-center justify-center mb-4 transition-colors">
                {v.icon}
              </div>
              <h4 className="font-bold text-sanui-dark text-lg mb-2">{v.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Featured Products ────────────────────────────────────────────────────────
function FeaturedProducts() {
  const { addItem } = useCart();
  const featured = products.filter((p) => p.inStock).slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-sanui-off-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-sanui-green text-sm font-bold uppercase tracking-widest">
              Nuestros productos
            </span>
            <h2 className="font-display text-5xl md:text-6xl text-sanui-dark mt-2">
              ELIGE TU FAVORITA
            </h2>
          </div>
          <Link
            href="/tienda"
            className="flex items-center gap-2 text-sanui-blue font-bold text-sm uppercase tracking-wider hover:gap-3 transition-all"
          >
            Ver todos <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden product-card-hover group"
            >
              {/* Image */}
              <Link href={`/producto/${product.id}`}>
                <div className="relative h-56 bg-gradient-to-br from-sanui-blue/20 to-sanui-green/20 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4">
                      <span className="font-display text-3xl text-sanui-blue block">SANUI</span>
                      <span className="text-gray-500 text-xs">{product.flavor}</span>
                      <p className="text-gray-400 text-xs mt-2">[Foto del producto]</p>
                    </div>
                  </div>
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-sanui-yellow text-sanui-dark text-xs font-black px-3 py-1 rounded-full">
                      {product.badge}
                    </div>
                  )}
                </div>
              </Link>

              {/* Info */}
              <div className="p-5">
                <Link href={`/producto/${product.id}`}>
                  <h3 className="font-bold text-sanui-dark text-lg hover:text-sanui-blue transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-gray-500 text-sm mt-1 mb-3">{product.shortDescription}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {product.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-sanui-green/10 text-sanui-green font-semibold px-2.5 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-display text-2xl text-sanui-dark">
                      ${product.price.toLocaleString("es-UY")}
                    </span>
                    <span className="text-gray-400 text-xs ml-1">{product.weight}</span>
                  </div>
                  <button
                    onClick={() => addItem(product, 1, product.flavor)}
                    className="bg-sanui-blue text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-sanui-blue-dark transition-colors"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Lifestyle Section ────────────────────────────────────────────────────────
function LifestyleSection() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <span className="text-sanui-blue text-sm font-bold uppercase tracking-widest">
              Lifestyle
            </span>
            <h2 className="font-display text-5xl md:text-6xl text-sanui-dark mt-2 mb-6">
              ENERGÍA QUE
              <br />
              <span className="text-sanui-blue">SE DISFRUTA</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Playa, gym, trabajo o donde sea. SANUI va con vos. Proteína real,
              ingredientes simples, sabor que acompaña tu día.
            </p>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              No es solo un snack. Es rendimiento. Es practicidad. Es SANUI.
            </p>
            <Link
              href="/tienda"
              className="inline-flex items-center gap-2 bg-sanui-dark text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider hover:bg-sanui-graphite transition-colors"
            >
              Ver productos <ArrowRight size={18} />
            </Link>
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="h-48 rounded-3xl bg-gradient-to-br from-sanui-blue/30 to-sanui-blue/10 flex flex-col items-center justify-center p-4 text-center">
                <span className="text-sanui-blue font-bold text-sm">☀️ Verano</span>
                <span className="text-gray-400 text-xs mt-1">[Foto lifestyle playa]</span>
              </div>
              <div className="h-64 rounded-3xl bg-gradient-to-br from-sanui-green/30 to-sanui-green/10 flex flex-col items-center justify-center p-4 text-center">
                <span className="text-sanui-green font-bold text-sm">🌿 Natural</span>
                <span className="text-gray-400 text-xs mt-1">[Foto producto en mano]</span>
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="h-64 rounded-3xl bg-gradient-to-br from-sanui-yellow/30 to-sanui-yellow/10 flex flex-col items-center justify-center p-4 text-center">
                <span className="text-yellow-600 font-bold text-sm">⚡ Energía</span>
                <span className="text-gray-400 text-xs mt-1">[Foto producto activo]</span>
              </div>
              <div className="h-48 rounded-3xl bg-gradient-to-br from-sanui-kraft/50 to-sanui-kraft/20 flex flex-col items-center justify-center p-4 text-center">
                <span className="text-sanui-kraft-dark font-bold text-sm">🎯 Rutina</span>
                <span className="text-gray-400 text-xs mt-1">[Foto lifestyle]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Gym / Dark Section ───────────────────────────────────────────────────────
function GymSection() {
  return (
    <section className="py-16 md:py-24 bg-sanui-dark relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sanui-blue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-sanui-green/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Gym photo placeholder */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 h-56 rounded-3xl bg-gradient-to-br from-sanui-graphite to-sanui-dark border border-white/10 flex flex-col items-center justify-center p-6 text-center">
              <span className="text-white font-bold text-base mb-1">💪 Gym</span>
              <span className="text-gray-500 text-sm">[Foto en gimnasio con producto]</span>
            </div>
            <div className="h-40 rounded-3xl bg-gradient-to-br from-sanui-blue/20 to-sanui-blue/5 border border-sanui-blue/20 flex flex-col items-center justify-center p-4 text-center">
              <span className="text-sanui-blue font-bold text-sm">🏃 Activo</span>
              <span className="text-gray-600 text-xs mt-1">[Foto running]</span>
            </div>
            <div className="h-40 rounded-3xl bg-gradient-to-br from-sanui-green/20 to-sanui-green/5 border border-sanui-green/20 flex flex-col items-center justify-center p-4 text-center">
              <span className="text-sanui-green font-bold text-sm">🎯 Rendimiento</span>
              <span className="text-gray-600 text-xs mt-1">[Foto entrenamiento]</span>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="text-sanui-yellow text-sm font-bold uppercase tracking-widest">
              Rendimiento
            </span>
            <h2 className="font-display text-5xl md:text-6xl text-white mt-2 mb-6">
              NO ES SOLO
              <br />
              UN SNACK.
              <br />
              <span className="text-sanui-blue">ES RENDIMIENTO.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Antes del gym, después del gym, en el trabajo o en la cancha.
              SANUI está hecho para los que no paran.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { value: "12g+", label: "Proteína" },
                { value: "0", label: "Azúcar agregado" },
                { value: "100%", label: "Vegano" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-3xl text-sanui-yellow">{stat.value}</div>
                  <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <Link
              href="/tienda"
              className="inline-flex items-center gap-2 bg-sanui-blue text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider hover:bg-sanui-blue-dark transition-all hover:scale-105"
            >
              Comprar ahora <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Social Proof Section ─────────────────────────────────────────────────────
function SocialProofSection() {
  const reviews = [
    {
      name: "Valentina R.",
      text: "Las mejores protein balls que probé. El sabor chocolate es una locura. Ya pedí 3 veces.",
      rating: 5,
    },
    {
      name: "Matías G.",
      text: "Las llevo al gym todos los días. Prácticas, ricas y con proteína de verdad. SANUI es diferente.",
      rating: 5,
    },
    {
      name: "Lucía F.",
      text: "Por fin un snack saludable que no sabe a cartón. El de coco y limón es mi favorito.",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-sanui-off-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-sanui-blue text-sm font-bold uppercase tracking-widest">
            Comunidad SANUI
          </span>
          <h2 className="font-display text-5xl md:text-6xl text-sanui-dark mt-2">
            LO DICEN ELLOS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl shadow-sm">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} size={16} className="fill-sanui-yellow text-sanui-yellow" />
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">"{r.text}"</p>
              <p className="font-bold text-sanui-dark text-sm">— {r.name}</p>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm mb-4">
            Seguinos en Instagram y compartí tu SANUI
          </p>
          <a
            href="https://www.instagram.com/sanui.uy/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-sanui-dark text-sanui-dark px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-sanui-dark hover:text-white transition-all"
          >
            @sanui.uy en Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA Section ────────────────────────────────────────────────────────
function FinalCTASection() {
  return (
    <section className="py-16 md:py-24 bg-sanui-blue relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sanui-blue via-sanui-blue to-sanui-blue-dark" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
        <h2 className="font-display text-6xl md:text-8xl text-white mb-4">
          SNACK PROTEICO
          <br />
          <span className="text-sanui-yellow">PARA UNA</span>
          <br />
          RUTINA REAL.
        </h2>
        <p className="text-white/80 text-lg md:text-xl mb-10 max-w-xl mx-auto">
          Pedí por DM o comprá directo acá. Envíos a todo Uruguay.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/tienda"
            className="inline-flex items-center justify-center gap-2 bg-sanui-yellow text-sanui-dark px-10 py-5 rounded-2xl font-black text-base uppercase tracking-wider hover:bg-white transition-all hover:scale-105 shadow-xl"
          >
            Ir a la tienda <ArrowRight size={20} />
          </Link>
          <a
            href="https://www.instagram.com/sanui.uy/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white px-10 py-5 rounded-2xl font-bold text-base uppercase tracking-wider hover:border-white hover:bg-white/10 transition-all"
          >
            Seguir en Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Main Home Component ──────────────────────────────────────────────────────
export default function Home() {
  return (
    <div>
      <HeroSection />
      <ValuesSection />
      <FeaturedProducts />
      <LifestyleSection />
      <GymSection />
      <SocialProofSection />
      <FinalCTASection />
    </div>
  );
}
