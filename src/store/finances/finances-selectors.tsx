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
      }
    ]
  };
}) => state.finances.transactions;

export { getBudget, getTransactions };
