export enum TransactionType {
  income = 'Income',
  expense = 'Expense',
}

// Defines the structure of a single financial transaction.
export interface Transaction {
  name: string | null; // The name or description of the transaction
  date: string | null; // The date of the transaction in YYYY-MM-DD format or null if not available
  amount: number | null; // The monetary amount of the transaction
  type: TransactionType | null; // The type of transaction (e.g., "income" or "expense")
  category: string | null; // The category this transaction belongs to (e.g., "food", "rent") or null if not categorized
}

// Summarizes transactions over a weekly period, categorizing them as income or outcome.
export interface WeeklyTransactionSummary {
  name: string | null; // The name representing the week or identifier, or null if not available
  income: number | null; // Total income for the week
  outcome: number | null; // Total expenses/outcome for the week
}

// Represents expenses aggregated by category, typically for visualization.
export interface CategoryExpense {
  category: string | null; // Name of the category (e.g., "Utilities", "Groceries") or null if not available
  value: number | null; // Total expense amount for this category
  color: string | null; // Color code (hex, RGB, etc.) used for distinguishing this category in charts or null if not defined
}

export interface BudgetData {
  budget: number | null; // Current available budget or null if not defined
  budgetLimit: number | null; // The set upper limit for the budget or null if not defined
  monthlyExpenses: number | null; // Total expenses incurred in the current month or null if not defined
}

// API response data
export interface BudgetResponceData {
  budgetLimit: number;
  monthlyExpenses: number;
}

// Describes the overall financial state including budgets, expenses, and categorized transactions.
export interface FinancesState {
  budgetData: BudgetData; // Current available budget and related data
  transactions: Transaction[]; // List of all recorded transactions or null if not available
  transactionsByWeek: WeeklyTransactionSummary[]; // Weekly summaries of transactions or null if not available
  expensesByCategories: CategoryExpense[]; // Summary of expenses categorized by their types or null if not available
  error: string | null; // Error message if any or null if no error
}
