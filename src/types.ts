export type UserProfile = {
  uid: string;
  name: string;
  surname?: string;
  email: string;
  contactNumber: string;
  address: string;
  cardLast4?: string;
  defaultCardToken?: string; // mock token
};

export type FoodCategory = 'Mains' | 'Burgers' | 'Starters' | 'Dessert' | 'Beverages' | 'Alcohols';

export type FoodItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: FoodCategory;
  sides?: string[];     // included choices (choose up to N)
  drinks?: { label: string; priceDelta?: number }[];
  extras?: { label: string; priceDelta: number }[];
  options?: { label: string; removable?: boolean }[]; // e.g., lettuce
};

export type CartCustomization = {
  sideChoice?: string[];
  drinkChoice?: { label: string; priceDelta?: number } | null;
  extras?: { label: string; priceDelta: number }[];
  removedOptions?: string[];
};

export type CartItem = {
  id: string;
  itemId: string;
  qty: number;
  basePrice: number;
  custom: CartCustomization;
  name: string;
  image: string;
};

export type Order = {
  id: string;
  userUid: string;
  items: CartItem[];
  total: number;
  address: string;
  placedAt: string;
  status: 'pending' | 'preparing' | 'delivered';
};
