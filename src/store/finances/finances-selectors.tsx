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

const getExpensesByCategory = createSelector(
  [getTransactions], // Список зависимостей селектора
  transactions => {
    const categories = transactions
      .filter(transaction => transaction.type === 'Expense') // Фильтруем только расходы
      .reduce((acc, transaction) => {
        if (!acc[transaction.category]) {
          acc[transaction.category] = 0;
        }
        acc[transaction.category] += transaction.amount;
        return acc;
      }, {} as Record<string, number>);
      return categories;
  },
);

export { getBudget, getTransactions, getExpensesByCategory };
