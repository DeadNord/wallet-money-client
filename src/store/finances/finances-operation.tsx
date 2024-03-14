// import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getBudgetOperation = createAsyncThunk<any, any, any>(`api/finances/budget`, async values => {
  try {
    // const { data } = await axios.post(`api/auth/signIn`, { wallet });
    console.log(values);
    const data = {
      budgetLimit: 500,
      monthlyExpenses: 50,
    };

    return data;
  } catch (error: any) {
    console.error(error.message);
  }
});

const getTransactionsOperation = createAsyncThunk<any, any, any>(`api/finances/transactions`, async values => {
  try {
    // const { data } = await axios.post(`api/auth/signIn`, { wallet });
    console.log(values);
    const data = {
      transactions: [
        {
          name: "McDonalds",
          date: "03.03.2024",
          amount: 25,
          type: 'Expense',
        },
        {
          name: '',
          date: "03.03.2024",
          amount: 25,
          type: 'Income',
        },
      ],
    };

    return data;
  } catch (error: any) {
    console.error(error.message);
  }
});

export { getBudgetOperation, getTransactionsOperation };
