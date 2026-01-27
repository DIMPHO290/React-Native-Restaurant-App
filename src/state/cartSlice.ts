// src/state/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartOption {
  id: string;
  name: string;
  price?: number;
}

interface CartItem {
  id: string;
  name: string;
  basePrice: number;
  sides?: CartOption[];
  drinks?: CartOption[];
  extras?: CartOption[];
  notes?: string;
  quantity: number;
  signature: string; // unique signature for item+options
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

// Helper to generate a unique signature for each item+options combo
const makeSignature = (item: Omit<CartItem, "signature" | "quantity">) =>
  JSON.stringify({
    id: item.id,
    sides: item.sides,
    drinks: item.drinks,
    extras: item.extras,
    notes: item.notes,
  });

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "signature">>) => {
      const payload = action.payload;
      const signature = makeSignature(payload);

      const existing = state.items.find(i => i.signature === signature);

      if (existing) {
        existing.quantity += payload.quantity ?? 1;
      } else {
        state.items.push({
          ...payload,
          quantity: payload.quantity ?? 1,
          signature,
        });
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ index: number; quantity: number }>
    ) => {
      const { index, quantity } = action.payload;
      if (state.items[index]) {
        state.items[index].quantity = Math.max(1, quantity);
      }
    },

    removeItem: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
