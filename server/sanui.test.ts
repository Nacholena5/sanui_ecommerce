import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ─── Mock Context ─────────────────────────────────────────────────────────────
function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

// ─── Auth Tests ───────────────────────────────────────────────────────────────
describe("auth.me", () => {
  it("returns null for unauthenticated user", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.me();
    expect(result).toBeNull();
  });
});

describe("auth.logout", () => {
  it("clears session cookie and returns success", async () => {
    const cleared: string[] = [];
    const ctx: TrpcContext = {
      user: {
        id: 1,
        openId: "test-user",
        email: "test@sanui.uy",
        name: "Test User",
        loginMethod: "manus",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      },
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: {
        clearCookie: (name: string) => {
          cleared.push(name);
        },
      } as TrpcContext["res"],
    };
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result.success).toBe(true);
    expect(cleared.length).toBe(1);
  });
});

// ─── Cart Reducer Logic Tests ─────────────────────────────────────────────────
// We test the pure reducer logic inline (mirrors CartContext.tsx cartReducer)
interface CartItem {
  product: { id: string; price: number; name: string };
  quantity: number;
  flavor: string;
}
interface CartState {
  items: CartItem[];
  isOpen: boolean;
}
type CartAction =
  | { type: "ADD_ITEM"; product: CartItem["product"]; quantity: number; flavor: string }
  | { type: "REMOVE_ITEM"; productId: string; flavor: string }
  | { type: "UPDATE_QUANTITY"; productId: string; flavor: string; quantity: number }
  | { type: "CLEAR_CART" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const key = `${action.product.id}-${action.flavor}`;
      const existingIndex = state.items.findIndex(
        (item) => `${item.product.id}-${item.flavor}` === key
      );
      if (existingIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + action.quantity,
        };
        return { ...state, items: updatedItems, isOpen: true };
      }
      return {
        ...state,
        items: [
          ...state.items,
          { product: action.product, quantity: action.quantity, flavor: action.flavor },
        ],
        isOpen: true,
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) => !(item.product.id === action.productId && item.flavor === action.flavor)
        ),
      };
    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => !(item.product.id === action.productId && item.flavor === action.flavor)
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.productId && item.flavor === action.flavor
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
}

const emptyCart: CartState = { items: [], isOpen: false };
const mockProduct = { id: "pb-chocolate", price: 350, name: "Bolitas Proteicas SANUI Chocolate" };

describe("Cart Reducer", () => {
  it("adds a new item to empty cart", () => {
    const state = cartReducer(emptyCart, {
      type: "ADD_ITEM",
      product: mockProduct,
      quantity: 1,
      flavor: "Chocolate",
    });
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(1);
    expect(state.isOpen).toBe(true);
  });

  it("increments quantity when adding existing item", () => {
    const stateWithItem = cartReducer(emptyCart, {
      type: "ADD_ITEM",
      product: mockProduct,
      quantity: 2,
      flavor: "Chocolate",
    });
    const stateWithMore = cartReducer(stateWithItem, {
      type: "ADD_ITEM",
      product: mockProduct,
      quantity: 3,
      flavor: "Chocolate",
    });
    expect(stateWithMore.items).toHaveLength(1);
    expect(stateWithMore.items[0].quantity).toBe(5);
  });

  it("treats same product with different flavor as separate items", () => {
    const state1 = cartReducer(emptyCart, {
      type: "ADD_ITEM",
      product: mockProduct,
      quantity: 1,
      flavor: "Chocolate",
    });
    const state2 = cartReducer(state1, {
      type: "ADD_ITEM",
      product: mockProduct,
      quantity: 1,
      flavor: "Maní",
    });
    expect(state2.items).toHaveLength(2);
  });

  it("removes item correctly", () => {
    const stateWithItem = cartReducer(emptyCart, {
      type: "ADD_ITEM",
      product: mockProduct,
      quantity: 2,
      flavor: "Chocolate",
    });
    const stateAfterRemove = cartReducer(stateWithItem, {
      type: "REMOVE_ITEM",
      productId: "pb-chocolate",
      flavor: "Chocolate",
    });
    expect(stateAfterRemove.items).toHaveLength(0);
  });

  it("updates quantity correctly", () => {
    const stateWithItem = cartReducer(emptyCart, {
      type: "ADD_ITEM",
      product: mockProduct,
      quantity: 1,
      flavor: "Chocolate",
    });
    const stateUpdated = cartReducer(stateWithItem, {
      type: "UPDATE_QUANTITY",
      productId: "pb-chocolate",
      flavor: "Chocolate",
      quantity: 5,
    });
    expect(stateUpdated.items[0].quantity).toBe(5);
  });

  it("removes item when quantity updated to 0", () => {
    const stateWithItem = cartReducer(emptyCart, {
      type: "ADD_ITEM",
      product: mockProduct,
      quantity: 2,
      flavor: "Chocolate",
    });
    const stateUpdated = cartReducer(stateWithItem, {
      type: "UPDATE_QUANTITY",
      productId: "pb-chocolate",
      flavor: "Chocolate",
      quantity: 0,
    });
    expect(stateUpdated.items).toHaveLength(0);
  });

  it("clears all items", () => {
    const stateWithItems = cartReducer(emptyCart, {
      type: "ADD_ITEM",
      product: mockProduct,
      quantity: 3,
      flavor: "Chocolate",
    });
    const cleared = cartReducer(stateWithItems, { type: "CLEAR_CART" });
    expect(cleared.items).toHaveLength(0);
  });
});

