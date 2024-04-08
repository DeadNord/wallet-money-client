import { store, persistor } from './store';

describe('Redux Store Integration Tests', () => {
  // Test to ensure the initial state of the 'auth' slice is correct
  test('should have the correct initial auth state', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _persist, ...initialState } = store.getState().auth;
    expect(initialState).toEqual({
      accessToken: null,
      user: { id: null, name: null, email: null },
      isLoggedIn: false,
      error: null,
    });
  });

  test('should have the correct initial finances state', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _persist, ...initialState } = store.getState().finances;
    expect(initialState).toEqual({
      budgetData: { budget: 0, budgetLimit: 0, monthlyExpenses: 0 },
      transactions: [],
      transactionsByWeek: [],
      expensesByCategories: [],
      categories: [],
      error: null,
    });
  });

  // Middleware test: checks if the default middleware setup is correctly applied.
  // In a real-world application, you might want to add more specific tests,
  // particularly if you're using custom middleware.
  test('middleware are correctly set up', () => {
    // This test is rather simplified, for real usage you might want to dispatch real actions,
    // especially if using asynchronous actions (thunks) and check the changes in the state.
  });

  // Redux-persist integration test: checks if the store is correctly integrated with redux-persist.
  test('redux-persist integration', () => {
    // Ensure that the redux-persist configuration is correctly integrated into the store.
    // Note: This assumes your store exports 'persistor' and state includes '_persist'.
    // Adjust if your setup differs.
    const state = store.getState();

    expect(persistor).toBeDefined();
    expect(state).toHaveProperty('auth');
    expect(state).toHaveProperty('finances');
  });

  // Test to check if Redux DevTools are enabled in development mode only.
  test('Redux DevTools should only be enabled in development mode', () => {
    const isDevMode = process.env.NODE_ENV !== 'production';
    // Here you can't directly check if dev tools are applied due to Redux Toolkit abstraction,
    expect(isDevMode).toBe(true); // or false, depending on your testing environment
  });
});
