// import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  BudgetResponceData,
  CategoryExpense,
  Transaction,
  TransactionType,
  WeeklyTransactionSummary,
} from './FinancesTypes';
import { ErrorResponse } from 'store/ReduxTypes';

const getBudgetOperation = createAsyncThunk<
  BudgetResponceData,
  void,
  { rejectValue: ErrorResponse }
>('api/finances/budget', async (_, { rejectWithValue }) => {
  try {
    // Simulated API response
    const data: BudgetResponceData = { budgetLimit: 500, monthlyExpenses: 50 };
    return data;
  } catch (error: any) {
    return rejectWithValue({ message: error.message || 'Failed to fetch budget information' });
  }
});

const getTransactionsOperation = createAsyncThunk<
  Transaction[],
  void,
  { rejectValue: ErrorResponse }
>('api/finances/transactions', async (_, { rejectWithValue }) => {
  try {
    // Simulated API response
    const transactions: Transaction[] = [
      {
        name: 'McDonalds',
        date: '03.03.2024',
        amount: 25,
        type: TransactionType.expense,
        category: 'Groceries',
      },
      {
        name: 'Internet',
        date: '03.03.2024',
        amount: 25,
        type: TransactionType.expense,
        category: 'Digital',
      },
      {
        name: 'Shops',
        date: '03.03.2024',
        amount: 25,
        type: TransactionType.expense,
        category: 'Others',
      },
      {
        name: 'Salary',
        date: '03.03.2024',
        amount: 25,
        type: TransactionType.income,
        category: 'Digital',
      },
      {
        name: 'Freelance',
        date: '03.03.2024',
        amount: 25,
        type: TransactionType.income,
        category: 'Digital',
      },
    ];
    return transactions;
  } catch (error: any) {
    return rejectWithValue({ message: error.message || 'Failed to fetch transactions' });
  }
});

const getExpensesByCategoriesOperation = createAsyncThunk<
  CategoryExpense[],
  void,
  { rejectValue: ErrorResponse }
>('api/finances/categories', async (_, { rejectWithValue }) => {
  try {
    // Simulated API response
    const expenses: CategoryExpense[] = [
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
    return expenses;
  } catch (error: any) {
    return rejectWithValue({ message: error.message || 'Failed to fetch expenses by categories' });
  }
});

const getTransactionsByWeekOperation = createAsyncThunk<
  WeeklyTransactionSummary[],
  void,
  { rejectValue: ErrorResponse }
>('api/finances/byWeek', async (_, { rejectWithValue }) => {
  try {
    // Simulated API response
    const weeklySummary: WeeklyTransactionSummary[] = [
      { name: 'Mo', income: 4000, outcome: 2400 },
      { name: 'Tu', income: 3000, outcome: 1398 },
      { name: 'We', income: 2000, outcome: 9800 },
      { name: 'Th', income: 2780, outcome: 3908 },
      { name: 'Fr', income: 1890, outcome: 4800 },
      { name: 'St', income: 2390, outcome: 3800 },
      { name: 'Sn', income: 3490, outcome: 4300 },
    ];
    return weeklySummary;
  } catch (error: any) {
    return rejectWithValue({ message: error.message || 'Failed to fetch weekly transactions' });
  }
});

const addTransactionOperation = createAsyncThunk<
  Transaction,
  Transaction,
  { rejectValue: ErrorResponse }
>('api/finances/add', async (transactionData, { rejectWithValue }) => {
  try {
    // Replace with actual API call
    // const response = await axios.post<Transaction>('api/finances/add', transactionData);
    // return response.data;
    return transactionData; // Remove this when API is connected
  } catch (error: any) {
    return rejectWithValue({
      message: error.response?.data?.message || 'Failed to add transaction',
    });
  }
});

// Removing an existing transaction
const removeTransactionOperation = createAsyncThunk<string, string, { rejectValue: ErrorResponse }>(
  'api/finances/remove',
  async (transactionId, { rejectWithValue }) => {
    try {
      // Replace with actual API call
      // await axios.delete(`api/finances/remove/${transactionId}`);
      return transactionId; // This could be the ID of the removed transaction. Remove when API is connected.
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Failed to remove transaction',
      });
    }
  },
);

export {
  getBudgetOperation,
  getTransactionsOperation,
  addTransactionOperation,
  removeTransactionOperation,
  getTransactionsByWeekOperation,
  getExpensesByCategoriesOperation,
};
