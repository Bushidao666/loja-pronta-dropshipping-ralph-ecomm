// src/lib/constants.ts

// Data for simulated sale notifications
// Based on the sales_funnel_briefing.md

export const BRAZILIAN_NAMES: string[] = [
  "Maria S.", "José P.", "Ana L.", "João C.", "Mariana F.",
  "Pedro A.", "Sofia M.", "Lucas R.", "Laura B.", "Gabriel G.",
  // Add more names as needed based on the briefing or for variety
  "Julia V.", "Matheus H.", "Isabela N.", "Rafael T.", "Manuela K."
];

export interface Product {
  name: string;
  price: number; // Store as a number for easier calculations
  formattedPrice: string; // For display, e.g., "R$ 89,90"
}

export const PRODUCTS_SOLD: Product[] = [
  { name: "Fone Bluetooth", price: 89.90, formattedPrice: "89,90" },
  { name: "Relógio Inteligente", price: 129.50, formattedPrice: "129,50" },
  { name: "Mini Câmera", price: 75.00, formattedPrice: "75,00" },
  { name: "Caixa de Som Portátil", price: 110.00, formattedPrice: "110,00" },
  { name: "Carregador Sem Fio", price: 65.30, formattedPrice: "65,30" },
  // Add more products based on the briefing
  { name: "Luminária LED USB", price: 49.99, formattedPrice: "49,99" },
  { name: "Teclado Gamer Compacto", price: 159.90, formattedPrice: "159,90" },
  { name: "Mouse Ergonômico", price: 79.00, formattedPrice: "79,00" },
  { name: "Garrafa Térmica Inteligente", price: 99.90, formattedPrice: "99,90" },
  { name: "Suporte para Celular Veicular", price: 35.75, formattedPrice: "35,75" },
];

// Notification settings
export const NOTIFICATION_CONFIG = {
  minIntervalSeconds: 8, // Minimum interval between subsequent notifications (after the first one)
  maxIntervalSeconds: 12, // Maximum interval
  firstNotificationDelayMs: 0, // First notification is instant after advancing step
  timestampFormat: "há {minutes} min", // Example, can be more dynamic
  profitMarginPercent: 0.35, // Example: 35% profit margin on sales for simulated profit calculation
};

// Funnel Step Configuration (can be expanded later)
export const FUNNEL_STEPS_CONFIG = {
  ETAPA_1: {
    title: "Etapa 1: Gancho e Credibilidade",
    // ... other specific configs for etapa 1
  },
  ETAPA_2: {
    title: "Etapa 2: Dor e Solução Milagrosa",
  },
  ETAPA_3: {
    title: "Etapa 3: Exclusividade e Escolha",
  },
  ETAPA_4: {
    title: "Etapa 4: Urgência e Escassez",
    timerMinutes: 10, // Default timer for etapa 4
  },
  ETAPA_5: {
    title: "Etapa 5: Oferta Irresistível e Checkout",
  },
};

// General texts or configurations
// export const SITE_TITLE = "Sua Loja Pronta Dropshipping";

/**
 * Helper function to get a random item from an array.
 * @param arr The array to pick from.
 * @returns A random item from the array.
 */
export function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
} 