import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Link } from "wouter";

export default function CartDrawer() {
  const { state, closeCart, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  if (!state.isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <ShoppingBag size={22} className="text-sanui-blue" />
            <h2 className="font-display text-2xl text-sanui-dark tracking-wider">
              Tu Carrito
            </h2>
            {totalItems > 0 && (
              <span className="bg-sanui-blue text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 rounded-full bg-sanui-blue/10 flex items-center justify-center">
                <ShoppingBag size={32} className="text-sanui-blue" />
              </div>
              <div>
                <p className="font-display text-2xl text-sanui-dark mb-1">Carrito vacío</p>
                <p className="text-sm text-gray-500">Agregá tus Protein Balls favoritas</p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 bg-sanui-blue text-white px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-sanui-blue-dark transition-colors"
              >
                Ver Tienda
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {state.items.map((item) => (
                <div
                  key={`${item.product.id}-${item.flavor}`}
                  className="flex gap-4 p-4 bg-gray-50 rounded-2xl"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-sanui-blue/10 flex items-center justify-center">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <span className="text-xs text-sanui-blue font-bold text-center px-1 hidden">
                      {item.flavor}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sanui-dark text-sm leading-tight">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.product.weight}</p>
                    <p className="text-sanui-blue font-bold text-sm mt-1">
                      ${(item.product.price * item.quantity).toLocaleString("es-UY")}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.flavor, item.quantity - 1)
                        }
                        className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-sanui-blue hover:text-sanui-blue transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.flavor, item.quantity + 1)
                        }
                        className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-sanui-blue hover:text-sanui-blue transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.product.id, item.flavor)}
                    className="p-1.5 rounded-full hover:bg-red-50 hover:text-red-500 text-gray-400 transition-colors flex-shrink-0 self-start"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-white">
            {/* Subtotal */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="font-bold text-sanui-dark">
                ${totalPrice.toLocaleString("es-UY")}
              </span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">Envío</span>
              <span className="text-sm text-sanui-green font-semibold">A calcular</span>
            </div>
            <div className="flex items-center justify-between mb-6 pt-3 border-t border-gray-100">
              <span className="font-bold text-sanui-dark">Total</span>
              <span className="font-display text-2xl text-sanui-blue">
                ${totalPrice.toLocaleString("es-UY")}
              </span>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex items-center justify-center gap-2 bg-sanui-blue text-white px-6 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider w-full hover:bg-sanui-blue-dark transition-colors"
            >
              Finalizar Pedido
            </Link>
            <button
              onClick={closeCart}
              className="mt-3 w-full text-center text-sm text-gray-500 hover:text-sanui-blue transition-colors"
            >
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}