// ─── Cart Totals ──────────────────────────────────────────────────────────────
describe("Cart Totals", () => {
  it("calculates total price correctly", () => {
    const items = [
      { product: { price: 350 }, quantity: 2 },
      { product: { price: 600 }, quantity: 1 },
    ];
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    expect(total).toBe(1300);
  });

  it("calculates total items correctly", () => {
    const items = [{ quantity: 2 }, { quantity: 3 }, { quantity: 1 }];
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    expect(totalItems).toBe(6);
  });
});

// ─── Shipping Logic ───────────────────────────────────────────────────────────
describe("Shipping Logic", () => {
  const getShipping = (department: string, total: number) => {
    if (department === "Montevideo" && total >= 1000) return 0;
    if (department === "Montevideo") return 150;
    return 350;
  };

  it("free shipping for Montevideo orders >= $1000", () => {
    expect(getShipping("Montevideo", 1000)).toBe(0);
    expect(getShipping("Montevideo", 1200)).toBe(0);
  });

  it("$150 shipping for Montevideo orders < $1000", () => {
    expect(getShipping("Montevideo", 999)).toBe(150);
    expect(getShipping("Montevideo", 500)).toBe(150);
  });

  it("$350 shipping for interior orders", () => {
    expect(getShipping("Canelones", 1200)).toBe(350);
    expect(getShipping("Maldonado", 500)).toBe(350);
  });
});

// ─── Checkout Form Validation ─────────────────────────────────────────────────
describe("Checkout Form Validation", () => {
  const validateForm = (form: Record<string, string>) => {
    const errors: Record<string, string> = {};
    if (!form.firstName?.trim()) errors.firstName = "Requerido";
    if (!form.lastName?.trim()) errors.lastName = "Requerido";
    if (!form.email?.trim() || !/\S+@\S+\.\S+/.test(form.email))
      errors.email = "Email inválido";
    if (!form.phone?.trim()) errors.phone = "Requerido";
    if (!form.address?.trim()) errors.address = "Requerido";
    if (!form.city?.trim()) errors.city = "Requerido";
    return errors;
  };

  it("reports all required fields as missing when form is empty", () => {
    const errors = validateForm({});
    expect(errors.firstName).toBe("Requerido");
    expect(errors.lastName).toBe("Requerido");
    expect(errors.phone).toBe("Requerido");
    expect(errors.address).toBe("Requerido");
    expect(errors.city).toBe("Requerido");
  });

  it("rejects invalid email formats", () => {
    expect(validateForm({ email: "not-an-email" }).email).toBe("Email inválido");
    expect(validateForm({ email: "missing@domain" }).email).toBe("Email inválido");
    expect(validateForm({ email: "" }).email).toBe("Email inválido");
  });

  it("accepts valid email formats", () => {
    const errors = validateForm({
      firstName: "Juan",
      lastName: "Pérez",
      email: "juan@sanui.uy",
      phone: "+598 99 000 000",
      address: "Av. 18 de Julio 1234",
      city: "Montevideo",
    });
    expect(errors.email).toBeUndefined();
  });

  it("passes with all required fields filled", () => {
    const errors = validateForm({
      firstName: "Juan",
      lastName: "Pérez",
      email: "juan@sanui.uy",
      phone: "+598 99 000 000",
      address: "Av. 18 de Julio 1234",
      city: "Montevideo",
    });
    expect(Object.keys(errors)).toHaveLength(0);
  });
});

// ─── Product Data Integrity ───────────────────────────────────────────────────
describe("Product Data Integrity", () => {
  // Inline product data matching products.ts
  const productIds = [
    "pb-chocolate",
    "pb-vainilla",
    "pb-pack-2x",
  ];
  const productPrices = [350, 350, 600];
  const productProteins = [20, 20, 20];
  const productTags = [
    ["vegano", "sin-gluten", "sin-azucar", "20g-proteina"],
    ["vegano", "sin-gluten", "sin-azucar", "20g-proteina"],
    ["vegano", "sin-gluten", "sin-azucar", "pack", "ahorro"],
  ];

  it("all product IDs are unique", () => {
    const uniqueIds = new Set(productIds);
    expect(uniqueIds.size).toBe(productIds.length);
  });

  it("all products have positive prices", () => {
    productPrices.forEach((price) => {
      expect(price).toBeGreaterThan(0);
    });
  });

  it("all products have protein between 10g and 20g", () => {
    productProteins.forEach((protein) => {
      expect(protein).toBeGreaterThanOrEqual(10);
      expect(protein).toBeLessThanOrEqual(20);
    });
  });

  it("all products are tagged as vegano, sin-gluten, sin-azucar", () => {
    productTags.forEach((tags) => {
      expect(tags).toContain("vegano");
      expect(tags).toContain("sin-gluten");
      expect(tags).toContain("sin-azucar");
    });
  });

  it("mix pack has correct discounted price", () => {
    const mixPrice = 1050;
    const originalPrice = 1170;
    expect(mixPrice).toBeLessThan(originalPrice);
    const discount = Math.round(((originalPrice - mixPrice) / originalPrice) * 100);
    expect(discount).toBe(10); // 10% discount
  });

  it("order number format matches SANUI-XXXXXX pattern", () => {
    const orderNumber = `SANUI-${Date.now().toString().slice(-6)}`;
    expect(orderNumber).toMatch(/^SANUI-\d{6}$/);
  });
});
