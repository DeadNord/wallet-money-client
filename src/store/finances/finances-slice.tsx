import { createSlice } from '@reduxjs/toolkit';
import { getBudgetOperation, getTransactionsOperation } from './finances-operation';

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
    }
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
  },
});
export default financesSlice.reducer;
