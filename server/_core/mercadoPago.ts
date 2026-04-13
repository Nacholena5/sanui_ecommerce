import { ENV } from "./env";
import { notifyOwner } from "./notification";
import { updateOrderStatus } from "../db";

const MP_BASE_URL = ENV.mercadoPagoBaseUrl;
const WEBHOOK_KEY = ENV.mercadoPagoWebhookKey;

export type MercadoPagoPreferenceItem = {
  title: string;
  quantity: number;
  unit_price: number;
  currency_id: string;
  id: string;
};

export async function createMercadoPagoPreference(
  orderId: number,
  items: Array<{ id: string; name: string; price: number; quantity: number }> ,
  payer: { firstName: string; lastName: string; email: string }
) {
  if (!ENV.mercadoPagoAccessToken) {
    throw new Error("Mercado Pago access token is not configured.");
  }

  const preference = {
    items: items.map((item) => ({
      id: item.id,
      title: item.name,
      quantity: item.quantity,
      currency_id: "UYU",
      unit_price: item.price,
    })) as MercadoPagoPreferenceItem[],
    payer: {
      email: payer.email,
      name: payer.firstName,
      surname: payer.lastName,
    },
    external_reference: String(orderId),
    back_urls: {
      success: `${ENV.frontendUrl}/gracias?orderId=${orderId}`,
      failure: `${ENV.frontendUrl}/checkout`,
      pending: `${ENV.frontendUrl}/checkout`,
    },
    auto_return: "approved",
    notification_url: `${ENV.serverUrl}/api/mercadopago/webhook`,
  };

  const response = await fetch(`${MP_BASE_URL}/checkout/preferences`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ENV.mercadoPagoAccessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preference),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Mercado Pago preference creation failed: ${errorText}`);
  }

  return (await response.json()) as {
    id: string;
    init_point: string;
    sandbox_init_point?: string;
  };
}

export async function verifyMercadoPagoWebhookSignature(
  signature: string | string[] | undefined,
  rawBody: Uint8Array | string | undefined
) {
  if (!WEBHOOK_KEY) {
    console.error("[MercadoPago] Webhook key is not configured. Set MERCADO_PAGO_WEBHOOK_KEY.");
    return false;
  }

  if (!signature || !rawBody) {
    return false;
  }

  let received = Array.isArray(signature) ? signature[0] : signature;
  if (typeof received !== "string") {
    return false;
  }

  if (received.startsWith("sha256=")) {
    received = received.slice("sha256=".length);
  }

  const encoder = new TextEncoder();
  const keyData = encoder.encode(WEBHOOK_KEY);
  const rawBodyString = typeof rawBody === "string" ? rawBody : new TextDecoder().decode(rawBody);

  const subtle = globalThis.crypto?.subtle;
  if (!subtle) {
    console.error("[MercadoPago] Web Crypto API not available for webhook signature validation.");
    return false;
  }

  const key = await subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBuffer = await subtle.sign(
    { name: "HMAC" },
    key,
    encoder.encode(rawBodyString)
  );

  const expected = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const hexToBytes = (hex: string) => {
    const normalized = hex.length % 2 === 0 ? hex : `0${hex}`;
    const bytes = new Uint8Array(normalized.length / 2);
    for (let i = 0; i < normalized.length; i += 2) {
      bytes[i / 2] = parseInt(normalized.slice(i, i + 2), 16);
    }
    return bytes;
  };

  const receivedBuffer = hexToBytes(received);
  const expectedBuffer = hexToBytes(expected);

  if (receivedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < receivedBuffer.length; i += 1) {
    result |= receivedBuffer[i] ^ expectedBuffer[i];
  }

  return result === 0;
}

export async function handleMercadoPagoWebhook(body: any) {
  const eventType = body?.type ?? body?.topic ?? "unknown";
  const paymentId = body?.data?.id || body?.id || body?.payment_id;
  console.info("[MercadoPago] Handling webhook event", {
    eventType,
    paymentId,
    payload: body,
  });

  if (!paymentId) {
    throw new Error("Mercado Pago webhook payload did not include a payment id.");
  }

  const response = await fetch(`${MP_BASE_URL}/v1/payments/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${ENV.mercadoPagoAccessToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Mercado Pago payment lookup failed: ${errorText}`);
  }

  const payment = await response.json();
  const externalReference = Number(payment.external_reference ?? payment.order?.external_reference ?? null);
  if (isNaN(externalReference)) {
    throw new Error("Mercado Pago payment response did not include a valid external_reference.");
  }

  const status = String(payment.status || "").toLowerCase();
  if (status === "approved") {
    try {
      await updateOrderStatus(externalReference, "paid");
      console.info("[MercadoPago] Order marked as paid", {
        orderId: externalReference,
        paymentId: payment.id,
        paymentStatus: payment.status,
      });
    } catch (statusError: any) {
      const errorMsg = String(statusError?.message || "");
      if (errorMsg.includes("already marked as paid")) {
        console.info("[MercadoPago] Order already paid in previous webhook, skipping duplicate", {
          orderId: externalReference,
          paymentId: payment.id,
        });
      } else {
        throw statusError;
      }
    }
    
    try {
      await notifyOwner({
        title: `Pedido SANUI #${externalReference} pagado`,
        content: `El pedido #${externalReference} fue pagado correctamente a través de Mercado Pago.

Pago ID: ${payment.id}
Estado: ${payment.status}
Monto: ${payment.transaction_amount}
Cliente: ${payment.payer?.email ?? "desconocido"}`,
      });
    } catch (error) {
      console.warn("[MercadoPago] Paid webhook notification failed:", error);
    }
  } else if (status === "rejected" || status === "cancelled" || status === "refunded") {
    await updateOrderStatus(externalReference, "cancelled");
    console.warn("[MercadoPago] Order marked as cancelled", {
      orderId: externalReference,
      paymentId: payment.id,
      paymentStatus: payment.status,
    });
  } else {
    console.info("[MercadoPago] Webhook received unsupported payment status", {
      orderId: externalReference,
      paymentId: payment.id,
      paymentStatus: payment.status,
    });
  }
}
