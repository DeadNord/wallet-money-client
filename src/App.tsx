import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import { DBConnect } from './config/DBConnect';

import ProtectedRoute from './components/routes/ProtectedRoute';
import PublicRoute from './components/routes/PublicRoute';

const SignInPage = lazy(() => import('./views/signInPage/SignInPage'));
const SignUpPage = lazy(() => import('./views/signUpPage/SignUpPage'));
const DashboardPage = lazy(() => import('./views/dashboardPage/DashboardPage'));

function App() {
  // const token = useSelector(authSelectors.getUserAccess);

  DBConnect();

  // useEffect(() => {
  //   if (userId != null) {
  //     dispatch(getUserByIdOperation(userId));
  //   }
  // }, [userId]);

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
