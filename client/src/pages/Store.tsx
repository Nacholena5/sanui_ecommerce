import { useCart } from "@/contexts/CartContext";
import { categories, flavors, products } from "@/data/products";
import { Filter, Search, ShoppingCart, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Store() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFlavor, setSelectedFlavor] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { addItem } = useCart();

  const filtered = products.filter((p) => {
    const matchCat = selectedCategory === "all" || p.category === selectedCategory;
    const matchFlavor = selectedFlavor === "all" || p.flavor === selectedFlavor;
    const matchSearch =
      searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.flavor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchFlavor && matchSearch;
  });

  const hasFilters = selectedCategory !== "all" || selectedFlavor !== "all" || searchQuery !== "";

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-sanui-dark pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          <span className="text-sanui-yellow text-sm font-bold uppercase tracking-widest">
            Tienda SANUI
          </span>
          <h1 className="font-display text-6xl md:text-7xl text-white mt-2">
            BOLITAS PROTEICAS
          </h1>
          <p className="text-gray-400 text-lg mt-2">
            Veganas · Sin gluten · Sin azúcar · Hechas con intención
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-10">
        {/* Search & Filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-sanui-dark placeholder-gray-400 focus:outline-none focus:border-sanui-blue focus:ring-2 focus:ring-sanui-blue/20 text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filter toggle mobile */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden flex items-center gap-2 px-5 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-sanui-dark font-semibold text-sm"
          >
            <SlidersHorizontal size={16} />
            Filtros
            {hasFilters && (
              <span className="w-5 h-5 bg-sanui-blue text-white text-xs rounded-full flex items-center justify-center">
                !
              </span>
            )}
          </button>
        </div>

        {/* Filters */}
        <div className={`${showFilters ? "flex" : "hidden sm:flex"} flex-col sm:flex-row gap-4 mb-8`}>
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider self-center mr-1">
              Tipo:
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-sanui-dark text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="hidden sm:block w-px bg-gray-200" />

          {/* Flavors */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider self-center mr-1">
              Sabor:
            </span>
            {flavors.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFlavor(f.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedFlavor === f.id
                    ? "bg-sanui-blue text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Clear filters */}
          {hasFilters && (
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedFlavor("all");
                setSearchQuery("");
              }}
              className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 font-semibold ml-auto"
            >
              <X size={14} />
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
        </p>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Filter size={28} className="text-gray-400" />
            </div>
            <h3 className="font-bold text-sanui-dark text-xl mb-2">Sin resultados</h3>
            <p className="text-gray-500 text-sm">
              Probá con otros filtros o buscá otro sabor.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <div
                key={product.id}
                className={`bg-white rounded-3xl overflow-hidden border border-gray-100 product-card-hover group ${
                  !product.inStock ? "opacity-70" : ""
                }`}
              >
                {/* Image */}
                <Link href={`/producto/${product.id}`}>
                  <div className="relative h-60 bg-gradient-to-br from-sanui-blue/15 to-sanui-green/15 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-6">
                        <span className="font-display text-4xl text-sanui-blue block">SANUI</span>
                        <span className="text-gray-500 text-sm mt-1 block">{product.flavor}</span>
                        <span className="text-gray-400 text-xs mt-2 block">[Foto del producto]</span>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {product.badge && (
                        <span className="bg-sanui-yellow text-sanui-dark text-xs font-black px-3 py-1 rounded-full">
                          {product.badge}
                        </span>
                      )}
                      {!product.inStock && (
                        <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Sin stock
                        </span>
                      )}
                    </div>

                    {/* Protein badge */}
                    <div className="absolute top-3 right-3 bg-sanui-dark/80 text-sanui-yellow text-xs font-black px-2.5 py-1 rounded-full">
                      {product.protein}g prot.
                    </div>
                  </div>
                </Link>

                {/* Info */}
                <div className="p-5">
                  <Link href={`/producto/${product.id}`}>
                    <h3 className="font-bold text-sanui-dark text-lg hover:text-sanui-blue transition-colors leading-tight">
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
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-2xl text-sanui-dark">
                          ${product.price.toLocaleString("es-UY")}
                        </span>
                        {product.originalPrice && (
                          <span className="text-gray-400 text-sm line-through">
                            ${product.originalPrice.toLocaleString("es-UY")}
                          </span>
                        )}
                      </div>
                      <span className="text-gray-400 text-xs">{product.weight}</span>
                    </div>

                    {product.inStock ? (
                      <button
                        onClick={() => addItem(product, 1, product.flavor)}
                        className="flex items-center gap-2 bg-sanui-blue text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-sanui-blue-dark transition-colors"
                      >
                        <ShoppingCart size={14} />
                        Agregar
                      </button>
                    ) : (
                      <span className="text-gray-400 text-xs font-semibold">Próximamente</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
