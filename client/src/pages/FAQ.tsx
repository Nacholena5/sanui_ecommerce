import { ChevronDown, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // Ingredientes
  {
    category: "Ingredientes",
    question: "¿Qué ingredientes tienen las Protein Balls SANUI?",
    answer:
      "Nuestras Protein Balls están hechas con ingredientes 100% naturales: dátiles, proteína de guisante, mantequilla de frutos secos (maní, almendras o anacardo según el sabor), semillas, cacao en polvo (en el sabor chocolate), y extracto de vainilla natural. Sin aditivos, sin conservantes, sin colorantes artificiales.",
  },
  {
    category: "Ingredientes",
    question: "¿Son realmente veganas?",
    answer:
      "Sí, 100% veganas. No contienen ningún ingrediente de origen animal. Ni leche, ni huevos, ni miel. Todos nuestros productos están formulados exclusivamente con ingredientes de origen vegetal.",
  },
  {
    category: "Ingredientes",
    question: "¿Por qué dicen 'sin azúcar agregado' si tienen dátiles?",
    answer:
      "Los dátiles contienen azúcares naturales, pero no agregamos azúcar refinado ni edulcorantes artificiales. El dulzor viene únicamente de los dátiles y otros ingredientes naturales. Esto hace que el índice glucémico sea más bajo y la energía más sostenida.",
  },
  {
    category: "Ingredientes",
    question: "¿Son aptas para celíacos?",
    answer:
      "Sí. Nuestras Protein Balls están formuladas sin gluten. Usamos avena certificada sin gluten en los sabores que la incluyen. Sin embargo, si tenés celiaquía severa, te recomendamos leer la etiqueta de cada producto para verificar posibles trazas.",
  },
  {
    category: "Ingredientes",
    question: "¿Cuánta proteína tiene cada porción?",
    answer:
      "Depende del sabor, pero nuestras Protein Balls tienen entre 11g y 15g de proteína por porción (120g). El SANUI TREK es el más alto con 15g. Toda la proteína es de origen vegetal, principalmente proteína de guisante.",
  },
  // Pedidos
  {
    category: "Pedidos",
    question: "¿Cómo puedo hacer un pedido?",
    answer:
      "Podés hacer tu pedido directamente en nuestra tienda online, completando el formulario de checkout. También podés escribirnos por DM en Instagram (@sanui.uy) o por WhatsApp. Coordinamos el pago y la entrega directamente.",
  },
  {
    category: "Pedidos",
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos transferencia bancaria, Mercado Pago, efectivo en mano y próximamente tarjetas de crédito/débito. Para pedidos por DM coordinamos el método de pago que sea más cómodo para vos.",
  },
  {
    category: "Pedidos",
    question: "¿Puedo modificar o cancelar mi pedido?",
    answer:
      "Podés modificar o cancelar tu pedido hasta 24 horas después de realizarlo. Escribinos por DM o WhatsApp lo antes posible y lo gestionamos. Una vez que el pedido está en proceso de preparación, no podemos garantizar cambios.",
  },
  {
    category: "Pedidos",
    question: "¿Hacen packs o descuentos por cantidad?",
    answer:
      "Sí. Tenemos el Mix SANUI (3 sabores) con un 10% de descuento vs. compra individual. Para pedidos grandes o corporativos, escribinos y te armamos un precio especial.",
  },
  // Envíos
  {
    category: "Envíos",
    question: "¿Hacen envíos a todo Uruguay?",
    answer:
      "Sí, enviamos a todo el país. Para Montevideo y área metropolitana hacemos envíos en moto/bicicleta o coordinamos punto de encuentro. Para el interior del país enviamos por correo (OCA o similar). El costo de envío se calcula al momento del checkout.",
  },
  {
    category: "Envíos",
    question: "¿Cuánto tarda el envío?",
    answer:
      "Para Montevideo: 1-2 días hábiles. Para el interior: 3-5 días hábiles dependiendo de la zona. Te avisamos cuando tu pedido está en camino.",
  },
  {
    category: "Envíos",
    question: "¿Hay envío gratis?",
    answer:
      "Sí. Ofrecemos envío gratis en Montevideo para pedidos mayores a $1.000. Para el interior, el envío se calcula según destino. Seguí nuestro Instagram para enterarte de promociones de envío gratis.",
  },
  {
    category: "Envíos",
    question: "¿Qué pasa si mi pedido llega dañado?",
    answer:
      "Si tu pedido llega dañado o con algún problema, escribinos por DM o WhatsApp con una foto del producto. Lo resolvemos rápido: reposición o devolución, sin vueltas.",
  },
  // Nutrición
  {
    category: "Nutrición",
    question: "¿Las Protein Balls sirven para bajar de peso?",
    answer:
      "SANUI no es un producto para dieta ni para bajar de peso. Es un snack proteico real, pensado para complementar una alimentación equilibrada. La proteína ayuda a la saciedad, pero no somos un sustituto de comida ni un producto de adelgazamiento.",
  },
  {
    category: "Nutrición",
    question: "¿Cuándo es el mejor momento para comer SANUI?",
    answer:
      "Cuando quieras. Antes del gym para energía, después del gym para recuperación, a media mañana o tarde como snack, o simplemente cuando tenés hambre y querés algo rico y proteico. No hay reglas.",
  },
  {
    category: "Nutrición",
    question: "¿Son aptas para embarazadas o niños?",
    answer:
      "Nuestros ingredientes son naturales y seguros, pero siempre recomendamos consultar con un profesional de la salud antes de introducir nuevos alimentos durante el embarazo o en la dieta de niños pequeños.",
  },
  {
    category: "Nutrición",
    question: "¿Cuánto tiempo duran una vez abiertas?",
    answer:
      "Una vez abierto el pote, te recomendamos consumir las Protein Balls en un plazo de 7-10 días, guardándolas en un lugar fresco y seco o en la heladera. Sin conservantes, la frescura depende de cómo las guardes.",
  },
];

