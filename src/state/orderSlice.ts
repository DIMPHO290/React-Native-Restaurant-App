// src/state/orderSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type OrderItem = {
  id: string;
  uid: string;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    sides?: string[];
    drinks?: { name: string; price?: number }[];
    extras?: { name: string; price: number }[];
    options?: Record<string, any>;
  }>;
  total: number;
  status: "pending" | "paid" | "preparing" | "delivered" | "cancelled";
  createdAt: number;
};

type OrdersState = {
  list: OrderItem[];
};

const initialState: OrdersState = {
  list: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<OrderItem>) => {
      state.list.unshift(action.payload);
    },
    setStatus: (state, action: PayloadAction<{ id: string; status: OrderItem["status"] }>) => {
      const idx = state.list.findIndex(o => o.id === action.payload.id);
      if (idx !== -1) state.list[idx].status = action.payload.status;
    },
    clearOrders: (state) => {
      state.list = [];
    },
  },
});

export const { addOrder, setStatus, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
