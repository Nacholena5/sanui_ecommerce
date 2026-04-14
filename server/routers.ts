import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { notifyOwner } from "./_core/notification";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { instagramRouter } from "./routers/instagram";
import { createOrder, getOrderById, getOrders, getOrdersByUser, updateOrderStatus, getRecentOrderByEmail } from "./db";
import { createMercadoPagoPreference } from "./_core/mercadoPago";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  order: router({
    list: publicProcedure.query(async () => {
      const orders = await getOrders();

      return orders.map((order) => ({
        orderId: order.id,
        createdAt: order.createdAt.toISOString(),
        total: order.total,
        status: order.status,
      }));
    }),

    updateStatus: publicProcedure
      .input(
        z.object({
          orderId: z.number().int().positive(),
          status: z.enum(["pending", "confirmed", "paid", "cancelled"]),
        })
      )
      .mutation(async ({ input }) => {
        await updateOrderStatus(input.orderId, input.status);
        return { success: true };
      }),

    myList: protectedProcedure.query(async ({ ctx }) => {
      const orders = await getOrdersByUser(ctx.user.id);
      return orders.map((order) => ({
        orderId: order.id,
        createdAt: order.createdAt.toISOString(),
        total: order.total,
        status: order.status,
      }));
    }),

    detail: protectedProcedure
      .input(z.object({ orderId: z.number().int().positive() }))
      .query(async ({ input, ctx }) => {
        const order = await getOrderById(input.orderId);
        if (!order) {
          throw new Error("Pedido no encontrado");
        }
        if (order.userId && order.userId !== ctx.user.id) {
          throw new Error("No autorizado para ver este pedido");
        }

        return {
          orderId: order.id,
          createdAt: order.createdAt.toISOString(),
          total: order.total,
          subtotal: order.subtotal,
          shippingCost: order.total - order.subtotal,
          status: order.status,
          customer: {
            firstName: order.firstName,
            lastName: order.lastName,
            email: order.email,
            phone: order.phone,
            address: order.address,
            city: order.city,
            department: order.department,
            postalCode: order.postalCode,
          },
          paymentMethod: order.paymentMethod,
          notes: order.notes,
          items: order.items,
        };
      }),

    create: publicProcedure
      .input(
        z.object({
          items: z
            .array(
              z.object({
                id: z.string().min(1),
                name: z.string().min(1),
                flavor: z.string().optional(),
                price: z.number().nonnegative(),
                quantity: z.number().int().positive(),
              })
            )
            .min(1),
          firstName: z.string().min(1),
          lastName: z.string().min(1),
          email: z.string().email(),
          phone: z.string().min(1),
          address: z.string().min(1),
          city: z.string().min(1),
          department: z.string().min(1),
          postalCode: z.string().optional(),
          notes: z.string().optional(),
          paymentMethod: z.enum(["transfer", "mercadopago", "cash"]),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const subtotal = input.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shippingCost =
          input.department === "Montevideo" && subtotal >= 1000
            ? 0
            : input.department === "Montevideo"
            ? 150
            : 350;
        const total = subtotal + shippingCost;

        if (input.paymentMethod === "mercadopago") {
          const existingOrder = await getRecentOrderByEmail(input.email);
          if (existingOrder) {
            throw new Error(
              existingOrder.status === "paid"
                ? "Ya existe un pedido pagado con este email. Contactanos si necesitas ayuda."
                : "Un proceso de pago con este email está en curso. Aguardá unos minutos antes de intentar nuevamente."
            );
          }
        }

        const orderId = await createOrder({
          userId: ctx.user?.id ?? null,
          items: input.items,
          subtotal,
          total,
          status: "pending",
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phone: input.phone,
          address: input.address,
          city: input.city,
          department: input.department,
          postalCode: input.postalCode ?? null,
          paymentMethod: input.paymentMethod,
          notes: input.notes ?? null,
        });

        let paymentLink: string | undefined;
        if (input.paymentMethod === "mercadopago") {
          try {
            paymentLink = (
              await createMercadoPagoPreference(orderId, input.items, {
                firstName: input.firstName,
                lastName: input.lastName,
                email: input.email,
              })
            ).init_point;
          } catch (error) {
            await updateOrderStatus(orderId, "cancelled");
            throw error;
          }
        }

        try {
          const title = `Nuevo pedido SANUI #${orderId}`;
          const content = `Nuevo pedido recibido:
Cliente: ${input.firstName} ${input.lastName}
Email: ${input.email}
WhatsApp: ${input.phone}
Departamento: ${input.department}
Ciudad: ${input.city}
Dirección: ${input.address}
Método de pago: ${input.paymentMethod}
Subtotal: $${subtotal.toFixed(2)}
Envío: $${shippingCost.toFixed(2)}
Total: $${total.toFixed(2)}

Productos:
${input.items
  .map(
    (item) =>
      `- ${item.name}${item.flavor ? ` (${item.flavor})` : ""} x${item.quantity} = $${(
        item.price * item.quantity
      ).toFixed(2)}`
  )
  .join("\n")}

Notas: ${input.notes?.trim() || "Ninguna"}`;

          const notified = await notifyOwner({ title, content });
          if (!notified) {
            console.warn("[Order] Order created but admin notification was not delivered.");
          }
        } catch (error) {
          console.warn("[Order] Failed to send admin notification:", error);
        }

        return { orderId, subtotal, shippingCost, total, paymentLink };
      }),
  }),

  instagram: instagramRouter,
});

export type AppRouter = typeof appRouter;