const categories = ["Ingredientes", "Pedidos", "Envíos", "Nutrición"];

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered =
    activeCategory === "Todos"
      ? faqData
      : faqData.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-sanui-dark pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sanui-blue/20 via-sanui-dark to-sanui-dark" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <span className="text-sanui-yellow text-sm font-bold uppercase tracking-widest">
            Preguntas frecuentes
          </span>
          <h1 className="font-display text-6xl md:text-7xl text-white mt-2 mb-4">
            TODO LO QUE
            <br />
            QUERÉS SABER
          </h1>
          <p className="text-gray-400 text-lg max-w-xl">
            Ingredientes, envíos, pedidos, nutrición. Si no encontrás tu respuesta, escribinos.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {["Todos", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenItem(null);
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? "bg-sanui-blue text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl">
          {filtered.map((item, index) => {
            const globalIndex = faqData.indexOf(item);
            const isOpen = openItem === globalIndex;

            return (
              <div
                key={globalIndex}
                className={`mb-3 rounded-2xl border transition-all ${
                  isOpen
                    ? "border-sanui-blue/30 bg-sanui-blue/5"
                    : "border-gray-100 bg-white hover:border-gray-200"
                }`}
              >
                <button
                  onClick={() => setOpenItem(isOpen ? null : globalIndex)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <span className="text-xs font-bold text-sanui-blue bg-sanui-blue/10 px-2.5 py-1 rounded-full flex-shrink-0 mt-0.5">
                      {item.category}
                    </span>
                    <span
                      className={`font-semibold text-base leading-snug ${
                        isOpen ? "text-sanui-blue" : "text-sanui-dark"
                      }`}
                    >
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`text-gray-400 flex-shrink-0 ml-4 transition-transform ${
                      isOpen ? "rotate-180 text-sanui-blue" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5">
                    <div className="ml-0 pl-0 border-t border-sanui-blue/10 pt-4">
                      <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-sanui-off-white rounded-3xl p-8 md:p-12 text-center max-w-2xl">
          <div className="w-16 h-16 rounded-full bg-sanui-blue/10 flex items-center justify-center mx-auto mb-4">
            <MessageCircle size={28} className="text-sanui-blue" />
          </div>
          <h3 className="font-display text-3xl text-sanui-dark mb-3">
            ¿NO ENCONTRASTE TU RESPUESTA?
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            Escribinos por DM en Instagram o por WhatsApp. Respondemos rápido.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://www.instagram.com/sanui.uy/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-sanui-dark text-white px-6 py-3.5 rounded-2xl font-bold text-sm uppercase tracking-wider hover:bg-sanui-graphite transition-colors"
            >
              Instagram @sanui.uy
            </a>
            <a
              href="mailto:hola@sanui.uy"
              className="inline-flex items-center justify-center gap-2 border-2 border-sanui-dark text-sanui-dark px-6 py-3.5 rounded-2xl font-bold text-sm uppercase tracking-wider hover:bg-sanui-dark hover:text-white transition-all"
            >
              hola@sanui.uy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
