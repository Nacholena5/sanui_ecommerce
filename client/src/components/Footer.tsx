import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-sanui-dark text-white">
      {/* Main footer */}
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <span className="font-display text-4xl tracking-widest text-white">SANUI</span>
              <p className="text-sanui-yellow text-xs font-bold uppercase tracking-[0.25em] mt-0.5">
                Bolitas Proteicas
              </p>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Snacks proteicos veganos, sin gluten y sin azúcar. Hechos con ingredientes reales
              para una rutina real.
            </p>
            {/* Values badges */}
            <div className="flex flex-wrap gap-2">
              {["Vegano", "Sin gluten", "Sin azúcar"].map((v) => (
                <span
                  key={v}
                  className="text-xs font-bold px-3 py-1 rounded-full border border-sanui-green/40 text-sanui-green"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-5">
              Navegación
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { href: "/", label: "Inicio" },
                { href: "/tienda", label: "Tienda" },
                { href: "/sobre", label: "Sobre SANUI" },
                { href: "/faq", label: "Preguntas frecuentes" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-sanui-yellow text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-5">
              Productos
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { href: "/producto/pb-chocolate", label: "Bolitas Proteicas Chocolate" },
                { href: "/producto/pb-vainilla", label: "Bolitas Proteicas Vainilla" },
                { href: "/producto/pb-pack-2x", label: "Pack 2x Bolitas Proteicas" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-sanui-yellow text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-5">
              Contacto
            </h4>
            <ul className="flex flex-col gap-4 mb-6">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-sanui-blue mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  La Blanqueada, Montevideo, Uruguay
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-sanui-blue flex-shrink-0" />
                <a
                  href="mailto:hola@sanui.uy"
                  className="text-gray-400 hover:text-sanui-yellow text-sm transition-colors"
                >
                  hola@sanui.uy
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={16} className="text-sanui-green flex-shrink-0" />
                <a
                  href="https://wa.me/59892435222"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-sanui-yellow text-sm transition-colors"
                >
                  WhatsApp / DM
                </a>
              </li>
            </ul>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/sanui.uy/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-sanui-blue transition-colors"
                aria-label="Instagram SANUI"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/59892435222"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-sanui-green transition-colors"
                aria-label="WhatsApp SANUI"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} SANUI. Todos los derechos reservados.
          </p>
          <p className="text-gray-600 text-xs">
            Hecho con 💛 en Montevideo, Uruguay 🇺🇾
          </p>
        </div>
      </div>
    </footer>
  );
}
