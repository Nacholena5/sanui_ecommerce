import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Package, Clock } from "lucide-react";

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-sanui-blue/10 text-sanui-blue",
  paid: "bg-sanui-green/10 text-sanui-green",
  cancelled: "bg-red-100 text-red-700",
};

const formatDate = (isoDate: string) =>
  new Date(isoDate).toLocaleString("es-UY", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function MyOrders() {
  const { data, isLoading, isError, error } = trpc.order.myList.useQuery(undefined, {
    retry: false,
  });

  const errorMessage = isError
    ? error?.message === "UNAUTHORIZED"
      ? "Necesitas iniciar sesión para ver tus pedidos."
      : "No se pudieron cargar tus pedidos. Intenta de nuevo más tarde."
    : null;

  return (
    <div className="min-h-screen bg-sanui-off-white py-20 px-4">
      <div className="container mx-auto">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sanui-blue mb-2">Mi cuenta</p>
            <h1 className="font-display text-4xl text-sanui-dark">Mis pedidos</h1>
            <p className="mt-2 text-gray-500">Revisa el historial de tus pedidos y su estado actual.</p>
          </div>
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-sanui-dark hover:border-sanui-blue hover:text-sanui-blue transition"
          >
            Volver a la tienda
          </Link>
        </div>

        <div className="overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-sanui-off-white">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Pedido
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Fecha
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Total
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                      Cargando tus pedidos...
                    </td>
                  </tr>
                ) : errorMessage ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-14 text-center text-red-600">
                      {errorMessage}
                    </td>
                  </tr>
                ) : data?.length ? (
                  data.map((order) => (
                    <tr key={order.orderId} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sanui-dark">
                        SANUI-{String(order.orderId).padStart(6, "0")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-gray-400" />
                          {formatDate(order.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-sanui-dark">
                        ${order.total.toLocaleString("es-UY")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[order.status] ?? "bg-gray-100 text-gray-700"}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-14 text-center text-gray-500">
                      Aún no tenés pedidos registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
