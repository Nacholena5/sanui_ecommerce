import { CheckCircle2 } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function ThankYou() {
  const [location] = useLocation();
  const query = new URLSearchParams(location.split("?")[1] || "");
  const orderId = query.get("orderId");

  return (
    <div className="min-h-screen bg-sanui-off-white flex items-center justify-center pt-20 px-4">
      <div className="max-w-xl w-full bg-white rounded-[32px] border border-gray-100 shadow-xl p-8 text-center">
        <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-sanui-green/10 flex items-center justify-center">
          <CheckCircle2 size={48} className="text-sanui-green" />
        </div>
        <h1 className="font-display text-4xl text-sanui-dark mb-4">¡Pedido recibido!</h1>
        <p className="text-gray-500 text-lg mb-6">
          Gracias por tu compra. Estamos preparando tu pedido y te contactaremos pronto para coordinar la entrega.
        </p>

        {orderId ? (
          <div className="mb-6 rounded-3xl border border-gray-100 bg-sanui-off-white p-4">
            <p className="text-sm text-gray-500">Número de pedido</p>
            <p className="font-display text-2xl text-sanui-blue mt-2">{orderId}</p>
          </div>
        ) : null}

        <Link
          href="/tienda"
          className="inline-flex items-center justify-center w-full px-6 py-4 rounded-2xl bg-sanui-blue text-white font-bold uppercase text-sm tracking-wider hover:bg-sanui-blue-dark transition-colors"
        >
          Volver a la tienda
        </Link>
      </div>
    </div>
  );
}
