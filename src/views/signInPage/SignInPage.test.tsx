// Import necessary libraries and components
import { getByRole, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom/extend-expect';
import SignInPage from './SignInPage';

// Import types
import { RootState } from 'store/store'; // Import RootState type from your store configuration
import { AuthState } from 'store/auth/AuthTypes'; // Import AuthState type

// Mock auth operations
jest.mock('store/auth/auth-operations', () => ({
  signInOperation: jest.fn(),
}));

// Create mock store
const createMockStore = (initialState: Partial<RootState>): EnhancedStore =>
  configureStore({
    reducer: (state = initialState, action) => state, // Minimal reducer for testing
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
  });

// Define initial state
const initialState: AuthState = {
  accessToken: null,
  isLoggedIn: false,
  user: {
    id: null,
    name: null,
    email: null,
  },
  error: null,
};

describe('SignInPage Component', () => {
  let store: EnhancedStore;

  beforeEach(() => {
    // Create a new mock store before each test
    store = createMockStore({ auth: initialState });
    jest.clearAllMocks(); // Clear all mock calls
  });

  test('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <Router>
          <SignInPage />
        </Router>
      </Provider>,
    );

    // Assertions
    expect(getByPlaceholderText('Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByText('Or login with')).toBeInTheDocument();
  });
});
