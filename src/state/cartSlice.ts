// src/state/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
  name: string;
  basePrice: number;
  quantity: number;
  sides?: { id: string; name: string }[];
  drinks?: { id: string; name: string; price?: number }[];
  extras?: { id: string; name: string; price?: number }[];
  notes?: string;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },

    updateItem: (
      state,
      action: PayloadAction<{ index: number; item: CartItem }>
    ) => {
      state.items[action.payload.index] = action.payload.item;
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ index: number; quantity: number }>
    ) => {
      const item = state.items[action.payload.index];
      if (item) item.quantity = action.payload.quantity;
    },

    removeItem: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1);
    },

    clearCart: state => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  updateItem,
  updateQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
