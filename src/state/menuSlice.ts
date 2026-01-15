import { createSlice } from "@reduxjs/toolkit";
import { menuItems } from "../data/menu";

const menuSlice = createSlice({
  name: "menu",
  initialState: { items: menuItems, category: "All" as string },
  reducers: {
    setCategory: (state, action) => { state.category = action.payload; },
  },
});

export const { setCategory } = menuSlice.actions;
export default menuSlice.reducer;
