import { createSlice } from '@reduxjs/toolkit';
import { signInOperation, signOutOperation, getUserOperation, refreshTokenOperation } from './auth-operation';

const initialState = {
  accessToken: null,
  user: {
    id: null,
    email: null,
  },
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(signInOperation.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = true;
    });
    builder.addCase(signOutOperation.fulfilled, (state, action) => {
      state.accessToken = null;
      state.user = {
        id: null,
        email: null,
      };
      state.isLoggedIn = false;
    });
    builder.addCase(getUserOperation.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(refreshTokenOperation.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
    });
  },
});
export default authSlice.reducer;
