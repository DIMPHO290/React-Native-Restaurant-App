import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FoodItem, FoodCategory } from '@/types';
import { MENU } from '@/data/menu';

type MenuState = {
  items: FoodItem[];
  category: FoodCategory | 'All';
};

const initialState: MenuState = {
  items: MENU,
  category: 'All'
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<MenuState['category']>) {
      state.category = action.payload;
    }
  }
});

export const { setCategory } = menuSlice.actions;
export default menuSlice.reducer;
