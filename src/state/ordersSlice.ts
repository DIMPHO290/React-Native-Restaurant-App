import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { Order, CartItem } from '@/types';

type OrdersState = {
  orders: Order[];
};

const initialState: OrdersState = { orders: [] };

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    placeOrder(
      state,
      action: PayloadAction<{ userUid: string; items: CartItem[]; total: number; address: string }>
    ) {
      state.orders.push({
        id: nanoid(),
        userUid: action.payload.userUid,
        items: action.payload.items,
        total: action.payload.total,
        address: action.payload.address,
        placedAt: new Date().toISOString(),
        status: 'pending'
      });
    },
    updateOrderStatus(state, action: PayloadAction<{ id: string; status: Order['status'] }>) {
      const o = state.orders.find((ord) => ord.id === action.payload.id);
      if (o) o.status = action.payload.status;
    }
  }
});

export const { placeOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
