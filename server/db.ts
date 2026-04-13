import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertOrder, InsertUser, orders, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function createOrder(order: InsertOrder): Promise<number> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(orders).values(order);
  return Number((result as any).insertId ?? 0);
}

export async function getOrders() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get orders: database not available");
    return [] as typeof orders.$inferSelect[];
  }

  return db.select().from(orders).orderBy(desc(orders.createdAt));
}

export async function getOrderById(orderId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get order by id: database not available");
    return null;
  }

  const result = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getOrdersByUser(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get orders by user: database not available");
    return [] as typeof orders.$inferSelect[];
  }

  return db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt));
}

export async function getRecentOrderByEmail(email: string, minutesBack: number = 5) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get orders by email: database not available");
    return null;
  }

  const result = await db
    .select()
    .from(orders)
    .where(eq(orders.email, email))
    .orderBy(desc(orders.createdAt))
    .limit(1);

  if (result.length === 0) {
    return null;
  }

  const order = result[0];
  if (order.status === "paid") {
    return order;
  }

  const fiveMinutesAgo = new Date(Date.now() - minutesBack * 60 * 1000);
  if (
    order.status === "pending" &&
    order.paymentMethod === "mercadopago" &&
    order.createdAt > fiveMinutesAgo
  ) {
    return order;
  }

  return null;
}

export async function updateOrderStatus(orderId: number, status: "pending" | "confirmed" | "paid" | "cancelled") {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const currentOrder = await getOrderById(orderId);
  if (!currentOrder) {
    throw new Error(`Order ${orderId} not found`);
  }

  const currentStatus = currentOrder.status;

  if (currentStatus === "paid" && status !== "paid") {
    throw new Error(`Cannot update order ${orderId}: already marked as paid. Current status: ${currentStatus}, attempted: ${status}`);
  }

  if (currentStatus === "paid" && status === "paid") {
    console.warn(`[Database] Order ${orderId} is already marked as paid, skipping duplicate update.`);
    return;
  }

  await db.update(orders).set({ status }).where(eq(orders.id, orderId));
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.
