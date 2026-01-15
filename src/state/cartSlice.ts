import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Extra = { id: string; name: string; price: number };
type Side = { id: string; name: string; included?: boolean; price?: number };
type Drink = { id: string; name: string; price?: number };

export type CartItem = {
  id: number;            // menu item id
  name: string;
  basePrice: number;
  quantity: number;
  sides?: Side[];        // chosen sides (some included)
  drinks?: Drink[];      // chosen drinks (may add price)
  extras?: Extra[];      // add-on extras (adds price)
  notes?: string;        // optional ingredients removed/added
};

type CartState = { items: CartItem[] };

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const key = JSON.stringify({ id: action.payload.id, sides: action.payload.sides, drinks: action.payload.drinks, extras: action.payload.extras, notes: action.payload.notes });
      const existing = state.items.find(i => JSON.stringify({ id: i.id, sides: i.sides, drinks: i.drinks, extras: i.extras, notes: i.notes }) === key);
      if (existing) existing.quantity += action.payload.quantity;
      else state.items.push(action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ index: number; quantity: number }>) => {
      const item = state.items[action.payload.index];
      if (!item) return;
      item.quantity = Math.max(1, action.payload.quantity);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1);
    },
    clearCart: (state) => {
      state.items = [];
    },
    updateItemOptions: (state, action: PayloadAction<{ index: number; sides?: Side[]; drinks?: Drink[]; extras?: Extra[]; notes?: string }>) => {
      const item = state.items[action.payload.index];
      if (!item) return;
      Object.assign(item, action.payload);
    },
  },
});

export const { addToCart, updateQuantity, removeItem, clearCart, updateItemOptions } = cartSlice.actions;
export default cartSlice.reducer;
