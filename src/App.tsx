import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Hooks
import { useDBConfig } from './hooks/useDBConfig'; // Configuration for database connection

// Constants
import { ROUTES } from './configs/routeConstants'; // Route paths defined in a constants file for maintainability

// Route-related components
import ProtectedRoute from './components/routes/ProtectedRoute'; // Component for protected routes (auth required)
import PublicRoute from './components/routes/PublicRoute'; // Component for public routes (no auth required)

// Redux-related imports
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoggedIn } from 'store/auth/auth-selectors'; // Selector to check if the user is logged in
import { getUserOperation } from 'store/auth/auth-operation'; // Operation to fetch user details
import { AppDispatch } from 'store/store'; // Type definition for the Redux dispatch function

// Error handling
import ErrorBoundary from 'utils/ErrorBoundary'; // Component to catch and handle errors

// Lazy-loaded components for routes
const SignInPage = lazy(() => import('./views/signInPage/SignInPage'));
const SignUpPage = lazy(() => import('./views/signUpPage/SignUpPage'));
const DashboardPage = lazy(() => import('./views/dashboardPage/DashboardPage'));

function App() {
  const dispatch: AppDispatch = useDispatch(); // Hook to dispatch actions in Redux
  const isLoggedIn = useSelector(getIsLoggedIn); // Hook to get the logged-in status from Redux store

  // Initializes database configuration on app start-up
  useDBConfig();

  // React hook to perform side effects in the component
  useEffect(() => {
    // Fetch user details if logged in
    if (isLoggedIn) {
      dispatch(getUserOperation(null)); // Note: Check if passing null is intended or a placeholder
    }
  }, [isLoggedIn, dispatch]);

  // Render the main app structure with routing and error boundaries
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          {/* Fallback content displayed while waiting for lazy-loaded components */}
          <Routes>
            <Route
              path={ROUTES.signIn}
              element={
                <PublicRoute element={<SignInPage />} redirectTo={ROUTES.dashboard} restricted />
              }
            />
            <Route
              path={ROUTES.signUp}
              element={
                <PublicRoute element={<SignUpPage />} redirectTo={ROUTES.dashboard} restricted />
              }
            />
            <Route
              path={ROUTES.dashboard}
              element={<ProtectedRoute element={<DashboardPage />} redirectTo={ROUTES.signIn} />}
            />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
