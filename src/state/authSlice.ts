import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Card = { brand: string; last4: string; token: string };
type User = {
  uid: string;
  name: string;
  surname: string;
  email: string;
  contact: string;
  address: string;
  card?: Card;
};

type AuthState = {
  user: User | null;
};

const initialState: AuthState = { user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    login: (state, action: PayloadAction<{ email: string; uid: string }>) => {
      if (state.user && state.user.email === action.payload.email) return;
      // demo: accept login if email matches a previously registered user
    },
    logout: (state) => {
      state.user = null;
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (!state.user) return;
      state.user = { ...state.user, ...action.payload };
    },
    setCard: (state, action: PayloadAction<Card>) => {
      if (!state.user) return;
      state.user.card = action.payload;
    },
  },
});

export const { register, login, logout, updateProfile, setCard } = authSlice.actions;
export default authSlice.reducer;
