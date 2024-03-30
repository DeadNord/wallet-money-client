// import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  BudgetResponceData,
  Category,
  CategoryExpense,
  Transaction,
  TransactionReturnedData,
  TransactionSentData,
  TransactionType,
  WeeklyTransactionSummary,
} from './FinancesTypes';
import { ErrorResponse } from 'store/ReduxTypes';
import axios from 'axios';

const getBudgetOperation = createAsyncThunk<
  BudgetResponceData,
  void,
  { rejectValue: ErrorResponse }
>('finances/budget/', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<BudgetResponceData>('finances/budget/');
    return response.data;
  } catch (error: any) {
    return rejectWithValue({ message: error.message || 'Failed to fetch budget information' });
  }
});

const getTransactionsOperation = createAsyncThunk<
  Transaction[],
  void,
  { rejectValue: ErrorResponse }
>('finances/transactions', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<Transaction[]>('finances/transactions/');
    return response.data;
  } catch (error: any) {
    return rejectWithValue({ message: error.message || 'Failed to fetch transactions' });
  }
});

const getExpensesByCategoriesOperation = createAsyncThunk<
  CategoryExpense[],
  void,
  { rejectValue: ErrorResponse }
>('finances/expensesByCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<CategoryExpense[]>('finances/expenses-by-categories/');
    return response.data;
  } catch (error: any) {
    return rejectWithValue({ message: error.message || 'Failed to fetch expenses by categories' });
  }
});

const getTransactionsByWeekOperation = createAsyncThunk<
  WeeklyTransactionSummary[],
  void,
  { rejectValue: ErrorResponse }
>('finances/byWeek', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<WeeklyTransactionSummary[]>('finances/transactions-by-week/');
    return response.data;
  } catch (error: any) {
    return rejectWithValue({ message: error.message || 'Failed to fetch weekly transactions' });
  }
});

const addTransactionOperation = createAsyncThunk<
  TransactionReturnedData,
  TransactionSentData,
  { rejectValue: ErrorResponse }
>('finances/add-transaction', async (transactionData, { rejectWithValue }) => {
  try {
    const response = await axios.post<TransactionReturnedData>(
      'finances/add-transaction/',
      transactionData,
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue({
      message: error.response?.data?.message || 'Failed to add transaction',
    });
  }
});

// Removing an existing transaction
const removeTransactionOperation = createAsyncThunk<string, string, { rejectValue: ErrorResponse }>(
  'finances/delete-transaction',
  async (transactionId, { rejectWithValue }) => {
    try {
      await axios.delete(`finances/delete-transaction/${transactionId}/`);
      return transactionId;
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Failed to remove transaction',
      });
    }
  },
);

// Removing an existing transaction
const getCategoriesOperation = createAsyncThunk<Category[], void, { rejectValue: ErrorResponse }>(
  'finances/categories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`finances/categories/`);
      return response.data;
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
  getCategoriesOperation,
};
