import { configureStore } from '@reduxjs/toolkit';
import {
  getBudgetOperation,
  getTransactionsOperation,
  getExpensesByCategoriesOperation,
  getTransactionsByWeekOperation,
  addTransactionOperation,
  removeTransactionOperation,
} from '../finances-operations';
import financesReducer from '../finances-slice';
import { FinancesState, TransactionType } from '../FinancesTypes';

// Initial state for testing
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

// Setup store for testing
const setupStore = (preloadedState?: FinancesState) => {
  return configureStore({
    reducer: { finances: financesReducer },
    preloadedState: preloadedState ? { finances: preloadedState } : undefined,
  });
};

describe('Finances operations', () => {
  let store: ReturnType<typeof setupStore>;

  beforeEach(() => {
    store = setupStore(initialState);
  });

  // Testing fulfillment for getBudgetOperation
  test('should handle fulfillment of getBudgetOperation', async () => {
    const mockBudgetData = { budgetLimit: 1000, monthlyExpenses: 200 };
    const action = getBudgetOperation.fulfilled(mockBudgetData, '', undefined);
    await store.dispatch(action);
    const state = store.getState().finances;
    expect(state.budgetData.budgetLimit).toEqual(mockBudgetData.budgetLimit);
    expect(state.budgetData.monthlyExpenses).toEqual(mockBudgetData.monthlyExpenses);
    expect(state.budgetData.budget).toEqual(
      mockBudgetData.budgetLimit - mockBudgetData.monthlyExpenses,
    );
  });

  // Testing fulfillment for getTransactionsOperation
  test('should handle fulfillment of getTransactionsOperation', async () => {
    const mockTransactions = [
      {
        id: '1',
        name: 'Salary',
        date: '2024-03-15',
        amount: 3000,
        type: TransactionType.income,
        category: 'Job',
        fromAccount: 'Savings',
        note: 'Monthly',
      },
      {
        id: '2',
        name: 'Rent',
        date: '2024-03-01',
        amount: 1200,
        type: TransactionType.expense,
        category: 'Housing',
        fromAccount: 'Savings',
        note: 'Monthly',
      },
    ];
    const action = getTransactionsOperation.fulfilled(mockTransactions, '', {
      name: null,
      startDate: null,
      endDate: null,
    });
    await store.dispatch(action);
    const state = store.getState().finances as FinancesState;
    expect(state.transactions).toEqual(mockTransactions);
  });

  // Testing fulfillment for getTransactionsByWeekOperation
  test('should handle fulfillment of getTransactionsByWeekOperation', async () => {
    const mockWeeklyTransactions = [
      { day: 'Week 1', income: 2000, outcome: 500 },
      { day: 'Week 2', income: 1500, outcome: 800 },
    ];
    const action = getTransactionsByWeekOperation.fulfilled(mockWeeklyTransactions, '', undefined);
    await store.dispatch(action);
    const state = store.getState().finances as FinancesState;
    expect(state.transactionsByWeek).toEqual(mockWeeklyTransactions);
  });

  // Testing fulfillment for getExpensesByCategoriesOperation
  test('should handle fulfillment of getExpensesByCategoriesOperation', async () => {
    const mockExpensesByCategories = [
      { name: 'Utilities', value: 300, color: '#00FF00' },
      { name: 'Groceries', value: 150, color: '#FF0000' },
    ];
    const action = getExpensesByCategoriesOperation.fulfilled(
      mockExpensesByCategories,
      '',
      undefined,
    );
    await store.dispatch(action);
    const state = store.getState().finances as FinancesState;
    expect(state.expensesByCategories).toEqual(mockExpensesByCategories);
  });

  // Testing rejection for getBudgetOperation
  test('handles rejection of getBudgetOperation', async () => {
    const rejectAction = getBudgetOperation.rejected(
      new Error('Budget fetch failed'),
      '',
      undefined,
    );
    await store.dispatch(rejectAction);
    const state = store.getState();
    expect(state.finances.error).toEqual('Budget fetch failed');
  });

  // Testing rejection for getTransactionsOperation
  test('handles rejection of getTransactionsOperation', async () => {
    const rejectAction = getTransactionsOperation.rejected(
      new Error('Transactions fetch failed'),
      '',
      {
        name: null,
        startDate: null,
        endDate: null,
      },
    );
    await store.dispatch(rejectAction);
    const state = store.getState();
    expect(state.finances.error).toEqual('Transactions fetch failed');
  });

  // Testing rejection for getExpensesByCategoriesOperation
  test('handles rejection of getExpensesByCategoriesOperation', async () => {
    const rejectAction = getExpensesByCategoriesOperation.rejected(
      new Error('Expenses fetch failed'),
      '',
      undefined,
    );
    await store.dispatch(rejectAction);
    const state = store.getState();
    expect(state.finances.error).toEqual('Expenses fetch failed');
  });

  // Testing rejection for getTransactionsByWeekOperation
  test('handles rejection of getTransactionsByWeekOperation', async () => {
    const rejectAction = getTransactionsByWeekOperation.rejected(
      new Error('Weekly transactions fetch failed'),
      '',
      undefined,
    );
    await store.dispatch(rejectAction);
    const state = store.getState();
    expect(state.finances.error).toEqual('Weekly transactions fetch failed');
  });

  // Testing rejection for addTransactionOperation
  test('handles rejection of addTransactionOperation', async () => {
    const rejectAction = addTransactionOperation.rejected(
      new Error('Adding transaction failed'),
      '',
      {
        name: 'Groceries',
        date: '2024-03-20',
        amount: 100,
        type: TransactionType.expense,
        category_id: 122,
        from_account: 'Savings',
        note: 'Groceries',
      },
    );
    await store.dispatch(rejectAction);
    const state = store.getState();
    expect(state.finances.error).toEqual('Adding transaction failed');
  });

  // Testing rejection for removeTransactionOperation
  test('handles rejection of removeTransactionOperation', async () => {
    const rejectAction = removeTransactionOperation.rejected(
      new Error('Removing transaction failed'),
      '',
      'transaction_id',
    );
    await store.dispatch(rejectAction);
    const state = store.getState();
    expect(state.finances.error).toEqual('Removing transaction failed');
  });
});
