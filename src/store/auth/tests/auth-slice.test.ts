import { configureStore } from '@reduxjs/toolkit';
import authReducer, { initialState as authInitialState } from '../auth-slice';
import {
  signInOperation,
  signOutOperation,
  getUserOperation,
  refreshTokenOperation,
  signUpOperation,
} from '../auth-operations';
import { AuthState } from '../AuthTypes';

// Setup function for configuring the store for tests
function setupStore(preloadedState?: AuthState) {
  return configureStore({
    reducer: { auth: authReducer },
    preloadedState: preloadedState ? { auth: preloadedState } : undefined,
  });
}

// Describe block groups tests related to the authSlice
describe('authSlice', () => {
  let initialState: AuthState;

  beforeEach(() => {
    // Initialize state before each test to ensure tests do not affect each other
    initialState = { ...authInitialState };
  });

  // Testing the initial state of the slice
  test('should correctly set the initial state', () => {
    const store = setupStore();
    expect(store.getState().auth).toEqual(initialState);
  });

  // Testing signInOperation action's fulfilled case
  test('signInOperation should update state with new access token and set isLoggedIn flag', async () => {
    const store = setupStore();
    const testToken = 'test-token';
    const action = await signInOperation.fulfilled(
      { accessToken: testToken }, // AuthResponse
      'test-request-id', // requestId
      { email: 'dummy@example.com', password: 'dummyPassword' }, // SignInValues, dummy values for testing
    );

    store.dispatch(action);

    expect(store.getState().auth).toEqual({
      ...initialState,
      accessToken: testToken,
      isLoggedIn: true,
    });
  });

  // Testing signUpOperation action's fulfilled case
  test('signUpOperation should handle successful sign-up', async () => {
    const store = setupStore();
    // Assuming signUpOperation doesn't change the auth state directly upon success
    // since typically signing up doesn't automatically sign in the user
    const action = await signUpOperation.fulfilled(undefined, 'test-request-id', {
      email: 'newuser@example.com',
      password: 'password123',
      name: 'New User',
    });
    store.dispatch(action);

    // Check the expected state change; this might vary based on your application's logic
    // For this example, I'm assuming no direct state change on successful sign-up
    expect(store.getState().auth).toEqual({
      ...initialState,
      // Add any state changes here if your app does update the state on successful sign-up
    });
  });

  // Testing signOutOperation action's fulfilled case
  test('signOutOperation should clear the access token and reset user state', async () => {
    const loggedInState = { ...initialState, accessToken: 'test-token', isLoggedIn: true };
    const store = setupStore(loggedInState);
    const action = await signOutOperation.fulfilled(undefined, 'test-request-id');
    store.dispatch(action);

    expect(store.getState().auth).toEqual(initialState);
  });

  // Testing getUserOperation action's fulfilled case
  test('getUserOperation should update the user details in the state', async () => {
    const store = setupStore();
    const userDetails = { id: '1', name: 'John Doe', email: 'john@example.com' };
    const action = await getUserOperation.fulfilled(userDetails, 'test-request-id');
    store.dispatch(action);

    expect(store.getState().auth.user).toEqual(userDetails);
  });

  // Testing refreshTokenOperation action's fulfilled case
  test('refreshTokenOperation should update the access token in the state', async () => {
    const store = setupStore();
    const newToken = 'new-test-token';
    const action = await refreshTokenOperation.fulfilled(
      { accessToken: newToken },
      'test-request-id',
    );
    store.dispatch(action);

    expect(store.getState().auth.accessToken).toEqual(newToken);
  });

  // Test signInOperation rejection
  test('should handle rejection of signInOperation', async () => {
    const store = setupStore();
    const action = signInOperation.rejected(new Error('Invalid credentials'), 'test', {
      email: 'user@example.com',
      password: 'wrongpassword',
    });
    store.dispatch(action);
    // Adjust according to your state management for errors and authentication status
    expect(store.getState().auth.error).toEqual('Invalid credentials');
    expect(store.getState().auth.isLoggedIn).toEqual(false);
  });

  // Test signOutOperation rejection
  test('should handle rejection of signOutOperation', async () => {
    const store = setupStore();
    const action = signOutOperation.rejected(new Error('Test rejection'), 'test');
    store.dispatch(action);
    // Expected changes in state after rejection could vary based on your actual reducer logic
    expect(store.getState().auth.error).toEqual('Test rejection');
    // Make sure other parts of the state remain unchanged or are updated as expected
    expect(store.getState().auth.isLoggedIn).toEqual(false);
  });

  // Testing signUpOperation action's rejection case
  test('signUpOperation should handle rejection or failure', async () => {
    const store = setupStore();
    const error = new Error('Sign-up failed: Email already in use');
    const action = signUpOperation.rejected(error, 'test-request-id', {
      email: 'newuser@example.com',
      password: 'password123',
      name: 'New User',
    });

    store.dispatch(action);

    // Assuming your state updates an 'error' field upon failed sign-up
    expect(store.getState().auth.error).toEqual('Sign-up failed: Email already in use');
    // Verify other parts of the state remain unchanged or are updated as expected
    expect(store.getState().auth.isLoggedIn).toEqual(false);
    expect(store.getState().auth.accessToken).toBeNull();
    // Assuming initial user state does not get altered upon failed sign-up
    expect(store.getState().auth.user).toEqual({
      id: null,
      name: null,
      email: null,
    });
  });

  // Test getUserOperation rejection
  test('should handle rejection of getUserOperation', async () => {
    const store = setupStore();
    const action = getUserOperation.rejected(new Error('User not found'), 'test');
    store.dispatch(action);
    // Adjust based on how your reducer handles user fetch failure
    expect(store.getState().auth.error).toEqual('User not found');
    // Check if user information is cleared or remains unchanged based on your logic
    expect(store.getState().auth.user).toEqual({ id: null, name: null, email: null });
  });

  // Test refreshTokenOperation rejection
  test('should handle rejection of refreshTokenOperation', async () => {
    const store = setupStore({ ...initialState, accessToken: 'old-token' }); // Assuming initial state had an access token
    const action = refreshTokenOperation.rejected(new Error('Token expired'), 'test');
    store.dispatch(action);
    // Depending on your logic, check if token was cleared or remains unchanged
    expect(store.getState().auth.accessToken).toBeNull();
    expect(store.getState().auth.error).toEqual('Token expired');
  });
});
