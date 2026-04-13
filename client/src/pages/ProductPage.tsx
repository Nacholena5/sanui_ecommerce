import { useCart } from "@/contexts/CartContext";
import { getProductById, getRelatedProducts } from "@/data/products";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "wouter";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const product = getProductById(params.id || "");
  const related = getRelatedProducts(params.id || "");
  const { addItem } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState(product?.flavor || "");
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-20">
        <div className="text-center">
          <h2 className="font-display text-4xl text-sanui-dark mb-4">Producto no encontrado</h2>
          <Link
            href="/tienda"
            className="text-sanui-blue font-bold hover:underline"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity, selectedFlavor);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="pt-20 pb-4 bg-sanui-off-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-sanui-blue transition-colors">
              Inicio
            </Link>
            <ChevronRight size={14} />
            <Link href="/tienda" className="hover:text-sanui-blue transition-colors">
              Tienda
            </Link>
            <ChevronRight size={14} />
            <span className="text-sanui-dark font-semibold">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-10">
        {/* Back button */}
        <Link
          href="/tienda"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-sanui-blue transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Volver a la tienda
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <div>
            {/* Main image */}
            <div className="relative h-80 md:h-[480px] rounded-3xl overflow-hidden bg-gradient-to-br from-sanui-blue/20 to-sanui-green/20 mb-4">
              <img
                src={product.images[selectedImage]}
                alt={`${product.name} - imagen ${selectedImage + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              {/* Placeholder content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <span className="font-display text-6xl text-sanui-blue block">SANUI</span>
                  <span className="text-gray-500 text-lg mt-2 block">{product.flavor}</span>
                  <span className="text-gray-400 text-sm mt-2 block">
                    [Foto {selectedImage + 1} del producto]
                  </span>
                </div>
              </div>

              {/* Navigation arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === 0 ? product.images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === product.images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 bg-sanui-yellow text-sanui-dark text-sm font-black px-4 py-1.5 rounded-full">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 bg-sanui-blue/10 flex items-center justify-center ${
                    selectedImage === i
                      ? "border-sanui-blue shadow-md"
                      : "border-gray-200 hover:border-sanui-blue/50"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Vista ${i + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <span className="text-sanui-blue text-xs font-bold">{i + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-sanui-green/10 text-sanui-green font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-display text-4xl md:text-5xl text-sanui-dark mb-2">
              {product.name}
            </h1>
            <p className="text-gray-500 text-lg mb-4">{product.shortDescription}</p>

            {/* Rating placeholder */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-sanui-yellow text-sanui-yellow" />
                ))}
              </div>
              <span className="text-sm text-gray-500">5.0 · 48 reseñas</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-4xl text-sanui-dark">
                ${product.price.toLocaleString("es-UY")}
              </span>
              {product.originalPrice && (
                <span className="text-gray-400 text-xl line-through">
                  ${product.originalPrice.toLocaleString("es-UY")}
                </span>
              )}
              <span className="text-gray-500 text-sm">/ {product.weight}</span>
            </div>

            {/* Flavor selector */}
            <div className="mb-6">
              <label className="text-sm font-bold text-sanui-dark uppercase tracking-wider block mb-3">
                Sabor: <span className="text-sanui-blue normal-case">{selectedFlavor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {[product.flavor].map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFlavor(f)}
                    className={`px-5 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                      selectedFlavor === f
                        ? "border-sanui-blue bg-sanui-blue text-white"
                        : "border-gray-200 text-gray-600 hover:border-sanui-blue/50"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="text-sm font-bold text-sanui-dark uppercase tracking-wider block mb-3">
                Cantidad
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-gray-100 rounded-2xl p-1.5">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all hover:text-sanui-blue"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-bold text-lg text-sanui-dark">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all hover:text-sanui-blue"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-gray-500 text-sm">
                  Total:{" "}
                  <strong className="text-sanui-dark">
                    ${(product.price * quantity).toLocaleString("es-UY")}
                  </strong>
                </span>
              </div>
            </div>

            {/* Add to cart */}
            {product.inStock ? (
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-3 py-4 px-8 rounded-2xl font-bold text-base uppercase tracking-wider transition-all ${
                    addedToCart
                      ? "bg-sanui-green text-white"
                      : "bg-sanui-blue text-white hover:bg-sanui-blue-dark hover:scale-105 shadow-lg shadow-sanui-blue/30"
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <CheckCircle2 size={20} />
                      ¡Agregado!
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} />
                      Agregar al carrito
                    </>
                  )}
                </button>
                <Link
                  href="/checkout"
                  onClick={() => addItem(product, quantity, selectedFlavor)}
                  className="flex items-center justify-center gap-2 bg-sanui-dark text-white py-4 px-8 rounded-2xl font-bold text-base uppercase tracking-wider hover:bg-sanui-graphite transition-colors"
                >
                  Comprar ya
                </Link>
              </div>
            ) : (
              <div className="mb-8 p-4 bg-gray-100 rounded-2xl text-center">
                <p className="text-gray-500 font-semibold">Sin stock por el momento</p>
                <p className="text-gray-400 text-sm mt-1">Escribinos por DM para avisarte</p>
              </div>
            )}

            {/* Nutrition highlights */}
            <div className="bg-sanui-off-white rounded-3xl p-6 mb-6">
              <h4 className="font-bold text-sanui-dark text-sm uppercase tracking-wider mb-4">
                Highlights nutricionales
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {product.nutritionHighlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-sanui-green flex-shrink-0" />
                    <span className="text-sm text-gray-700">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Values icons */}
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Leaf size={16} className="text-sanui-green" />
                Vegano
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <ShieldCheck size={16} className="text-sanui-blue" />
                Sin gluten
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Zap size={16} className="text-sanui-yellow" />
                Sin azúcar
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <ProductDetails product={product} />

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-4xl text-sanui-dark mb-8">TAMBIÉN TE PUEDE GUSTAR</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/producto/${rp.id}`}
                  className="block bg-white rounded-3xl border border-gray-100 overflow-hidden product-card-hover group"
                >
                  <div className="h-48 bg-gradient-to-br from-sanui-blue/15 to-sanui-green/15 flex items-center justify-center">
                    <div className="text-center p-4">
                      <span className="font-display text-3xl text-sanui-blue block">SANUI</span>
                      <span className="text-gray-500 text-sm">{rp.flavor}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-sanui-dark group-hover:text-sanui-blue transition-colors">
                      {rp.name}
                    </h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-display text-xl text-sanui-dark">
                        ${rp.price.toLocaleString("es-UY")}
                      </span>
                      <span className="text-xs text-sanui-green font-semibold">{rp.weight}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Product Details Component ────────────────────────────────────────────────
