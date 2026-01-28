// src/state/ordersSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "./cartSlice";

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "completed" | "cancelled";
  user?: any;
}

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (
      state,
      action: PayloadAction<{ items: CartItem[]; total: number; user?: any }>
    ) => {
      const { items, total, user } = action.payload;
      state.orders.push({
        id: Date.now().toString(),
        items,
        total,
        status: "pending", // ✅ default status
        user,
      });
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{ id: string; status: "pending" | "completed" | "cancelled" }>
    ) => {
      const order = state.orders.find(o => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    },
    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const { addOrder, updateOrderStatus, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
