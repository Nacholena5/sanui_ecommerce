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

// Placeholder image URLs using a gradient-based placeholder service
const PRODUCT_PLACEHOLDER = (flavor: string, color1: string, color2: string) =>
  `https://placehold.co/600x600/${color1}/${color2}?text=SANUI+${encodeURIComponent(flavor)}`;

export const products: Product[] = [
  {
    id: "pb-chocolate",
    name: "Protein Balls Chocolate",
    flavor: "Chocolate",
    category: "protein-balls",
    price: 390,
    weight: "120g",
    description:
      "Nuestras Protein Balls de Chocolate son intensas, energéticas y 100% irresistibles. Hechas con cacao puro, dátiles y proteína vegetal. Sin azúcares agregados, sin gluten y 100% veganas. El snack que tu rutina necesitaba.",
    shortDescription: "Intensas. Energéticas. Irresistibles.",
    protein: 12,
    calories: 210,
    carbs: 22,
    fat: 8,
    fiber: 4,
    ingredients:
      "Dátiles, proteína de guisante, cacao en polvo, mantequilla de almendras, semillas de chía, vainilla natural.",
    tags: ["vegano", "sin-gluten", "sin-azucar"],
    badge: "Más vendido",
    inStock: true,
    images: [
      PRODUCT_PLACEHOLDER("Chocolate", "1ABCFE", "FFFFFF"),
      PRODUCT_PLACEHOLDER("Chocolate+2", "0A8FBF", "FFFFFF"),
      PRODUCT_PLACEHOLDER("Chocolate+3", "2ECC71", "FFFFFF"),
    ],
    nutritionHighlights: [
      "12g de proteína por porción",
      "Sin azúcares agregados",
      "100% vegano",
      "Sin gluten",
      "Ingredientes reales",
    ],
  },
  {
    id: "pb-mani",
    name: "Protein Balls Maní",
    flavor: "Maní",
    category: "protein-balls",
    price: 390,
    weight: "120g",
    description:
      "La combinación perfecta de maní tostado y proteína vegetal. Crujientes por fuera, suaves por dentro. Un snack que te llena de energía sin culpa. Veganas, sin gluten y sin azúcar agregado.",
    shortDescription: "Crujientes. Saciantes. Adictivas.",
    protein: 13,
    calories: 225,
    carbs: 18,
    fat: 10,
    fiber: 3,
    ingredients:
      "Dátiles, mantequilla de maní, proteína de guisante, avena sin gluten, sal marina, vainilla natural.",
    tags: ["vegano", "sin-gluten", "sin-azucar"],
    badge: "Nuevo",
    inStock: true,
    images: [
      PRODUCT_PLACEHOLDER("Man%C3%AD", "F4D03F", "1A1A2E"),
      PRODUCT_PLACEHOLDER("Man%C3%AD+2", "E8B800", "1A1A2E"),
      PRODUCT_PLACEHOLDER("Man%C3%AD+3", "1ABCFE", "FFFFFF"),
    ],
    nutritionHighlights: [
      "13g de proteína por porción",
      "Sin azúcares agregados",
      "100% vegano",
      "Sin gluten",
      "Alto en fibra",
    ],
  },
  {
    id: "pb-coco-limon",
    name: "Protein Balls Coco & Limón",
    flavor: "Coco & Limón",
    category: "protein-balls",
    price: 390,
    weight: "120g",
    description:
      "Frescura tropical en cada mordida. Coco rallado, ralladura de limón y proteína vegetal en una combinación que te transporta directo al verano. Perfectas para el calor, el gym o donde sea.",
    shortDescription: "Frescas. Tropicales. Verano todo el año.",
    protein: 11,
    calories: 195,
    carbs: 20,
    fat: 7,
    fiber: 4,
    ingredients:
      "Dátiles, coco rallado, proteína de guisante, ralladura de limón, aceite de coco, vainilla natural.",
    tags: ["vegano", "sin-gluten", "sin-azucar"],
    inStock: true,
    images: [
      PRODUCT_PLACEHOLDER("Coco+Lim%C3%B3n", "2ECC71", "FFFFFF"),
      PRODUCT_PLACEHOLDER("Coco+2", "27AE60", "FFFFFF"),
      PRODUCT_PLACEHOLDER("Coco+3", "1ABCFE", "FFFFFF"),
    ],
    nutritionHighlights: [
      "11g de proteína por porción",
      "Sin azúcares agregados",
      "100% vegano",
      "Sin gluten",
      "Sabor natural",
    ],
  },
  {
    id: "pb-mix",
    name: "Mix SANUI - 3 Sabores",
    flavor: "Mix",
    category: "pack",
    price: 1050,
    originalPrice: 1170,
    weight: "3 x 120g",
    description:
      "¿No podés elegir? No tenés que hacerlo. El Mix SANUI trae los 3 sabores juntos: Chocolate, Maní y Coco & Limón. El pack perfecto para probar todo o para tener variedad toda la semana.",
    shortDescription: "Los 3 sabores. Un solo pack. Sin excusas.",
    protein: 12,
    calories: 210,
    carbs: 20,
    fat: 8,
    fiber: 4,
    ingredients: "Ver cada sabor por separado.",
    tags: ["vegano", "sin-gluten", "sin-azucar", "pack"],
    badge: "Ahorrá 10%",
    inStock: true,
    images: [
      PRODUCT_PLACEHOLDER("Mix+Pack", "1ABCFE", "FFFFFF"),
      PRODUCT_PLACEHOLDER("Mix+2", "2ECC71", "FFFFFF"),
      PRODUCT_PLACEHOLDER("Mix+3", "F4D03F", "1A1A2E"),
    ],
    nutritionHighlights: [
      "3 sabores distintos",
      "Sin azúcares agregados",
      "100% vegano",
      "Sin gluten",
      "Ahorrá vs. compra individual",
    ],
  },
  {
    id: "pb-trek",
    name: "SANUI TREK 120g",
    flavor: "Trek Mix",
    category: "protein-balls",
    price: 420,
    weight: "120g",
    description:
      "El snack para los que no paran. Formulado para máximo rendimiento: más proteína, más energía, más sabor. Ideal para antes o después del entrenamiento.",
    shortDescription: "Máximo rendimiento. Mínimo esfuerzo.",
    protein: 15,
    calories: 230,
    carbs: 19,
    fat: 9,
    fiber: 5,
    ingredients:
      "Dátiles, proteína de guisante, almendras, semillas de girasol, cacao, maca, sal marina.",
    tags: ["vegano", "sin-gluten", "sin-azucar", "alto-proteina"],
    badge: "Alto en proteína",
    inStock: true,
    images: [
      PRODUCT_PLACEHOLDER("Trek", "1A1A2E", "F4D03F"),
      PRODUCT_PLACEHOLDER("Trek+2", "1ABCFE", "FFFFFF"),
      PRODUCT_PLACEHOLDER("Trek+3", "2ECC71", "FFFFFF"),
    ],
    nutritionHighlights: [
      "15g de proteína por porción",
      "Sin azúcares agregados",
      "100% vegano",
      "Sin gluten",
      "Con maca energizante",
    ],
  },
  {
    id: "pb-caramelo",
    name: "Protein Balls Caramelo",
    flavor: "Caramelo",
    category: "protein-balls",
    price: 390,
    weight: "120g",
    description:
      "El sabor que todos pedían. Caramelo natural con dátiles y proteína vegetal. Dulce sin serlo demasiado. El snack que te hace olvidar que estás cuidando lo que comés.",
    shortDescription: "Dulce. Natural. Sin culpa.",
    protein: 11,
    calories: 205,
    carbs: 24,
    fat: 7,
    fiber: 3,
    ingredients:
      "Dátiles, proteína de guisante, mantequilla de anacardo, extracto de vainilla, sal marina.",
    tags: ["vegano", "sin-gluten", "sin-azucar"],
    inStock: false,
    images: [
      PRODUCT_PLACEHOLDER("Caramelo", "E8B800", "1A1A2E"),
      PRODUCT_PLACEHOLDER("Caramelo+2", "F4D03F", "1A1A2E"),
      PRODUCT_PLACEHOLDER("Caramelo+3", "1ABCFE", "FFFFFF"),
    ],
    nutritionHighlights: [
      "11g de proteína por porción",
      "Sin azúcares agregados",
      "100% vegano",
      "Sin gluten",
      "Dulce natural",
    ],
  },
];

export const categories = [
  { id: "all", label: "Todos" },
  { id: "protein-balls", label: "Protein Balls" },
  { id: "pack", label: "Packs" },
];

export const flavors = [
  { id: "all", label: "Todos los sabores" },
  { id: "Chocolate", label: "Chocolate" },
  { id: "Maní", label: "Maní" },
  { id: "Coco & Limón", label: "Coco & Limón" },
  { id: "Trek Mix", label: "Trek" },
  { id: "Caramelo", label: "Caramelo" },
  { id: "Mix", label: "Mix Pack" },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(id: string, limit = 3): Product[] {
  return products.filter((p) => p.id !== id).slice(0, limit);
}
