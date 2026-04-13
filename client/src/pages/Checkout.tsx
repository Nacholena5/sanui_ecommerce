import { useCart } from "@/contexts/CartContext";
import { CheckCircle2, ChevronRight, Package, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

interface OrderForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  department: string;
  postalCode: string;
  notes: string;
  paymentMethod: string;
}

const initialForm: OrderForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  department: "Montevideo",
  postalCode: "",
  notes: "",
  paymentMethod: "transfer",
};

const departments = [
  "Montevideo", "Canelones", "Maldonado", "Colonia", "San José",
  "Soriano", "Flores", "Florida", "Durazno", "Tacuarembó",
  "Rivera", "Cerro Largo", "Treinta y Tres", "Rocha", "Lavalleja",
  "Artigas", "Salto", "Paysandú", "Río Negro",
];

export default function Checkout() {
  const { state, totalPrice, totalItems, clearCart } = useCart();
  const [form, setForm] = useState<OrderForm>(initialForm);
  const [errors, setErrors] = useState<Partial<OrderForm>>({});
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber] = useState(() => `SANUI-${Date.now().toString().slice(-6)}`);

  const shippingCost = form.department === "Montevideo" && totalPrice >= 1000 ? 0 : 
                       form.department === "Montevideo" ? 150 : 350;
  const finalTotal = totalPrice + shippingCost;

  const validate = (): boolean => {
    const newErrors: Partial<OrderForm> = {};
    if (!form.firstName.trim()) newErrors.firstName = "Requerido";
    if (!form.lastName.trim()) newErrors.lastName = "Requerido";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email inválido";
    if (!form.phone.trim()) newErrors.phone = "Requerido";
    if (!form.address.trim()) newErrors.address = "Requerido";
    if (!form.city.trim()) newErrors.city = "Requerido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    clearCart();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof OrderForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Empty cart
  if (state.items.length === 0 && !submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-20">
        <div className="text-center px-4">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <Package size={32} className="text-gray-400" />
          </div>
          <h2 className="font-display text-4xl text-sanui-dark mb-3">Carrito vacío</h2>
          <p className="text-gray-500 mb-6">Agregá productos antes de hacer el checkout.</p>
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

  // Order confirmation
  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-20">
        <div className="max-w-lg w-full mx-auto px-4 text-center">
          <div className="w-24 h-24 rounded-full bg-sanui-green/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-sanui-green" />
          </div>
          <h1 className="font-display text-5xl text-sanui-dark mb-3">¡PEDIDO RECIBIDO!</h1>
          <p className="text-gray-500 text-lg mb-2">
            Gracias, <strong>{form.firstName}</strong>. Tu pedido está confirmado.
          </p>
          <div className="bg-sanui-off-white rounded-2xl p-4 mb-6 inline-block">
            <span className="text-sm text-gray-500">Número de pedido:</span>
            <span className="font-display text-2xl text-sanui-blue ml-2">{orderNumber}</span>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-6 mb-8 text-left">
            <h4 className="font-bold text-sanui-dark mb-4">Resumen del pedido</h4>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Nombre</span>
                <span className="font-semibold">{form.firstName} {form.lastName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Email</span>
                <span className="font-semibold">{form.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Dirección</span>
                <span className="font-semibold text-right max-w-[60%]">
                  {form.address}, {form.city}, {form.department}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Pago</span>
                <span className="font-semibold capitalize">{form.paymentMethod === "transfer" ? "Transferencia" : form.paymentMethod}</span>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between">
              <span className="font-bold text-sanui-dark">Total</span>
              <span className="font-display text-2xl text-sanui-blue">
                ${finalTotal.toLocaleString("es-UY")}
              </span>
            </div>
          </div>

          <p className="text-gray-500 text-sm mb-8">
            Te contactaremos a <strong>{form.email}</strong> y al <strong>{form.phone}</strong> para
            coordinar el pago y la entrega.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-sanui-blue text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider hover:bg-sanui-blue-dark transition-colors"
            >
              Volver al inicio
            </Link>
            <Link
              href="/tienda"
              className="inline-flex items-center justify-center gap-2 border-2 border-sanui-dark text-sanui-dark px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider hover:bg-sanui-dark hover:text-white transition-all"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sanui-off-white">
      {/* Header */}
      <div className="bg-sanui-dark pt-20 pb-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-white transition-colors text-gray-400">Inicio</Link>
            <ChevronRight size={14} className="text-gray-600" />
            <Link href="/tienda" className="hover:text-white transition-colors text-gray-400">Tienda</Link>
            <ChevronRight size={14} className="text-gray-600" />
            <span className="text-white">Checkout</span>
          </div>
          <h1 className="font-display text-5xl text-white">FINALIZAR PEDIDO</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-10">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal info */}
              <div className="bg-white rounded-3xl p-6 md:p-8">
                <h2 className="font-bold text-sanui-dark text-lg uppercase tracking-wider mb-6">
                  Datos personales
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="Nombre *"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                    placeholder="Tu nombre"
                  />
                  <FormField
                    label="Apellido *"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                    placeholder="Tu apellido"
                  />
                  <FormField
                    label="Email *"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="tu@email.com"
                  />
                  <FormField
                    label="Teléfono / WhatsApp *"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="+598 9X XXX XXX"
                  />
                </div>
              </div>

              {/* Shipping address */}
              <div className="bg-white rounded-3xl p-6 md:p-8">
                <h2 className="font-bold text-sanui-dark text-lg uppercase tracking-wider mb-6">
                  Dirección de entrega
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <FormField
                      label="Dirección *"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      error={errors.address}
                      placeholder="Calle, número, apartamento"
                    />
                  </div>
                  <FormField
                    label="Ciudad *"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    error={errors.city}
                    placeholder="Ciudad"
                  />
                  <div>
                    <label className="block text-sm font-bold text-sanui-dark mb-2">
                      Departamento
                    </label>
                    <select
                      name="department"
                      value={form.department}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-sanui-dark focus:outline-none focus:border-sanui-blue focus:ring-2 focus:ring-sanui-blue/20 text-sm"
                    >
                      {departments.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <FormField
                    label="Código postal"
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    placeholder="Opcional"
                  />
                </div>
              </div>

              {/* Payment method */}
              <div className="bg-white rounded-3xl p-6 md:p-8">
                <h2 className="font-bold text-sanui-dark text-lg uppercase tracking-wider mb-6">
                  Método de pago
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "transfer", label: "Transferencia bancaria", icon: "🏦" },
                    { id: "mercadopago", label: "Mercado Pago", icon: "💳" },
                    { id: "cash", label: "Efectivo en mano", icon: "💵" },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        form.paymentMethod === method.id
                          ? "border-sanui-blue bg-sanui-blue/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={form.paymentMethod === method.id}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className="text-2xl">{method.icon}</span>
                      <span className="text-xs font-semibold text-center text-sanui-dark">
                        {method.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="bg-white rounded-3xl p-6 md:p-8">
                <h2 className="font-bold text-sanui-dark text-lg uppercase tracking-wider mb-4">
                  Notas del pedido
                </h2>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Instrucciones especiales, horario de entrega, etc. (opcional)"
                  rows={3}
                  className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-sanui-dark placeholder-gray-400 focus:outline-none focus:border-sanui-blue focus:ring-2 focus:ring-sanui-blue/20 text-sm resize-none"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-6 sticky top-24">
                <h2 className="font-bold text-sanui-dark text-lg uppercase tracking-wider mb-6">
                  Tu pedido
                </h2>

                {/* Items */}
                <div className="space-y-3 mb-6">
                  {state.items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.flavor}`}
                      className="flex items-center gap-3"
                    >
                      <div className="w-12 h-12 rounded-xl bg-sanui-blue/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sanui-blue text-xs font-bold">
                          {item.quantity}x
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-sanui-dark truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-500">{item.product.weight}</p>
                      </div>
                      <span className="text-sm font-bold text-sanui-dark flex-shrink-0">
                        ${(item.product.price * item.quantity).toLocaleString("es-UY")}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-gray-100 pt-4 space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal ({totalItems} items)</span>
                    <span className="font-semibold">${totalPrice.toLocaleString("es-UY")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Envío</span>
                    <span className={`font-semibold ${shippingCost === 0 ? "text-sanui-green" : ""}`}>
                      {shippingCost === 0 ? "Gratis 🎉" : `$${shippingCost}`}
                    </span>
                  </div>
                  {form.department === "Montevideo" && totalPrice < 1000 && (
                    <p className="text-xs text-sanui-blue">
                      Agregá ${(1000 - totalPrice).toLocaleString("es-UY")} más para envío gratis
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center mb-6 pt-3 border-t border-gray-100">
                  <span className="font-bold text-sanui-dark">Total</span>
                  <span className="font-display text-3xl text-sanui-blue">
                    ${finalTotal.toLocaleString("es-UY")}
                  </span>
                </div>

                {/* Trust badges */}
                <div className="space-y-2 mb-6">
                  {[
                    { icon: <ShieldCheck size={14} className="text-sanui-green" />, text: "Compra segura" },
                    { icon: <Truck size={14} className="text-sanui-blue" />, text: "Envíos a todo Uruguay" },
                    { icon: <Package size={14} className="text-sanui-yellow" />, text: "Packaging reciclable" },
                  ].map((badge, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                      {badge.icon}
                      {badge.text}
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full bg-sanui-blue text-white py-4 px-6 rounded-2xl font-bold text-sm uppercase tracking-wider hover:bg-sanui-blue-dark transition-all hover:scale-105 shadow-lg shadow-sanui-blue/30"
                >
                  Confirmar pedido
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Form Field Component ─────────────────────────────────────────────────────
function FormField({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-sanui-dark mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3.5 rounded-2xl border bg-gray-50 text-sanui-dark placeholder-gray-400 focus:outline-none focus:ring-2 text-sm transition-colors ${
          error
            ? "border-red-400 focus:border-red-400 focus:ring-red-200"
            : "border-gray-200 focus:border-sanui-blue focus:ring-sanui-blue/20"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
