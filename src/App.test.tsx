import { render, screen, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from './App';
import { ROUTES } from './configs/routeConstants';
import ErrorBoundary from './utils/ErrorBoundary';

// Extend expect with toHaveNoViolations for accessibility testing
expect.extend(toHaveNoViolations);

// Set up the mock store with thunk middleware
const middlewares = [thunk];
const createMockStore = configureMockStore(middlewares);

// Mock child components
jest.mock('views/signInPage/SignInPage', () => () => <div>Mocked SignIn Page</div>);
jest.mock('views/signUpPage/SignUpPage', () => () => <div>Mocked SignUp Page</div>);
jest.mock('components/widgets/dashboard/Dashboard', () => () => <div>Mocked Dashboard</div>);
jest.mock('views/fallbackComponent/FallbackComponent', () => () => (
  <div>Mocked Fallback Component</div>
));

interface AuthState {
  isLoggedIn: boolean;
}

interface AppState {
  auth: AuthState;
}

// Utility function for rendering the App component within a mock store and router context
const renderAppWithState = (initialState: AppState, route = '/') => {
  const mockStore = createMockStore(initialState);
  return render(
    <Provider store={mockStore}>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </Provider>,
  );
};

// Clean up after each test case
afterEach(() => {
  jest.clearAllMocks();
});

// Test cases
test('renders SignInPage for ROUTES.signIn when user is not logged in and checks for accessibility violations', async () => {
  const initialState = { auth: { isLoggedIn: false } };
  const { container } = renderAppWithState(initialState, ROUTES.signIn);
  const signInElement = await waitFor(() => screen.getByText('Mocked SignIn Page'));
  expect(signInElement).toBeInTheDocument();

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('renders SignUpPage for ROUTES.signUp when user is not logged in and checks for accessibility violations', async () => {
  const initialState = { auth: { isLoggedIn: false } };
  const { container } = renderAppWithState(initialState, ROUTES.signUp);
  const signUpElement = await waitFor(() => screen.getByText('Mocked SignUp Page'));
  expect(signUpElement).toBeInTheDocument();

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('renders DashboardPage for ROUTES.dashboard when user is logged in and checks for accessibility violations', async () => {
  const initialState = { auth: { isLoggedIn: true } };
  const { container } = renderAppWithState(initialState, ROUTES.dashboard);
  const dashboardElement = await waitFor(() => screen.getByText('Mocked Dashboard'), {
    timeout: 5000,
  });
  expect(dashboardElement).toBeInTheDocument();

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

// Error Boundary tests
test('ErrorBoundary catches errors from child components and displays fallback UI', () => {
  const FailingComponent = () => {
    throw new Error('Test error');
  };
  render(
    <ErrorBoundary>
      <FailingComponent />
    </ErrorBoundary>,
  );
  expect(screen.getByText(/Mocked Fallback Component/i)).toBeInTheDocument();
});
