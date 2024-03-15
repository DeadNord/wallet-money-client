// import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getBudgetOperation = createAsyncThunk<any, any, any>(`api/finances/budget`, async values => {
  try {
    // const { data } = await axios.post(`api/auth/signIn`, { wallet });
    // console.log(values);
    const data = {
      budgetLimit: 500,
      monthlyExpenses: 50,
    };

    return data;
  } catch (error: any) {
    console.error(error.message);
  }
});

const getTransactionsOperation = createAsyncThunk<any, any, any>(
  `api/finances/transactions`,
  async values => {
    try {
      // const { data } = await axios.post(`api/auth/signIn`, { wallet });
      // console.log(values);
      const data = {
        transactions: [
          {
            name: 'McDonalds',
            date: '03.03.2024',
            amount: 25,
            type: 'Expense',
            category: 'Groceries',
          },
          {
            name: 'Internet',
            date: '03.03.2024',
            amount: 25,
            type: 'Expense',
            category: 'Digital',
          },
          {
            name: 'Shops',
            date: '03.03.2024',
            amount: 25,
            type: 'Expense',
            category: 'Others',
          },
          {
            name: 'Salary',
            date: '03.03.2024',
            amount: 25,
            type: 'Income',
            category: 'Digital',
          },
        ],
      };

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  },
);

const getTransactionsByCategoriesPerMountsOperation = createAsyncThunk<any, any, any>(
  `api/finances/categories`,
  async values => {
    try {
      // const { data } = await axios.post(`api/auth/signIn`, { wallet });

      const data = [
        {
          category: '',
          value: '',
          color: '',
        },
        {
          category: '',
          value: '',
          color: '',
        },
        {
          category: '',
          value: '',
          color: '',
        },
      ];

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  },
);

const getTransactionsByWeekOperation = createAsyncThunk<any, any, any>(
  `api/finances/byWeek`,
  async values => {
    try {
      // const { data } = await axios.post(`api/auth/signIn`, { wallet });

      const data = [
        { name: 'Mo', Income: 4000, Outcome: 2400 },
        { name: 'Tu', Income: 3000, Outcome: 1398 },
        { name: 'We', Income: 2000, Outcome: 9800 },
        { name: 'Th', Income: 2780, Outcome: 3908 },
        { name: 'Fr', Income: 1890, Outcome: 4800 },
        { name: 'St', Income: 2390, Outcome: 3800 },
        { name: 'Sn', Income: 3490, Outcome: 4300 },
      ];

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  },
);

export {
  getBudgetOperation,
  getTransactionsOperation,
  getTransactionsByWeekOperation,
  getTransactionsByCategoriesPerMountsOperation,
};
