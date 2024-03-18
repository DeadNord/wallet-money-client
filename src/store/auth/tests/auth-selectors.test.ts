import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth-slice';
import { getUserAccess, getUserInfo, getIsLoggedIn } from '../auth-selectors';
import { User } from '../AuthTypes';
import { RootState } from 'store/store';

// Define a mock user for testing
const mockUser: User = {
  id: '123',
  name: 'John Doe',
  email: 'john@example.com',
};

// Define a full mock state which matches the structure of RootState
const mockState = {
  auth: {
    accessToken: 'mock-access-token',
    user: mockUser,
    isLoggedIn: true,
    error: null,
  },
  // Include other state slices if necessary
};

describe('Auth Selectors', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: mockState,
    });
  });

  test('getUserAccess selector returns the correct access token', () => {
    const selectedAccessToken = getUserAccess(store.getState() as RootState);
    expect(selectedAccessToken).toEqual(mockState.auth.accessToken);
  });

  test('getUserInfo selector returns the correct user information', () => {
    const selectedUserInfo = getUserInfo(store.getState() as RootState);
    expect(selectedUserInfo).toEqual(mockState.auth.user);
  });

  test('getIsLoggedIn selector returns the correct logged-in status', () => {
    const selectedIsLoggedIn = getIsLoggedIn(store.getState() as RootState);
    expect(selectedIsLoggedIn).toEqual(mockState.auth.isLoggedIn);
  });

  // Additional tests can include different states like logged out user or null access token.
  describe('when the user is not logged in', () => {
    beforeEach(() => {
      // Adjust the mock state to represent a logged-out user.
      store = configureStore({
        reducer: { auth: authReducer },
        preloadedState: {
          auth: {
            ...mockState.auth,
            accessToken: null,
            isLoggedIn: false,
            user: { id: null, name: null, email: null },
          },
        },
      });
    });

    test('getUserAccess should return null when the user is not logged in', () => {
      const accessToken = getUserAccess(store.getState() as RootState);
      expect(accessToken).toBeNull();
    });

    test('getUserInfo should return default user when not logged in', () => {
      const userInfo = getUserInfo(store.getState() as RootState);
      expect(userInfo).toEqual({ id: null, name: null, email: null });
    });

    test('getIsLoggedIn should return false when the user is not logged in', () => {
      const isLoggedIn = getIsLoggedIn(store.getState() as RootState);
      expect(isLoggedIn).toBe(false);
    });
  });
});
