import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  signInOperation,
  signUpOperation,
  signOutOperation,
  getUserOperation,
  refreshTokenOperation,
} from './auth-operations';
import { AuthState, User } from './AuthTypes';

// Define the initial state of the authentication module
const initialState: AuthState = {
  accessToken: null,
  user: {
    id: null,
    name: null,
    email: null,
  },
  isLoggedIn: false,
  error: null,
};

// Create a slice for the authentication features with reducers and extra reducers
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Define standard reducers here if needed
  },
  extraReducers: builder => {
    // Handle successful sign-in
    builder.addCase(
      signInOperation.fulfilled,
      (state, action: PayloadAction<{ accessToken: string }>) => {
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
      },
    );
    builder.addCase(signInOperation.rejected, (state, action) => {
      state.error = action.error.message || null;
    });

    // Handle successful sign-up
    builder.addCase(signUpOperation.fulfilled, (state, action) => {
      console.log('Sign up successful');
    });

    builder.addCase(signUpOperation.rejected, (state, action) => {
      state.error = action.error.message || null;
    });

    // Handle successful sign-out
    builder.addCase(signOutOperation.fulfilled, state => {
      state.accessToken = null;
      state.user = { id: null, name: null, email: null };
      state.isLoggedIn = false;
    });

    builder.addCase(signOutOperation.rejected, (state, action) => {
      state.error = action.error.message || null;
    });

    // Handle fetching user details
    builder.addCase(getUserOperation.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    });

    builder.addCase(getUserOperation.rejected, (state, action) => {
      state.error = action.error.message || null;
    });

    // Handle access token refresh
    builder.addCase(
      refreshTokenOperation.fulfilled,
      (state, action: PayloadAction<{ accessToken: string }>) => {
        state.accessToken = action.payload.accessToken;
      },
    );

    builder.addCase(refreshTokenOperation.rejected, (state, action) => {
      state.accessToken = null;
      state.error = action.error.message || null;
    });
  },
});

// Export the reducer as default export of this module
export default authSlice.reducer;
export { initialState };
