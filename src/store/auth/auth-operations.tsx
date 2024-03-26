import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse, SignInValues, SignUpValues, User } from './AuthTypes';
import { ErrorResponse } from 'store/ReduxTypes';

const signInOperation = createAsyncThunk<
  AuthResponse,
  SignInValues,
  { rejectValue: ErrorResponse }
>('auth/signIn', async (values, { rejectWithValue }) => {
  try {
    const response = await axios.post<AuthResponse>('/auth/signIn', values);
    const { accessToken } = response.data;
    return { accessToken };
  } catch (error: any) {
    return rejectWithValue({ message: error.message || 'Failed to sign-in' });
  }
});

// const signInGoogleOperation = createAsyncThunk<
//   AuthResponse,
//   SignInValues,
//   { rejectValue: ErrorResponse }
// >('auth/signIn', async (values, { rejectWithValue }) => {
//   try {
//     // Simulated API call
//     // const response = await axios.post<AuthResponse>('/api/auth/signIn', values);
//     return { accessToken: '123' }; // Simulate successful sign-in
//   } catch (error: any) {
//     return rejectWithValue({ message: error.message || 'Failed to sign-in' });
//   }
// });

const signUpOperation = createAsyncThunk<void, SignUpValues, { rejectValue: ErrorResponse }>(
  'auth/signUp',
  async (values, { rejectWithValue }) => {
    try {
      await axios.post('/auth/signUp', values);
      // No need to return anything for a void operation
    } catch (error: any) {
      // Ensure rejection is handled correctly
      return rejectWithValue({ message: error.message || 'Failed to sign-up' });
    }
  },
);

const signOutOperation = createAsyncThunk<void, void, { rejectValue: ErrorResponse }>(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      await axios.get('/auth/signOut');
      // No need to return anything for a void operation
    } catch (error: any) {
      return rejectWithValue({ message: error.message || 'Failed to sign-in' });
    }
  },
);
const refreshTokenOperation = createAsyncThunk<AuthResponse, void, { rejectValue: ErrorResponse }>(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<AuthResponse>('/auth/refresh');
      const { accessToken } = response.data;
      return { accessToken };
    } catch (error: any) {
      return rejectWithValue({ message: error.message || 'Token refresh failed' });
    }
  },
);

// Redefine getUserOperation with additional refresh logic on 401 error
const getUserOperation = createAsyncThunk<User, void, { rejectValue: ErrorResponse }>(
  'auth/user',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get<User>('/auth/user');
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // Attempt to refresh the token
        const refreshAction = await dispatch(refreshTokenOperation());
        if (refreshAction.meta.requestStatus === 'fulfilled') {
          // Retry getUserOperation if the token refresh was successful
          const userResponse = await axios.get<User>('/api/user');
          return userResponse.data;
        }
      }
      // If error is not due to 401, reject with the original error
      return rejectWithValue({ message: error.message || 'Failed to fetch user' });
    }
  },
);

export {
  signInOperation,
  signUpOperation,
  signOutOperation,
  refreshTokenOperation,
  getUserOperation,
};
