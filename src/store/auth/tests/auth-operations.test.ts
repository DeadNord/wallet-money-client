import { configureStore } from '@reduxjs/toolkit';
import { AuthState } from '../AuthTypes';
import {
  signOutOperation,
  refreshTokenOperation,
  signInOperation,
  getUserOperation,
} from '../auth-operations';
import authReducer, { initialState as authInitialState } from '../auth-slice';

// Setup function for configuring the store for tests
const setupStore = (preloadedState?: AuthState) => {
  return configureStore({
    reducer: { auth: authReducer },
    preloadedState: preloadedState ? { auth: preloadedState } : undefined,
  });
};

describe('signInOperation', () => {
  let store: ReturnType<typeof setupStore>;

  beforeEach(() => {
    store = setupStore();
  });

  test('should handle signInOperation success', async () => {
    const expectedAccessToken = '123';
    const action = signInOperation.fulfilled({ accessToken: expectedAccessToken }, '', {
      email: 'test@example.com',
      password: 'password',
    });
    store.dispatch(action);
    const state = store.getState().auth as AuthState;
    expect(state.accessToken).toEqual(expectedAccessToken);
    expect(state.isLoggedIn).toEqual(true);
  });

  test('should handle signInOperation failure', async () => {
    const action = signInOperation.rejected(new Error('Sign-in failed'), '', {
      email: 'wrong@example.com',
      password: 'wrong',
    });
    store.dispatch(action);
    const state = store.getState().auth as AuthState;
    expect(state.error).toEqual('Sign-in failed');
    expect(state.isLoggedIn).toEqual(false);
  });
});

describe('signInOperation', () => {
  let store: ReturnType<typeof setupStore>;

  beforeEach(() => {
    store = setupStore();
  });

  test('should handle signInOperation success', async () => {
    const expectedAccessToken = '123';
    const action = signInOperation.fulfilled({ accessToken: expectedAccessToken }, '', {
      email: 'test@example.com',
      password: 'password',
    });
    store.dispatch(action);
    const state = store.getState().auth as AuthState;
    expect(state.accessToken).toEqual(expectedAccessToken);
    expect(state.isLoggedIn).toEqual(true);
  });

  test('should handle signInOperation failure', async () => {
    const action = signInOperation.rejected(new Error('Sign-in failed'), '', {
      email: 'wrong@example.com',
      password: 'wrong',
    });
    store.dispatch(action);
    const state = store.getState().auth as AuthState;
    expect(state.error).toEqual('Sign-in failed');
    expect(state.isLoggedIn).toEqual(false);
  });
});

describe('signOutOperation', () => {
  let store: ReturnType<typeof setupStore>;

  beforeEach(() => {
    store = setupStore({ ...authInitialState, isLoggedIn: true }); // Assuming the user is initially logged in
  });

  test('should handle signOutOperation success', async () => {
    const action = signOutOperation.fulfilled(undefined, '');
    store.dispatch(action);
    const state = store.getState().auth as AuthState;
    expect(state.accessToken).toBeNull();
    expect(state.isLoggedIn).toEqual(false);
    expect(state.user).toEqual({ id: null, name: null, email: null });
  });

  test('should handle signOutOperation failure', async () => {
    const action = signOutOperation.rejected(new Error('Sign-out failed'), '');
    store.dispatch(action);
    const state = store.getState().auth as AuthState;
    expect(state.error).toEqual('Sign-out failed');
    // Assuming user remains logged in if sign-out fails, adjust according to your logic
    expect(state.isLoggedIn).toEqual(true);
  });
});

describe('refreshTokenOperation', () => {
  let store: ReturnType<typeof setupStore>;

  beforeEach(() => {
    store = setupStore({ ...authInitialState, accessToken: 'old-token' }); // Assuming there is an old token
  });

  test('should handle refreshTokenOperation success', async () => {
    const newToken = 'new-token';
    const action = refreshTokenOperation.fulfilled({ accessToken: newToken }, '');
    store.dispatch(action);
    const state = store.getState().auth as AuthState;
    expect(state.accessToken).toEqual(newToken);
  });

  test('should handle refreshTokenOperation failure', async () => {
    const action = refreshTokenOperation.rejected(new Error('Token refresh failed'), '');
    store.dispatch(action);
    const state = store.getState().auth as AuthState;
    expect(state.error).toEqual('Token refresh failed');
    expect(state.accessToken).toBeNull(); // Assuming token is cleared on refresh failure
  });
});

describe('getUserOperation', () => {
  let store: ReturnType<typeof setupStore>;

  beforeEach(() => {
    store = setupStore(authInitialState);
  });

  test('should handle getUserOperation success', async () => {
    const userDetails = { id: '1', name: 'John Doe', email: 'john@example.com' };
    const action = getUserOperation.fulfilled(userDetails, '');
    store.dispatch(action);
    const state = store.getState().auth as AuthState;
    expect(state.user).toEqual(userDetails);
  });

  test('should handle getUserOperation failure', async () => {
    const action = getUserOperation.rejected(new Error('User fetch failed'), '');
    store.dispatch(action);
    const state = store.getState().auth as AuthState;
    expect(state.error).toEqual('User fetch failed');
    // Assuming user information is cleared or remains unchanged based on your logic
    expect(state.user).toEqual({ id: null, name: null, email: null });
  });
});
