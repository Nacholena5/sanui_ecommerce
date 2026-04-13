import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { ArrowRight, Package, Clock } from "lucide-react";
import { useMemo, useState } from "react";

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-sanui-blue/10 text-sanui-blue",
  paid: "bg-sanui-green/10 text-sanui-green",
  cancelled: "bg-red-100 text-red-700",
};

type OrderStatus = "pending" | "confirmed" | "paid" | "cancelled";

export default function AdminOrders() {
  const utils = trpc.useContext();
  const { data, isLoading, isError } = trpc.order.list.useQuery();
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const updateStatusMutation = trpc.order.updateStatus.useMutation({
    onSuccess: () => {
      utils.order.list.invalidate();
    },
  });

  const statusOptions = ["all", "pending", "confirmed", "paid", "cancelled"] as const;
  const rowStatusOptions = ["pending", "confirmed", "paid", "cancelled"] as const;

  const quickActions = [
    { status: "confirmed", label: "Confirmar" },
    { status: "paid", label: "Marcar pagado" },
    { status: "cancelled", label: "Cancelar" },
  ] as const;

  const handleQuickAction = (orderId: number, status: OrderStatus) => {
    if (updateStatusMutation.isLoading) return;
    updateStatusMutation.mutate({ orderId, status });
  };

  const formatDate = (isoDate: string) =>
    new Date(isoDate).toLocaleString("es-UY", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const filteredOrders = useMemo(() => {
    if (!data) return [];

    const start = fromDate ? new Date(`${fromDate}T00:00:00`) : null;
    const end = toDate ? new Date(`${toDate}T23:59:59`) : null;

    return data.filter((order) => {
      if (statusFilter !== "all" && order.status !== statusFilter) {
        return false;
      }

      const orderDate = new Date(order.createdAt);
      if (start && orderDate < start) return false;
      if (end && orderDate > end) return false;
      return true;
    });
  }, [data, statusFilter, fromDate, toDate]);

  return (
    <div className="min-h-screen bg-sanui-off-white py-20 px-4">
      <div className="container mx-auto">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sanui-blue mb-2">Admin</p>
            <h1 className="font-display text-4xl text-sanui-dark">Lista de pedidos</h1>
            <p className="mt-2 text-gray-500">Revisa los últimos pedidos con estado, total y fecha.</p>
          </div>
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-sanui-dark hover:border-sanui-blue hover:text-sanui-blue transition"
          >
            <Package size={16} /> Volver a la tienda
          </Link>
        </div>

        <div className="mb-6 rounded-[32px] border border-gray-100 bg-white p-6 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-2">Filtros</p>
              <h2 className="font-display text-xl text-sanui-dark">Filtrar pedidos</h2>
            </div>
            <label className="block text-sm font-semibold text-sanui-dark">
              Estado
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as OrderStatus | "all")}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-sanui-dark focus:border-sanui-blue focus:outline-none focus:ring-2 focus:ring-sanui-blue/20"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status === "all" ? "Todos" : status}
                  </option>
                ))}
              </select>
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-sanui-dark">
                Desde
                <input
                  type="date"
                  value={fromDate}
                  onChange={(event) => setFromDate(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-sanui-dark focus:border-sanui-blue focus:outline-none focus:ring-2 focus:ring-sanui-blue/20"
                />
              </label>
              <label className="block text-sm font-semibold text-sanui-dark">
                Hasta
                <input
                  type="date"
                  value={toDate}
                  onChange={(event) => setToDate(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-sanui-dark focus:border-sanui-blue focus:outline-none focus:ring-2 focus:ring-sanui-blue/20"
                />
              </label>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setStatusFilter("all");
                setFromDate("");
                setToDate("");
              }}
              className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-sanui-dark hover:border-sanui-blue hover:text-sanui-blue transition"
            >
              Limpiar filtros
            </button>
            <span className="text-sm text-gray-500">
              {filteredOrders.length} pedido{filteredOrders.length === 1 ? "" : "s"} encontrados
            </span>
          </div>
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
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Acciones
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Detalle
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                      Cargando pedidos...
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-red-600">
                      Error al cargar los pedidos.
                    </td>
                  </tr>
                ) : filteredOrders.length ? (
                  filteredOrders.map((order) => (
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
                        <select
                          value={order.status}
                          onChange={(event) => {
                            updateStatusMutation.mutate({
                              orderId: order.orderId,
                              status: event.target.value as "pending" | "confirmed" | "paid" | "cancelled",
                            });
                          }}
                          disabled={updateStatusMutation.isLoading}
                          className={`inline-flex w-full rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[order.status] ?? "bg-gray-100 text-gray-700"}`}
                        >
                          {rowStatusOptions.map((status) => (
                            <option key={status} value={status} className="text-sanui-dark">
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                          {quickActions.map((action) => (
                            <button
                              key={action.status}
                              type="button"
                              onClick={() => handleQuickAction(order.orderId, action.status)}
                              disabled={updateStatusMutation.isLoading || order.status === action.status}
                              className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                                order.status === action.status
                                  ? "border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
                                  : "border border-gray-200 bg-white text-sanui-dark hover:border-sanui-blue hover:bg-sanui-blue/5 hover:text-sanui-blue"
                              }`}
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Link
                          href={`/admin/pedido/${order.orderId}`}
                          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-sanui-dark hover:border-sanui-blue hover:text-sanui-blue transition"
                        >
                          Ver
                          <ArrowRight size={14} />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                      {data?.length
                        ? "No hay pedidos que coincidan con estos filtros."
                        : "No hay pedidos registrados aún."}
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
