import { configureStore } from '@reduxjs/toolkit';
import {
  getBudgetOperation,
  getExpensesByCategoriesOperation,
  getTransactionsByWeekOperation,
  getTransactionsOperation,
} from '../finances-operations';
import financesReducer from '../finances-slice';
import { FinancesState, Transaction, TransactionType } from '../FinancesTypes';

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
function setupStore(state: FinancesState) {
  return configureStore({
    reducer: { finances: financesReducer },
    preloadedState: { finances: state },
  });
}

describe('financesSlice', () => {
  let store: ReturnType<typeof setupStore>;

  beforeEach(() => {
    store = setupStore(initialState);
  });

  // Testing fulfillment for getBudgetOperation
  test('should handle fulfillment of getBudgetOperation', async () => {
    const mockBudgetData = { budgetLimit: 2000, monthlyExpenses: 1500 };
    const action = getBudgetOperation.fulfilled(mockBudgetData, '', undefined);
    await store.dispatch(action);
    const state = store.getState().finances;
    expect(state.budgetData.budgetLimit).toEqual(2000);
    expect(state.budgetData.monthlyExpenses).toEqual(1500);
    expect(state.budgetData.budget).toEqual(500); // Assuming this calculation is done correctly in your slice
  });

  // Testing fulfillment for getTransactionsOperation
  test('should handle fulfillment of getTransactionsOperation', async () => {
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        name: 'Coffee',
        date: '2024-03-20',
        amount: 5,
        type: TransactionType.expense,
        category: 'Food',
        fromAccount: 'Savings',
        note: 'Cafe',
      },
      {
        id: '2',
        name: 'Book',
        date: '2024-03-21',
        amount: 15,
        type: TransactionType.expense,
        category: 'Entertainment',
        fromAccount: 'Savings',
        note: 'Book',
      },
    ];
    const action = getTransactionsOperation.fulfilled(mockTransactions, '', {
      name: null,
      startDate: null,
      endDate: null,
    });
    await store.dispatch(action);
    const state = store.getState().finances;
    expect(state.transactions).toEqual(mockTransactions);
  });

  // Testing fulfillment for getTransactionsByWeekOperation
  test('should handle fulfillment of getTransactionsByWeekOperation', async () => {
    const mockWeeklyTransactions = [
      { name: 'Week 1', income: 3000, outcome: 1000 },
      { name: 'Week 2', income: 2500, outcome: 1500 },
    ];
    const action = getTransactionsByWeekOperation.fulfilled(mockWeeklyTransactions, '', undefined);
    await store.dispatch(action);
    const state = store.getState().finances;
    expect(state.transactionsByWeek).toEqual(mockWeeklyTransactions);
  });

  // Testing fulfillment for getExpensesByCategoriesOperation
  test('should handle fulfillment of getExpensesByCategoriesOperation', async () => {
    const mockExpensesByCategory = [
      { category: 'Food', value: 200, color: '#FF0000' },
      { category: 'Utilities', value: 150, color: '#00FF00' },
    ];
    const action = getExpensesByCategoriesOperation.fulfilled(
      mockExpensesByCategory,
      '',
      undefined,
    );
    await store.dispatch(action);
    const state = store.getState().finances;
    expect(state.expensesByCategories).toEqual(mockExpensesByCategory);
  });

  // Testing rejection for getBudgetOperation
  test('should handle rejection of getBudgetOperation', async () => {
    const action = getBudgetOperation.rejected(new Error('Failed to fetch budget'), '', undefined);
    await store.dispatch(action);
    const state = store.getState().finances;
    expect(state.error).toEqual('Failed to fetch budget');
  });

  // Testing rejection for getTransactionsOperation
  test('should handle rejection of getTransactionsOperation', async () => {
    const action = getTransactionsOperation.rejected(
      new Error('Failed to fetch transactions'),
      '',
      {
        name: null,
        startDate: null,
        endDate: null,
      },
    );
    await store.dispatch(action);
    const state = store.getState().finances;
    expect(state.error).toEqual('Failed to fetch transactions');
  });

  // Testing rejection for getTransactionsByWeekOperation
  test('should handle rejection of getTransactionsByWeekOperation', async () => {
    const action = getTransactionsByWeekOperation.rejected(
      new Error('Failed to fetch weekly transactions'),
      '',
      undefined,
    );
    await store.dispatch(action);
    const state = store.getState().finances;
    expect(state.error).toEqual('Failed to fetch weekly transactions');
  });

  // Testing rejection for getExpensesByCategoriesOperation
  test('should handle rejection of getExpensesByCategoriesOperation', async () => {
    const action = getExpensesByCategoriesOperation.rejected(
      new Error('Failed to fetch expenses by categories'),
      '',
      undefined,
    );
    await store.dispatch(action);
    const state = store.getState().finances;
    expect(state.error).toEqual('Failed to fetch expenses by categories');
  });
});
