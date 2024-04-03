import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addTransactionOperation,
  getBudgetOperation,
  getCategoriesOperation,
  getExpensesByCategoriesOperation,
  getTransactionsByWeekOperation,
  getTransactionsOperation,
  removeTransactionOperation,
} from './finances-operations';
import {
  FinancesState,
  Transaction,
  WeeklyTransactionSummary,
  CategoryExpense,
  BudgetResponceData,
  TransactionReturnedData,
  Category,
} from './FinancesTypes';

// Initial state setup with types applied correctly
const initialState: FinancesState = {
  budgetData: {
    budget: 0,
    budgetLimit: 0,
    monthlyExpenses: 0,
  },
  transactions: [
    {
      id: null,
      type: null,
      name: null,
      date: null,
      amount: 0,
      fromAccount: null,
      category: null,
      note: null,
    },
  ],
  transactionsByWeek: [{ name: null, income: 0, outcome: 0 }],
  expensesByCategories: [{ name: null, value: 0, color: null }],
  categories: [],
  error: null,
};

const financesSlice = createSlice({
  name: 'finances',
  initialState,
  reducers: {
    // Reducers for other actions can be defined here
  },
  extraReducers: builder => {
    builder.addCase(
      getBudgetOperation.fulfilled,
      (state, action: PayloadAction<BudgetResponceData>) => {
        const { budgetLimit, monthlyExpenses } = action.payload;
        state.budgetData.budgetLimit = budgetLimit;
        state.budgetData.monthlyExpenses = monthlyExpenses;
        state.budgetData.budget = budgetLimit - monthlyExpenses;
      },
    );
    builder.addCase(getBudgetOperation.rejected, (state, action) => {
      state.error = action.error.message || 'Failed to fetch budget';
    });
    builder.addCase(
      getTransactionsOperation.fulfilled,
      (state, action: PayloadAction<Transaction[]>) => {
        state.transactions = action.payload;
      },
    );
    builder.addCase(getTransactionsOperation.rejected, (state, action) => {
      state.error = action.error.message || 'Failed to fetch transactions';
    });
    builder.addCase(
      getTransactionsByWeekOperation.fulfilled,
      (state, action: PayloadAction<WeeklyTransactionSummary[]>) => {
        state.transactionsByWeek = action.payload;
      },
    );
    builder.addCase(getTransactionsByWeekOperation.rejected, (state, action) => {
      state.error = action.error.message || 'Failed to fetch weekly transactions';
    });
    builder.addCase(
      getExpensesByCategoriesOperation.fulfilled,
      (state, action: PayloadAction<CategoryExpense[]>) => {
        state.expensesByCategories = action.payload;
      },
    );
    builder.addCase(getExpensesByCategoriesOperation.rejected, (state, action) => {
      state.error = action.error.message || 'Failed to fetch expenses by categories';
    });

    builder.addCase(
      addTransactionOperation.fulfilled,
      (state, action: PayloadAction<TransactionReturnedData>) => {
        const newTransaction = {
          ...action.payload,
          fromAccount: action.payload['from-account'],
          category:
            state.categories.find(cat => cat.id === action.payload['category-id'])?.name || null,
        };
        state.transactions.unshift(newTransaction);
      },
    );

    builder.addCase(addTransactionOperation.rejected, (state, action) => {
      state.error = action.error.message || 'Adding transaction failed';
    });

    builder.addCase(
      removeTransactionOperation.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.transactions = state.transactions.filter(
          transaction => transaction.id !== action.payload,
        );
      },
    );

    builder.addCase(removeTransactionOperation.rejected, (state, action) => {
      state.error = action.error.message || 'Removing transaction failed';
    });

    builder.addCase(
      getCategoriesOperation.fulfilled,
      (state, action: PayloadAction<Category[]>) => {
        state.categories = action.payload;
      },
    );
  },
});

export default financesSlice.reducer;
