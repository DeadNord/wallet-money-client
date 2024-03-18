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
          {
            name: 'Freelance',
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

const getExpensesByCategoriesOperation = createAsyncThunk<any, any, any>(
  `api/finances/categories`,
  async values => {
    try {
      // const { data } = await axios.post(`api/auth/signIn`, { wallet });

      // const generatePurpleShades = (numShades: number) => {
      //   const shades = [];
      //   const maxLightness = 90; // Максимальная светлость для самого светлого оттенка
      //   const minLightness = 30; // Минимальная светлость для самого темного оттенка

      //   for (let i = 0; i < numShades; i++) {
      //     const lightness = minLightness + (maxLightness - minLightness) * (i / (numShades - 1));
      //     shades.push(`hsl(270, 50%, ${lightness}%)`); // HSL для фиолетового цвета (270°)
      //   }

      //   return shades;
      // };

      const data = [
        {
          category: 'Groceries',
          value: 25,
          color: '#8020C9',
        },
        {
          category: 'Digital',
          value: 25,
          color: '#8067C8',
        },
        {
          category: 'Others',
          value: 25,
          color: '#2067C7',
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
        { name: 'Mo', income: 4000, outcome: 2400 },
        { name: 'Tu', income: 3000, outcome: 1398 },
        { name: 'We', income: 2000, outcome: 9800 },
        { name: 'Th', income: 2780, outcome: 3908 },
        { name: 'Fr', income: 1890, outcome: 4800 },
        { name: 'St', income: 2390, outcome: 3800 },
        { name: 'Sn', income: 3490, outcome: 4300 },
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
  getExpensesByCategoriesOperation,
};
