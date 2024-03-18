// import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from './AuthTypes';
import { ErrorResponse } from 'store/ReduxTypes';

// Types definitions
interface SignInValues {
  email: string;
  password: string;
}

interface SignUpValues {
  email: string;
  password: string;
  name: string;
}

interface AuthResponse {
  accessToken: string;
}

const signInOperation = createAsyncThunk<
  AuthResponse,
  SignInValues,
  { rejectValue: ErrorResponse }
>('auth/signIn', async (values, { rejectWithValue }) => {
  try {
    // Simulated API call
    // const response = await axios.post<AuthResponse>('/api/auth/signIn', values);
    return { accessToken: '123' }; // Simulate successful sign-in
  } catch (error: any) {
    return rejectWithValue({ message: error.message || 'Failed to sign-in' });
  }
});

const signUpOperation = createAsyncThunk<void, SignUpValues, { rejectValue: ErrorResponse }>(
  'auth/signUp',
  async (values, { rejectWithValue }) => {
    try {
      console.log(values);
      // Simulated API call
      // await axios.post('/api/auth/signUp', values);
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
      // Simulated API call
      // await axios.get('/api/auth/signOut');
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
      // Simulated API call
      // const response = await axios.get<AuthResponse>('/api/auth/refresh');
      return { accessToken: '456' }; // Simulate token refresh
    } catch (error: any) {
      return rejectWithValue({ message: error.message || 'Token refresh failed' });
    }
  },
);

const getUserOperation = createAsyncThunk<User, void, { rejectValue: ErrorResponse }>(
  'user/get',
  async (_, { rejectWithValue }) => {
    try {
      // Simulated API call
      // const response = await axios.get<User>('/api/user');
      return { id: '123', name: 'John Doe', email: 'johndoe@example.com' }; // Simulate fetching user
    } catch (error: any) {
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
