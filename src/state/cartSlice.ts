import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { CartItem, CartCustomization, FoodItem } from '@/types';

type CartState = {
  items: CartItem[];
};

const initialState: CartState = { items: [] };

function calcExtraTotal(custom: CartCustomization): number {
  const extrasTotal = (custom.extras ?? []).reduce((sum, e) => sum + e.priceDelta, 0);
  const drinkDelta = custom.drinkChoice?.priceDelta ?? 0;
  return extrasTotal + drinkDelta;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{ item: FoodItem; qty: number; custom: CartCustomization }>
    ) {
      const { item, qty, custom } = action.payload;
      const id = nanoid();
      state.items.push({
        id,
        itemId: item.id,
        qty,
        basePrice: item.price,
        custom,
        name: item.name,
        image: item.image
      });
    },
    removeFromCart(state, action: PayloadAction<{ id: string }>) {
      state.items = state.items.filter((i) => i.id !== action.payload.id);
    },
    clearCart(state) {
      state.items = [];
    },
    editQty(state, action: PayloadAction<{ id: string; qty: number }>) {
      const it = state.items.find((i) => i.id === action.payload.id);
      if (it) it.qty = Math.max(1, action.payload.qty);
    },
    editCustomization(state, action: PayloadAction<{ id: string; custom: CartCustomization }>) {
      const it = state.items.find((i) => i.id === action.payload.id);
      if (it) it.custom = action.payload.custom;
    }
  }
});

export const { addToCart, removeFromCart, clearCart, editQty, editCustomization } = cartSlice.actions;

export const calcCartTotal = (items: CartItem[]): number =>
  items.reduce((sum, i) => sum + (i.basePrice + calcExtraTotal(i.custom)) * i.qty, 0);

export default cartSlice.reducer;
