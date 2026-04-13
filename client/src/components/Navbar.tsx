import { useCart } from "@/contexts/CartContext";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
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
  const isTransparent = isHome && !scrolled;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-white/20"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                className="flex flex-col leading-none"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span
                  className={`font-display text-3xl md:text-4xl tracking-widest transition-colors duration-300 ${
                    isTransparent ? "text-white" : "text-sanui-dark"
                  }`}
                >
                  SANUI
                </span>
                <span
                  className={`text-[9px] font-bold uppercase tracking-[0.25em] transition-colors duration-300 ${
                    isTransparent ? "text-sanui-yellow" : "text-sanui-blue"
                  }`}
                >
                  Bolitas Proteicas
                </span>
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-200 hover:text-sanui-blue relative group ${
                    location === link.href
                      ? "text-sanui-blue"
                      : isTransparent
                        ? "text-white/90"
                        : "text-sanui-dark"
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sanui-yellow transition-all duration-300 group-hover:w-full" />
                  {location === link.href && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-sanui-blue"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Cart button */}
              <motion.button
                onClick={toggleCart}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`relative p-2 rounded-full transition-all hover:bg-sanui-blue/10 ${
                  isTransparent ? "text-white" : "text-sanui-dark"
                }`}
                aria-label="Abrir carrito"
              >
                <ShoppingCart size={22} />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key="cart-badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-sanui-yellow text-sanui-dark text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center"
                    >
                      {totalItems > 9 ? "9+" : totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* CTA Desktop */}
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/tienda"
                  className="hidden md:inline-flex items-center gap-2 bg-sanui-blue text-white px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-sanui-blue-dark transition-colors shadow-md shadow-sanui-blue/30"
                >
                  Comprar
                </Link>
              </motion.div>

              {/* Hamburger */}
              <motion.button
                onClick={() => setMenuOpen(!menuOpen)}
                whileTap={{ scale: 0.9 }}
                className={`md:hidden p-2 rounded-full transition-colors ${
                  isTransparent ? "text-white" : "text-sanui-dark"
                }`}
                aria-label="Menú"
              >
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute top-0 right-0 h-full w-72 bg-white shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <span className="font-display text-2xl text-sanui-dark tracking-widest">SANUI</span>
                <button onClick={() => setMenuOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex flex-col p-6 gap-1 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={`block py-3 px-4 rounded-xl text-base font-semibold uppercase tracking-wider transition-colors ${
                        location === link.href
                          ? "bg-sanui-blue text-white"
                          : "text-sanui-dark hover:bg-sanui-blue/10 hover:text-sanui-blue"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
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
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
