import { useCart } from "@/contexts/CartContext";
import { ArrowLeft, Minus, Package, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "wouter";

export default function Cart() {
  const { state, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  const shippingCost = totalPrice >= 1000 ? 0 : 150;
  const finalTotal = totalPrice + shippingCost;

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-20">
        <div className="text-center px-4">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} className="text-gray-400" />
          </div>
          <h2 className="font-display text-4xl text-sanui-dark mb-3">Carrito vacío</h2>
          <p className="text-gray-500 mb-6">Todavía no agregaste nada. ¡Explorá la tienda!</p>
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 bg-sanui-blue text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider hover:bg-sanui-blue-dark transition-colors"
          >
            Ir a la tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sanui-off-white">
      <div className="bg-sanui-dark pt-20 pb-8">
        <div className="container mx-auto px-4 sm:px-6">
          <h1 className="font-display text-5xl text-white">MI CARRITO</h1>
          <p className="text-gray-400 mt-1">{totalItems} {totalItems === 1 ? "producto" : "productos"}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-10">
        <Link
          href="/tienda"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-sanui-blue transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Seguir comprando
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <div
                key={`${item.product.id}-${item.flavor}`}
                className="bg-white rounded-3xl p-5 flex gap-5"
              >
                <div className="w-24 h-24 rounded-2xl bg-sanui-blue/10 flex items-center justify-center flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover rounded-2xl"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                  <span className="text-sanui-blue text-xs font-bold hidden">
                    {item.flavor}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-sanui-dark text-base">{item.product.name}</h3>
                      <p className="text-gray-500 text-sm">{item.product.weight} · {item.flavor}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id, item.flavor)}
                      className="p-1.5 rounded-full hover:bg-red-50 hover:text-red-500 text-gray-400 transition-colors flex-shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.flavor, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm hover:text-sanui-blue transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center font-bold text-sanui-dark">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.flavor, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm hover:text-sanui-blue transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-display text-2xl text-sanui-dark">
                      ${(item.product.price * item.quantity).toLocaleString("es-UY")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 sticky top-24">
              <h2 className="font-bold text-sanui-dark text-lg uppercase tracking-wider mb-6">
                Resumen
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal ({totalItems} items)</span>
                  <span className="font-semibold">${totalPrice.toLocaleString("es-UY")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Envío (Montevideo)</span>
                  <span className={`font-semibold ${shippingCost === 0 ? "text-sanui-green" : ""}`}>
                    {shippingCost === 0 ? "Gratis 🎉" : `$${shippingCost}`}
                  </span>
                </div>
                {totalPrice < 1000 && (
                  <p className="text-xs text-sanui-blue bg-sanui-blue/5 px-3 py-2 rounded-xl">
                    Agregá ${(1000 - totalPrice).toLocaleString("es-UY")} más para envío gratis en Montevideo
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-100">
                <span className="font-bold text-sanui-dark">Total</span>
                <span className="font-display text-3xl text-sanui-blue">
                  ${finalTotal.toLocaleString("es-UY")}
                </span>
              </div>

              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 bg-sanui-blue text-white py-4 px-6 rounded-2xl font-bold text-sm uppercase tracking-wider w-full hover:bg-sanui-blue-dark transition-all hover:scale-105 shadow-lg shadow-sanui-blue/30"
              >
                Finalizar pedido
              </Link>
              <Link
                href="/tienda"
                className="mt-3 flex items-center justify-center text-sm text-gray-500 hover:text-sanui-blue transition-colors"
              >
                Seguir comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
