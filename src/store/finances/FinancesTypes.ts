export interface Transaction {
  name: string;
  date: string;
  amount: number;
  type: string;
  category: string;
}

export interface WeeklyTransactionSummary {
  name: string;
  income: number;
  outcome: number;
}

export interface CategoryExpense {
  category: string;
  value: number;
  color: string;
}

export interface FinancesState {
  budget: number;
  budgetLimit: number;
  monthlyExpenses: number;
  transactions: Transaction[];
  transactionsByWeek: WeeklyTransactionSummary[];
  expensesByCategories: CategoryExpense[];
}
