import { createSlice } from '@reduxjs/toolkit';
import {
  getBudgetOperation,
  getExpensesByCategoriesOperation,
  getTransactionsByWeekOperation,
  getTransactionsOperation,
} from './finances-operation';

const initialState = {
  budget: 0,
  budgetLimit: 0,
  monthlyExpenses: 0,
  transactions: [
    {
      name: '',
      date: '',
      amount: 0,
      type: '',
      category: '',
    },
  ],
  transactionsByWeek: [
    {
      name: '',
      Income: 0,
      Outcome: 0,
    }
  ],
  expensesByCategories: [
    {
      category: '',
      value: '',
      color: '',
    },
  ],
};

const financesSlice = createSlice({
  name: 'finances',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(getBudgetOperation.fulfilled, (state, action) => {
      state.budgetLimit = action.payload.budgetLimit;
      state.monthlyExpenses = action.payload.monthlyExpenses;
      state.budget = action.payload.budgetLimit - action.payload.monthlyExpenses;
    });
    builder.addCase(getTransactionsOperation.fulfilled, (state, action) => {
      state.transactions = action.payload.transactions;
    });
    builder.addCase(getTransactionsByWeekOperation.fulfilled, (state, action) => {
      state.transactionsByWeek = action.payload;
    });
    builder.addCase(getExpensesByCategoriesOperation.fulfilled, (state, action) => {
      state.expensesByCategories = action.payload;
    });
  },
});
export default financesSlice.reducer;
