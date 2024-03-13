// import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const signIn = createAsyncThunk<any, any, any>(`api/auth/signin`, async wallet => {
  try {
    // const { data } = await axios.post(`api/auth/signIn`, { wallet });
    const data = { accessToken: '123' };

    return data;
  } catch (error: any) {
    console.error(error.message);
  }
});

const signOut = createAsyncThunk<any, any, any>(`api/auth/signout`, async () => {
  try {
    // const { data } = await axios.get(`api/auth/signOut`);
    const data = true;

    return data;
  } catch (error: any) {
    console.error(error.message);
  }
});

const refreshToken = createAsyncThunk<any, any, any>(`api/auth/refresh`, async () => {
  try {
    // const { data } = await axios.get(`api/auth/refresh`);
    const data = { accessToken: '123' };

    return data;
  } catch (error: any) {
    console.error(error.message);
  }
});

const getUser = createAsyncThunk<any, any, any>(`api/user`, async (_, thunkAPI) => {
  try {
    // const { data } = await axios.get(`api/user`);
    const data = { email: '123' };

    return data;
  } catch (error: any) {
    if (error.code === 429) {
      return console.error(error.message);
    }
  }
});

export { signIn, signOut, refreshToken, getUser };
