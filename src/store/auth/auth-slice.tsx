import { createSlice } from '@reduxjs/toolkit';
import {
  signInOperation,
  signOutOperation,
  getUserOperation,
  refreshTokenOperation,
} from './auth-operation';
import { AuthState } from './AuthTypes';

const initialState: AuthState = {
  accessToken: null,
  user: {
    id: null,
    name: null,
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
        name: null,
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
