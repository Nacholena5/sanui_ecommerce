import { ArrowRight, Heart, Leaf, Recycle, ShieldCheck, Users, Zap } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-sanui-dark pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sanui-blue/20 via-sanui-dark to-sanui-dark" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-sanui-green/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <span className="text-sanui-yellow text-sm font-bold uppercase tracking-widest">
            Sobre nosotros
          </span>
          <h1 className="font-display text-6xl md:text-8xl text-white mt-2 mb-6">
            SOMOS
            <br />
            <span className="text-sanui-blue">SANUI.</span>
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl leading-relaxed">
            Una marca uruguaya que nació de una idea simple: comer rico, comer bien y no
            complicarse. Bolitas proteicas con 20g de proteína. Snacks hechos con intención.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Photo placeholder */}
            <div className="relative">
              <div className="h-80 md:h-[500px] rounded-3xl bg-gradient-to-br from-sanui-blue/20 to-sanui-green/20 flex flex-col items-center justify-center p-8 text-center">
                <span className="font-display text-5xl text-sanui-blue block mb-4">SANUI</span>
                <span className="text-gray-500 text-sm">[Foto del equipo / fundadores]</span>
                <span className="text-gray-400 text-xs mt-2">
                  Foto real del equipo SANUI en Montevideo
                </span>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-sanui-yellow text-sanui-dark px-6 py-3 rounded-2xl font-black text-sm shadow-lg rotate-2">
                Hecho en Uruguay 🇺🇾
              </div>
            </div>

            {/* Text */}
            <div>
              <span className="text-sanui-blue text-sm font-bold uppercase tracking-widest">
                Nuestra historia
              </span>
              <h2 className="font-display text-5xl md:text-6xl text-sanui-dark mt-2 mb-6">
                TODO EMPEZÓ
                <br />
                CON UNA IDEA
              </h2>
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                <p>
                  SANUI nació en Montevideo con una misión clara: crear snacks proteicos que
                  realmente valgan la pena. No suplementos genéricos, no barras sin sabor. Bolitas
                  proteicas con 20g de proteína, hechas con ingredientes reales y sin comprometer el gusto.
                </p>
                <p>
                  Somos una marca joven, activa y visual. Nos importa lo que ponemos en cada tarro
                  tanto como la experiencia de abrirlo. Cada bolita es pensada, probada y perfeccionada
                  antes de llegar a tus manos.
                </p>
                <p>
                  Creemos que comer bien no tiene que ser aburrido, clínico ni un sacrificio. Por eso
                  SANUI existe: para que el snack proteico sea algo que esperas, no algo que tolerás.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-sanui-off-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-sanui-green text-sm font-bold uppercase tracking-widest">
              Nuestros valores
            </span>
            <h2 className="font-display text-5xl md:text-6xl text-sanui-dark mt-2">
              LO QUE NOS DEFINE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Leaf size={32} className="text-sanui-green" />,
                title: "100% Vegano",
                description:
                  "Todos nuestros productos son de origen vegetal. Sin ingredientes animales, sin comprometer el sabor ni la proteína. Bueno para vos, bueno para el planeta.",
                color: "from-sanui-green/20 to-sanui-green/5",
                border: "border-sanui-green/20",
              },
              {
                icon: <ShieldCheck size={32} className="text-sanui-blue" />,
                title: "Sin Gluten",
                description:
                  "Certificados sin gluten. Aptos para celíacos y para todos los que eligen comer mejor. Ingredientes seleccionados, procesos cuidados.",
                color: "from-sanui-blue/20 to-sanui-blue/5",
                border: "border-sanui-blue/20",
              },
              {
                icon: <Zap size={32} className="text-sanui-yellow" />,
                title: "20g de Proteína",
                description:
                  "Cada porción tiene 20g de proteína de whey vegano de Cibeles. Energía real para tu rutina diaria.",
                color: "from-sanui-yellow/20 to-sanui-yellow/5",
                border: "border-sanui-yellow/30",
              },
            ].map((v, i) => (
              <div
                key={i}
                className={`p-8 rounded-3xl bg-gradient-to-br ${v.color} border ${v.border}`}
              >
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm">
                  {v.icon}
                </div>
                <h3 className="font-display text-3xl text-sanui-dark mb-3">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>

          {/* Nuevo valor: Sin azúcar */}
          <div className="mt-8">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-sanui-yellow/20 to-sanui-yellow/5 border border-sanui-yellow/30">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm">
                <Leaf size={32} className="text-sanui-yellow" />
              </div>
              <h3 className="font-display text-3xl text-sanui-dark mb-3">Sin Azúcar Agregado</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                El dulce viene de los dátiles, no del azúcar refinado. Natural, real y sin culpa. Porque el cuerpo merece lo mejor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 md:py-24 bg-sanui-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sanui-blue/10 via-sanui-dark to-sanui-dark" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sanui-yellow text-sm font-bold uppercase tracking-widest">
                Comunidad
              </span>
              <h2 className="font-display text-5xl md:text-6xl text-white mt-2 mb-6">
                SOMOS TODOS
                <br />
                <span className="text-sanui-blue">TEAM SANUI</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                SANUI no es solo un producto, es una comunidad. Gente activa, gente que cuida lo
                que come, gente que no se conforma con el snack genérico.
              </p>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                Seguinos en Instagram, compartí tu SANUI y formá parte del equipo. Cada post,
                cada historia, cada DM es parte de lo que somos.
              </p>
              <a
                href="https://www.instagram.com/sanui.uy/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-sanui-blue text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider hover:bg-sanui-blue-dark transition-all"
              >
                @sanui.uy <ArrowRight size={18} />
              </a>
            </div>

            {/* Community photo grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "👥 Comunidad", sub: "[Foto comunidad gym]" },
                { label: "🏃 Activos", sub: "[Foto running/deporte]" },
                { label: "🌊 Verano", sub: "[Foto playa lifestyle]" },
                { label: "💪 Rendimiento", sub: "[Foto entrenamiento]" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="h-40 rounded-3xl bg-sanui-graphite border border-white/10 flex flex-col items-center justify-center p-4 text-center"
                >
                  <span className="text-white font-bold text-sm">{item.label}</span>
                  <span className="text-gray-600 text-xs mt-1">{item.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Sustainability photo */}
            <div className="h-72 rounded-3xl bg-gradient-to-br from-sanui-green/20 to-sanui-green/5 border border-sanui-green/20 flex flex-col items-center justify-center p-8 text-center">
              <Recycle size={48} className="text-sanui-green mb-4" />
              <span className="font-display text-3xl text-sanui-dark">RECICLA SANUI</span>
              <span className="text-gray-500 text-sm mt-2">[Foto packaging reciclable]</span>
            </div>

            <div>
              <span className="text-sanui-green text-sm font-bold uppercase tracking-widest">
                Sostenibilidad
              </span>
              <h2 className="font-display text-5xl md:text-6xl text-sanui-dark mt-2 mb-6">
                RECICLA
                <br />
                <span className="text-sanui-green">CON SANUI</span>
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                Nuestros potes son reciclables. Creemos que un snack responsable no termina en la
                basura. Te invitamos a reciclar, reutilizar y ser parte del cambio.
              </p>
              <div className="space-y-3">
                {[
                  "Packaging reciclable",
                  "Ingredientes de origen vegetal",
                  "Producción local en Uruguay",
                  "Lotes pequeños para menos desperdicio",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-sanui-green/20 flex items-center justify-center flex-shrink-0">
                      <Leaf size={12} className="text-sanui-green" />
                    </div>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-sanui-blue">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "100%", label: "Vegano" },
              { value: "0g", label: "Azúcar agregado" },
              { value: "20g", label: "Proteína" },
              { value: "🇺🇾", label: "Hecho en Uruguay" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-4xl md:text-5xl text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="font-display text-5xl md:text-6xl text-sanui-dark mb-4">
            LISTO PARA PROBAR SANUI?
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            Bolitas proteicas veganas, sin gluten y sin azúcar. Hechas con intención.
          </p>
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 bg-sanui-blue text-white px-10 py-5 rounded-2xl font-bold text-base uppercase tracking-wider hover:bg-sanui-blue-dark transition-all hover:scale-105 shadow-lg shadow-sanui-blue/30"
          >
            Ver productos <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
