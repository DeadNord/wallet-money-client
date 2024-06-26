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
  transactions: [],
  transactionsByWeek: [],
  expensesByCategories: [],
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
        if (typeof newTransaction.date === 'string' && newTransaction.date !== null) {
          const newTransactionDate = new Date(newTransaction.date);
          let transactionIndex = state.transactions.findIndex(transaction => {
            if (typeof transaction.date === 'string' && transaction.date !== null) {
              const transactionDate = new Date(transaction.date);
              return transactionDate <= newTransactionDate;
            }
            return false;
          });
          if (transactionIndex === -1) {
            transactionIndex = 0;
          }
          state.transactions.splice(transactionIndex, 0, newTransaction);
        } else {
          console.error('Invalid date format:', newTransaction.date);
        }
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
