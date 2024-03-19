// Import necessary libraries and components
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { EnhancedStore, configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom/extend-expect';
import SignUpPage from './SignUpPage';

// Import types
import { RootState } from 'store/store';
import { AuthState } from 'store/auth/AuthTypes';

// Mock auth operations
jest.mock('store/auth/auth-operations', () => ({
  signUpOperation: jest.fn(),
}));

// Create mock store
const createMockStore = (initialState: Partial<RootState>): EnhancedStore =>
  configureStore({ reducer: () => initialState });

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

describe('SignUpPage Component', () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = createMockStore({ auth: initialState });
    jest.clearAllMocks(); // Clear all mock calls
  });

  test('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <Router>
          <SignUpPage />
        </Router>
      </Provider>,
    );

    // Assertions for form fields
    expect(getByPlaceholderText('Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Mobile Number')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(getByText('I agree with the terms and conditions')).toBeInTheDocument();
  });
});
