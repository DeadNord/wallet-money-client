// Import necessary elements from Redux Toolkit and type definitions.
import { configureStore } from '@reduxjs/toolkit';
import { FinancesState, TransactionType } from '../FinancesTypes';
import {
  getBudget,
  getTransactions,
  getTransactionsByWeek,
  getExpensesByCategories,
} from '../finances-selectors';
import { RootState } from 'store/store';

// Define a mock state to simulate the data structure in the finance module.
// This will help in testing the selectors against a predefined state.
const mockState: FinancesState = {
  budgetData: {
    budget: 1000,
    budgetLimit: 2000,
    monthlyExpenses: 500,
  },
  transactions: [
    {
      id: '1',
      name: 'Groceries',
      date: '2024-03-20',
      amount: 150,
      type: TransactionType.expense,
      category: 'Food',
      fromAccount: 'Savings',
      note: 'Groceries',
    },
    {
      id: '2',
      name: 'Salary',
      date: '2024-03-15',
      amount: 3000,
      type: TransactionType.income,
      category: 'Job',
      fromAccount: 'Savings',
      note: 'Salary',
    },
  ],
  transactionsByWeek: [
    { name: 'Week 1', income: 2000, outcome: 500 },
    { name: 'Week 2', income: 1000, outcome: 300 },
  ],
  expensesByCategories: [
    { category: 'Food', value: 500, color: '#FF0000' },
    { category: 'Utilities', value: 150, color: '#00FF00' },
  ],
  categories: [{id: '1', name: 'Food'}, {id: '2', name: 'Utilities'}],
  error: null,
};

// Configure the Redux store with the initial mock state for testing.
// This setup helps in creating an environment similar to the actual Redux store usage in the application.
const store = configureStore({
  reducer: {
    finances: () => mockState, // Define a simple reducer that always returns the mock state.
  },
});

// Group tests for finance selectors under a single describe block.
describe('Finances selectors', () => {
  // Typecast the store's state as RootState to ensure proper type checking.
  const state = store.getState() as RootState;

  // Tests each selector with the predefined mock state and checks if the returned data matches expectations.
  test('getBudget selector returns the correct budget data', () => {
    const budget = getBudget(state);
    expect(budget).toEqual(mockState.budgetData); // Ensure the budget data matches the mock state.
  });

  test('getTransactions selector returns all transactions', () => {
    const transactions = getTransactions(state);
    expect(transactions).toEqual(mockState.transactions); // Check that all transactions are retrieved correctly.
  });

  test('getTransactionsByWeek selector returns transactions summarized by week', () => {
    const transactionsByWeek = getTransactionsByWeek(state);
    expect(transactionsByWeek).toEqual(mockState.transactionsByWeek); // Verify weekly transaction summaries match the mock data.
  });

  test('getExpensesByCategories selector returns expenses categorized by type', () => {
    const expensesByCategories = getExpensesByCategories(state);
    expect(expensesByCategories).toEqual(mockState.expensesByCategories); // Confirm that expenses are correctly categorized.
  });
});

// Test for budget data with zero values to simulate a new user or reset state.
describe('getBudget with initial values', () => {
  const initialState: FinancesState = {
    budgetData: {
      budget: 0,
      budgetLimit: 0,
      monthlyExpenses: 0,
    },
    transactions: [],
    transactionsByWeek: [],
    expensesByCategories: [],
    categories: [],
    error: null,
  };

  // Reconfigure store with initial (or reset) state.
  const initialStore = configureStore({
    reducer: {
      finances: () => initialState,
    },
  });
  const state = initialStore.getState() as RootState;

  test('returns initial budget data when no activity has occurred', () => {
    const budget = getBudget(state);
    expect(budget).toEqual(initialState.budgetData); // Expect default values without any user activity.
  });
});

// Test for transactions when there are none to ensure selectors handle empty arrays properly.
describe('getTransactions with no transactions', () => {
  const emptyTransactionState: FinancesState = {
    ...mockState, // Use spread operator to keep other mock state data unchanged.
    transactions: [], // Override transactions with an empty array.
  };

  // Reconfigure store for this specific case.
  const noTransactionStore = configureStore({
    reducer: {
      finances: () => emptyTransactionState,
    },
  });
  const state = noTransactionStore.getState() as RootState;

  test('returns an empty array when there are no transactions', () => {
    const transactions = getTransactions(state);
    expect(transactions).toEqual([]); // Expect an empty array for transactions.
  });
});

// Test for summarizing transactions by week when there are no transactions.
describe('getTransactionsByWeek with no transactions', () => {
  // Create a modified state with no weekly transactions.
  const emptyWeeklyState: FinancesState = {
    ...mockState,
    transactionsByWeek: [],
  };

  // Reconfigure store to use this new state.
  const noWeekTransactionStore = configureStore({
    reducer: {
      finances: () => emptyWeeklyState,
    },
  });
  const state = noWeekTransactionStore.getState() as RootState;

  test('returns an empty array when there are no weekly transactions', () => {
    const transactionsByWeek = getTransactionsByWeek(state);
    expect(transactionsByWeek).toEqual([]); // Expect an empty array for weekly transactions.
  });
});

// Test for categorizing expenses when there are no categories.
describe('getExpensesByCategories with no categories', () => {
  // Modify state to have no categorized expenses.
  const emptyCategoryState: FinancesState = {
    ...mockState,
    expensesByCategories: [],
  };

  // Reconfigure store for this test case.
  const noCategoryStore = configureStore({
    reducer: {
      finances: () => emptyCategoryState,
    },
  });
  const state = noCategoryStore.getState() as RootState;

  test('returns an empty array when there are no categorized expenses', () => {
    const expensesByCategories = getExpensesByCategories(state);
    expect(expensesByCategories).toEqual([]); // Expect an empty array for expenses by categories.
  });
});
