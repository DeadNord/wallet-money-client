export enum TransactionType {
  income = 'Income',
  expense = 'Expense',
}

// Defines the structure of a single financial transaction.
export interface Transaction {
  id: string | null; // The unique identifier for the transaction
  type: TransactionType | null; // The type of transaction (e.g., "income" or "expense")
  name: string | null; // The name or description of the transaction
  date: string | null; // The date of the transaction in YYYY-MM-DD format or null if not available
  amount: number; // The monetary amount of the transaction
  fromAccount: string | null; // The account this transaction was made from or null if not available
  category: string | null; // The category this transaction belongs to (e.g., "food", "rent") or null if not categorized
  note: string | null; // Additional notes about the transaction or null if not available
}

export interface TransactionSentData {
  type: TransactionType | null; // The type of transaction (e.g., "income" or "expense")
  name: string | null; // The name or description of the transaction
  date: string | null; // The date of the transaction in YYYY-MM-DD format or null if not available
  amount: number; // The monetary amount of the transaction
  fromAccount: string | null; // The account this transaction was made from or null if not available
  category: string | null; // The category this transaction belongs to (e.g., "food", "rent") or null if not categorized
  note: string | null; // Additional notes about the transaction or null if not available
}

// Defines the structure of the response data returned by the getTransactions endpoint.
export interface TransactionReturnedData {
  id: string; // The unique identifier for the transaction
  type: TransactionType | null; // The type of transaction (e.g., "income" or "expense")
  name: string | null; // The name or description of the transaction
  date: string | null; // The date of the transaction in YYYY-MM-DD format or null if not available
  amount: number; // The monetary amount of the transaction
  'from-account': string | null; // The account this transaction was made from or null if not available
  'category-id': string | null; // The category this transaction belongs to (e.g., "food", "rent") or null if not categorized
  note: string | null; // Additional notes about the transaction or null if not available
}

// Summarizes transactions over a weekly period, categorizing them as income or outcome.
export interface WeeklyTransactionSummary {
  name: string | null; // The name representing the week or identifier, or null if not available
  income: number; // Total income for the week
  outcome: number; // Total expenses/outcome for the week
}

// Represents expenses aggregated by category, typically for visualization.
export interface Category {
  id: string; // Unique identifier
  name: string; // Name of the category (e.g., "Utilities", "Groceries")
}

// Represents expenses aggregated by category, typically for visualization.
export interface CategoryExpense {
  category: string | null; // Name of the category (e.g., "Utilities", "Groceries") or null if not available
  value: number; // Total expense amount for this category
  color: string | null; // Color code (hex, RGB, etc.) used for distinguishing this category in charts or null if not defined
}

export interface BudgetData {
  budget: number; // Current available budget or null if not defined
  budgetLimit: number; // The set upper limit for the budget or null if not defined
  monthlyExpenses: number; // Total expenses incurred in the current month or null if not defined
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
  categories: Category[]; // List of categories or null if not available
  error: string | null; // Error message if any or null if no error
}
