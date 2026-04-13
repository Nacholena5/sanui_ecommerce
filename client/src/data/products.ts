export interface Product {
  id: string;
  name: string;
  flavor: string;
  category: string;
  price: number;
  originalPrice?: number;
  weight: string;
  description: string;
  shortDescription: string;
  protein: number;
  calories: number;
  carbs: number;
  fat: number;
  fiber: number;
  ingredients: string;
  tags: string[];
  badge?: string;
  inStock: boolean;
  images: string[];
  nutritionHighlights: string[];
}

// Fotos reales de @sanui.uy (Instagram)
import { IG } from "./igPhotos";
const IMG = {
  choco: IG.product_hero,
  vanilla: IG.product_2,
  peanut: IG.product_gym,
  lifestyle: IG.lifestyle_event,
  gym: IG.gym_event,
};

export const products: Product[] = [
  {
    id: "pb-chocolate",
    name: "Bolitas Proteicas SANUI Chocolate",
    flavor: "Chocolate",
    category: "protein-balls",
    price: 320,
    weight: "120g (15 bolitas)",
    description:
      "Las Bolitas Proteicas SANUI de chocolate son el snack perfecto para quienes entrenan o cuidan su alimentación. Con 20g de proteína por porción, veganas, sin gluten y sin azúcar. Hechas con ingredientes reales como pasta de dátiles, pasta de maní, harina de avena, sucralosa, cacao, vainilla, coco rallado, aceite de coco y whey vegano de Cibeles. Cada tarro contiene 15 bolitas de 8g cada una.",
    shortDescription: "20g de proteína. Veganas. Sin gluten. Sin azúcar.",
    protein: 20,
    calories: 180,
    carbs: 15,
    fat: 6,
    fiber: 3,
    ingredients:
      "Pasta de dátiles, pasta de maní, harina de avena, sucralosa, cacao, vainilla, coco rallado, aceite de coco, whey vegano de Cibeles.",
    tags: ["vegano", "sin-gluten", "sin-azucar", "20g-proteina"],
    badge: "Más vendido",
    inStock: true,
    images: [IMG.choco, IMG.lifestyle, IMG.gym],
    nutritionHighlights: [
      "20g de proteína por porción",
      "Sin azúcares agregados",
      "100% vegano",
      "Sin gluten",
      "Ingredientes reales y transparentes",
    ],
  },
  {
    id: "pb-vainilla",
    name: "Bolitas Proteicas SANUI Vainilla",
    flavor: "Vainilla",
    category: "protein-balls",
    price: 320,
    weight: "120g (15 bolitas)",
    description:
      "Las Bolitas Proteicas SANUI de vainilla son ideales para un snack saludable y delicioso. Con 20g de proteína por porción, completamente veganas, sin gluten y sin azúcar. Preparadas con pasta de dátiles, pasta de maní, harina de avena, sucralosa, vainilla, coco rallado, aceite de coco y whey vegano de Cibeles. Cada tarro trae 15 bolitas de 8g cada una, perfectas para llevar a cualquier lado.",
    shortDescription: "20g de proteína. Veganas. Sin gluten. Sin azúcar.",
    protein: 20,
    calories: 180,
    carbs: 15,
    fat: 6,
    fiber: 3,
    ingredients:
      "Pasta de dátiles, pasta de maní, harina de avena, sucralosa, vainilla, coco rallado, aceite de coco, whey vegano de Cibeles.",
    tags: ["vegano", "sin-gluten", "sin-azucar", "20g-proteina"],
    badge: "Favorito",
    inStock: true,
    images: [IMG.vanilla, IMG.lifestyle, IMG.gym],
    nutritionHighlights: [
      "20g de proteína por porción",
      "Sin azúcares agregados",
      "100% vegano",
      "Sin gluten",
      "Sabor suave y natural",
    ],
  },
  {
    id: "pb-pack-2x",
    name: "Pack 2x Bolitas Proteicas SANUI",
    flavor: "Pack Chocolate + Vainilla",
    category: "pack",
    price: 550,
    weight: "2 x 120g (30 bolitas)",
    description:
      "El pack perfecto para no quedarte sin tus Bolitas Proteicas SANUI favoritas. Incluye un tarro de chocolate y uno de vainilla, con 20g de proteína cada uno. Veganas, sin gluten y sin azúcar. Ahorra $90 comparado con comprar por separado. Ideal para quienes quieren variedad o compartir con amigos.",
    shortDescription: "Los 2 sabores. Más ahorro. Más proteína.",
    protein: 20,
    calories: 180,
    carbs: 15,
    fat: 6,
    fiber: 3,
    ingredients: "Ver cada sabor por separado.",
    tags: ["vegano", "sin-gluten", "sin-azucar", "pack", "ahorro"],
    badge: "Ahorra $90",
    inStock: true,
    images: [IMG.choco, IMG.vanilla, IMG.lifestyle],
    nutritionHighlights: [
      "20g de proteína por porción",
      "Sin azúcares agregados",
      "100% vegano",
      "Sin gluten",
      "Pack conveniente",
    ],
  },
];

export const categories = [
  { id: "all", label: "Todos" },
  { id: "protein-balls", label: "Bolitas Proteicas" },
  { id: "pack", label: "Packs" },
];

export const flavors = [
  { id: "all", label: "Todos los sabores" },
  { id: "Chocolate", label: "Chocolate" },
  { id: "Vainilla", label: "Vainilla" },
  { id: "Pack Chocolate + Vainilla", label: "Pack 2x" },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(id: string, limit = 3): Product[] {
  return products.filter((p) => p.id !== id).slice(0, limit);
}
