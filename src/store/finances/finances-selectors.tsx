import { RootState } from 'store/store'; // Import the state type
import {
  Transaction,
  WeeklyTransactionSummary,
  CategoryExpense,
  BudgetData,
  Category,
} from './FinancesTypes';

// Selector to get the budget details
const getBudget = (state: RootState): BudgetData => state.finances.budgetData;

// Selector to get all transactions
const getTransactions = (state: RootState): Transaction[] => state.finances.transactions;

// Selector to get transactions summarized by week
const getTransactionsByWeek = (state: RootState): WeeklyTransactionSummary[] =>
  state.finances.transactionsByWeek;

// Selector to get expenses categorized by type
const getExpensesByCategories = (state: RootState): CategoryExpense[] =>
  state.finances.expensesByCategories;

// Selector to get categories
const getCategories = (state: RootState): Category[] => state.finances.categories;

export { getCategories, getBudget, getTransactions, getTransactionsByWeek, getExpensesByCategories };
