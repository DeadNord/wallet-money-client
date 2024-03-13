import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { DBConnect } from './config/DBConnect';

import ProtectedRoute from './components/routes/ProtectedRoute';
import PublicRoute from './components/routes/PublicRoute';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoggedIn } from 'store/auth/auth-selectors';
import { getUserOperation } from 'store/auth/auth-operation';
import { AppDispatch } from 'store/store';

const SignInPage = lazy(() => import('./views/signInPage/SignInPage'));
const SignUpPage = lazy(() => import('./views/signUpPage/SignUpPage'));
const DashboardPage = lazy(() => import('./views/dashboardPage/DashboardPage'));

function App() {
  // const token = useSelector(authSelectors.getUserAccess);
  const dispatch: AppDispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);

  DBConnect();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserOperation(null));
    }
  }, [isLoggedIn, dispatch]);

  return (
    <>
      <Suspense>
        <Routes>
          <Route
            path="/signIn"
            element={<PublicRoute element={<SignInPage />} redirectTo={`/`} restricted />}
          />
          <Route
            path="/signUp"
            element={<PublicRoute element={<SignUpPage />} redirectTo={`/`} restricted />}
          />
          <Route
            path="/"
            element={<ProtectedRoute element={<DashboardPage />} redirectTo={`/signIn`} />}
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
