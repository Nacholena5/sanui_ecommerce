import { trpc } from "@/lib/trpc";
import { Link, useRoute } from "wouter";
import { ArrowLeft, Clock, Package, User, DollarSign } from "lucide-react";

export default function OrderDetail() {
  const [match, params] = useRoute("/admin/pedido/:orderId");
  const orderId = params?.orderId ? Number(params.orderId) : NaN;

  const { data, isLoading, isError, error } = trpc.order.detail.useQuery(
    { orderId },
    { enabled: !isNaN(orderId) }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-sanui-off-white py-20 px-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-500">Cargando detalle del pedido...</p>
        </div>
      </div>
    );
  }

  if (!match || !data || isError) {
    return (
      <div className="min-h-screen bg-sanui-off-white py-20 px-4">
        <div className="container mx-auto text-center">
          <p className="text-red-600 mb-6">{error?.message || "Pedido no encontrado."}</p>
          <Link
            href="/admin/pedidos"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-sanui-dark hover:border-sanui-blue hover:text-sanui-blue transition"
          >
            <ArrowLeft size={16} /> Volver a la lista
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sanui-off-white py-20 px-4">
      <div className="container mx-auto">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sanui-blue mb-2">Admin</p>
            <h1 className="font-display text-4xl text-sanui-dark">Detalle del pedido</h1>
            <p className="mt-2 text-gray-500">Revisá los datos del cliente, el estado y el contenido del pedido.</p>
          </div>
          <Link
            href="/admin/pedidos"
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-sanui-dark hover:border-sanui-blue hover:text-sanui-blue transition"
          >
            <ArrowLeft size={16} /> Volver a pedidos
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Pedido</p>
                <h2 className="font-display text-3xl text-sanui-dark">SANUI-{String(data.orderId).padStart(6, "0")}</h2>
              </div>
              <div className="rounded-3xl bg-sanui-blue/5 px-4 py-3 text-sm font-semibold text-sanui-blue">
                {data.status}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 mb-8">
              <div className="space-y-3 rounded-3xl border border-gray-100 bg-sanui-off-white p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Cliente</p>
                <p className="text-sm text-sanui-dark font-semibold">
                  {data.customer.firstName} {data.customer.lastName}
                </p>
                <p className="text-sm text-gray-500">{data.customer.email}</p>
                <p className="text-sm text-gray-500">{data.customer.phone}</p>
              </div>
              <div className="space-y-3 rounded-3xl border border-gray-100 bg-sanui-off-white p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Envío</p>
                <p className="text-sm text-sanui-dark font-semibold">{data.customer.address}</p>
                <p className="text-sm text-gray-500">
                  {data.customer.city}, {data.customer.department}
                </p>
                {data.customer.postalCode && (
                  <p className="text-sm text-gray-500">CP {data.customer.postalCode}</p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">Items</p>
                <div className="space-y-4">
                  {data.items.map((item) => (
                    <div key={`${item.id}-${item.flavor ?? ""}`} className="flex flex-col gap-3 rounded-3xl border border-gray-100 bg-sanui-off-white p-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold text-sanui-dark">{item.name}</p>
                        {item.flavor && <p className="text-sm text-gray-500">Sabor: {item.flavor}</p>}
                        <p className="text-xs text-gray-500">Cantidad: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sanui-dark">
                          ${ (item.price * item.quantity).toLocaleString("es-UY") }
                        </p>
                        <p className="text-xs text-gray-500">Precio unitario: ${item.price.toLocaleString("es-UY")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-gray-100 bg-sanui-off-white p-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Subtotal</p>
                    <p className="text-lg font-semibold text-sanui-dark">${data.subtotal.toLocaleString("es-UY")}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Envío</p>
                    <p className="text-lg font-semibold text-sanui-dark">${data.shippingCost.toLocaleString("es-UY")}</p>
                  </div>
                </div>
                <div className="mt-6 border-t border-gray-200 pt-4 flex items-center justify-between">
                  <span className="text-sm uppercase tracking-[0.3em] text-gray-500">Total</span>
                  <span className="text-2xl font-display text-sanui-blue">${data.total.toLocaleString("es-UY")}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <User size={18} />
                <span>Cliente</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Nombre</p>
                <p className="font-semibold text-sanui-dark">{data.customer.firstName} {data.customer.lastName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Email</p>
                <p className="text-sm text-gray-600">{data.customer.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">WhatsApp</p>
                <p className="text-sm text-gray-600">{data.customer.phone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Pago</p>
                <p className="text-sm text-gray-600">{data.paymentMethod}</p>
              </div>
              {data.notes && (
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Notas</p>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{data.notes}</p>
                </div>
              )}
              <div className="rounded-3xl bg-sanui-blue/5 p-4">
                <div className="flex items-center gap-2 text-sm text-sanui-blue">
                  <DollarSign size={16} />
                  <span>Estado actual: {data.status}</span>
                </div>
                <p className="mt-3 text-xs text-gray-500">Creado el {new Date(data.createdAt).toLocaleString("es-UY")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
