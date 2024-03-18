import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addTransactionOperation,
  getBudgetOperation,
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
} from './FinancesTypes';

// Initial state setup with types applied correctly
const initialState: FinancesState = {
  budgetData: {
    budget: null,
    budgetLimit: null,
    monthlyExpenses: null,
  },
  transactions: [
    {
      name: null,
      date: null,
      amount: null,
      type: null,
      category: null,
    },
  ],
  transactionsByWeek: [{ name: null, income: null, outcome: null }],
  expensesByCategories: [{ category: null, value: null, color: null }],
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

    // builder.addCase(addTransactionOperation.fulfilled, (state, action) => {
    //   state.error = action.error.message || 'Adding transaction failed';
    // });

    builder.addCase(addTransactionOperation.rejected, (state, action) => {
      state.error = action.error.message || 'Adding transaction failed';
    });

    // builder.addCase(removeTransactionOperation.fulfilled, (state, action) => {
    //   state.error = action.error.message || 'Removing transaction failed';
    // });

    builder.addCase(removeTransactionOperation.rejected, (state, action) => {
      state.error = action.error.message || 'Removing transaction failed';
    });
  },
});

export default financesSlice.reducer;
