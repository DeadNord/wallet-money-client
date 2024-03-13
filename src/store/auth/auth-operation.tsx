// import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const signInOperation = createAsyncThunk<any, any, any>(`api/auth/signin`, async values => {
  try {
    // const { data } = await axios.post(`api/auth/signIn`, { wallet });
    console.log(values);
    const data = { accessToken: '123' };

    return data;
  } catch (error: any) {
    console.error(error.message);
  }
});

const signOutOperation = createAsyncThunk<any, any, any>(`api/auth/signout`, async () => {
  try {
    // const { data } = await axios.get(`api/auth/signOut`);
    const data = true;

    return data;
  } catch (error: any) {
    console.error(error.message);
  }
});

const refreshTokenOperation = createAsyncThunk<any, any, any>(`api/auth/refresh`, async () => {
  try {
    // const { data } = await axios.get(`api/auth/refresh`);
    const data = { accessToken: '123' };

    return data;
  } catch (error: any) {
    console.error(error.message);
  }
});

const getUserOperation = createAsyncThunk<any, any, any>(`api/user`, async () => {
  try {
    // const { data } = await axios.get(`api/user`);
    const data = { id: "123", name: "Pol", email: 'darwefew@gmail.com' };

    return data;
  } catch (error: any) {
    if (error.code === 429) {
      return console.error(error.message);
    }
  }
});

export { signInOperation, signOutOperation, refreshTokenOperation, getUserOperation };
