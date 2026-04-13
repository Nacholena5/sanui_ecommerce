import { useCart } from "@/contexts/CartContext";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/tienda", label: "Tienda" },
  { href: "/comunidad", label: "Comunidad" },
  { href: "/sobre", label: "Sobre SANUI" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, toggleCart } = useCart();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isHome = location === "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isHome
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex flex-col leading-none">
                <span
                  className={`font-display text-3xl md:text-4xl tracking-widest transition-colors ${
                    scrolled || !isHome ? "text-sanui-dark" : "text-white"
                  }`}
                >
                  SANUI
                </span>
                <span
                  className={`text-[9px] font-bold uppercase tracking-[0.25em] transition-colors ${
                    scrolled || !isHome ? "text-sanui-blue" : "text-sanui-yellow"
                  }`}
                >
                  Protein Balls
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold uppercase tracking-wider transition-colors hover:text-sanui-blue relative group ${
                    location === link.href
                      ? "text-sanui-blue"
                      : scrolled || !isHome
                        ? "text-sanui-dark"
                        : "text-white"
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sanui-yellow transition-all group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Cart button */}
              <button
                onClick={toggleCart}
                className={`relative p-2 rounded-full transition-all hover:bg-sanui-blue/10 ${
                  scrolled || !isHome ? "text-sanui-dark" : "text-white"
                }`}
                aria-label="Abrir carrito"
              >
                <ShoppingCart size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-sanui-yellow text-sanui-dark text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </button>

              {/* CTA Desktop */}
              <Link
                href="/tienda"
                className="hidden md:inline-flex items-center gap-2 bg-sanui-blue text-white px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-sanui-blue-dark transition-colors"
              >
                Comprar
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`md:hidden p-2 rounded-full transition-colors ${
                  scrolled || !isHome ? "text-sanui-dark" : "text-white"
                }`}
                aria-label="Menú"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-72 bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <span className="font-display text-2xl text-sanui-dark tracking-widest">SANUI</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col p-6 gap-1 flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-3 px-4 rounded-xl text-base font-semibold uppercase tracking-wider transition-colors ${
                    location === link.href
                      ? "bg-sanui-blue text-white"
                      : "text-sanui-dark hover:bg-sanui-blue/10 hover:text-sanui-blue"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="p-6 border-t border-gray-100">
              <Link
                href="/tienda"
                className="flex items-center justify-center gap-2 bg-sanui-blue text-white px-6 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider w-full hover:bg-sanui-blue-dark transition-colors"
              >
                Ir a la Tienda
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
