import { createSlice } from '@reduxjs/toolkit';
import { signIn, signOut, getUser, refreshToken } from './auth-operation';

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
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = true;
    });
    builder.addCase(signOut.fulfilled, (state, action) => {
      state.accessToken = null;
      state.user = {
        id: null,
        email: null,
      };
      state.isLoggedIn = false;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
    });
  },
});
export default authSlice.reducer;
