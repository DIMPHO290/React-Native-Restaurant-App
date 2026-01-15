import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { UserProfile } from '@/types';

type AuthState = {
  user: UserProfile | null;
};

const initialState: AuthState = { user: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register(state, action: PayloadAction<Omit<UserProfile, 'uid'>>) {
      const uid = nanoid();
      state.user = { uid, ...action.payload };
    },
    login(state, action: PayloadAction<{ email: string }>) {
      // Demo-only: auto “login” using email
      if (!state.user || state.user.email !== action.payload.email) {
        state.user = {
          uid: nanoid(),
          email: action.payload.email,
          name: 'Guest',
          surname: '',
          address: '',
          contactNumber: '',
          cardLast4: undefined
        };
      }
    },
    logout(state) {
      state.user = null;
    },
    updateProfile(state, action: PayloadAction<Partial<UserProfile>>) {
      if (!state.user) return;
      state.user = { ...state.user, ...action.payload };
    }
  }
});

export const { register, login, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
