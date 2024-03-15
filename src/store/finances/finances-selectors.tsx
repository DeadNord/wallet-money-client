import { createSelector } from '@reduxjs/toolkit';
import Categories from 'components/widgets/dashboard/categories/Categories';

const getBudget = (state: {
  finances: {
    budget: 0;
    budgetLimit: 0;
    monthlyExpenses: 0;
  };
}) => state.finances;

const getTransactions = (state: {
  finances: {
    transactions: [
      {
        name: string;
        date: string;
        amount: number;
        type: string;
        category: string;
      },
    ];
  };
}) => state.finances.transactions;

const getTransactionsByWeek = (state: {
  finances: {
    transactionsByWeek: [
      { name: 'Mo'; income: number; outcome: number },
      { name: 'Tu'; income: number; outcome: number },
      { name: 'We'; income: number; outcome: number },
      { name: 'Th'; income: number; outcome: number },
      { name: 'Fr'; income: number; outcome: number },
      { name: 'St'; income: number; outcome: number },
      { name: 'Sn'; income: number; outcome: number },
    ];
  };
}) => state.finances.transactionsByWeek;

const getExpensesByCategories = (state: {
  finances: {
    expensesByCategories: [
      {
        category: string;
        value: number;
        color: string;
      },
    ];
  };
}) => state.finances.expensesByCategories;

export { getBudget, getTransactions, getExpensesByCategories, getTransactionsByWeek };