function ProductDetails({ product }: { product: ReturnType<typeof getProductById> }) {
  const [activeTab, setActiveTab] = useState<"description" | "nutrition" | "ingredients">(
    "description"
  );

  if (!product) return null;

  const tabs = [
    { id: "description" as const, label: "Descripción" },
    { id: "nutrition" as const, label: "Nutrición" },
    { id: "ingredients" as const, label: "Ingredientes" },
  ];

  return (
    <div className="border-t border-gray-100 pt-12">
      {/* Tab buttons */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-2xl w-fit mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${
              activeTab === tab.id
                ? "bg-white text-sanui-dark shadow-sm"
                : "text-gray-500 hover:text-sanui-dark"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "description" && (
        <div className="max-w-2xl">
          <p className="text-gray-700 text-base leading-relaxed">{product.description}</p>
        </div>
      )}

      {activeTab === "nutrition" && (
        <div className="max-w-md">
          <h4 className="font-bold text-sanui-dark mb-4">
            Información nutricional por porción ({product.weight})
          </h4>
          <div className="bg-sanui-off-white rounded-3xl overflow-hidden">
            {[
              { label: "Proteína", value: `${product.protein}g`, highlight: true },
              { label: "Calorías", value: `${product.calories} kcal`, highlight: false },
              { label: "Carbohidratos", value: `${product.carbs}g`, highlight: false },
              { label: "Grasas", value: `${product.fat}g`, highlight: false },
              { label: "Fibra", value: `${product.fiber}g`, highlight: false },
            ].map((row, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-6 py-3.5 ${
                  i < 4 ? "border-b border-gray-200" : ""
                } ${row.highlight ? "bg-sanui-blue/10" : ""}`}
              >
                <span
                  className={`text-sm ${row.highlight ? "font-bold text-sanui-blue" : "text-gray-600"}`}
                >
                  {row.label}
                </span>
                <span
                  className={`text-sm font-bold ${row.highlight ? "text-sanui-blue" : "text-sanui-dark"}`}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "ingredients" && (
        <div className="max-w-2xl">
          <p className="text-gray-700 text-base leading-relaxed">
            <strong className="text-sanui-dark">Ingredientes:</strong> {product.ingredients}
          </p>
          <div className="mt-6 p-4 bg-sanui-green/10 rounded-2xl border border-sanui-green/20">
            <p className="text-sanui-green font-semibold text-sm">
              ✓ Sin aditivos artificiales · Sin conservantes · Sin colorantes
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
