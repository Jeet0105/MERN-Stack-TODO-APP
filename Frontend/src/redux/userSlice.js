import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },    
    signOut: (state) => {
      state.currentUser = null;
      state.loading = null;
      state.error = null;
    }
  },
});

export const { signInSuccess,signOut,signInStart,signInFailure } = userSlice.actions;

export default userSlice.reducer;
