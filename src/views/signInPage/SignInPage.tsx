// External imports
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Internal imports
import s from './SignInPage.module.scss';
import AuthContainer from 'components/shared/authContainer/AuthContainer';
import { signInOperation } from 'store/auth/auth-operations';
import Logo from 'components/shared/icons/logo/Logo';
import SvgIcon from 'components/shared/icons/SvgIcon';
import { AppDispatch } from 'store/store';
import { SignInValues } from 'store/auth/AuthTypes';
import { notifySuccess, notifyError } from 'components/shared/notifications/Notifications';
import SignInForm from 'components/widgets/signIn/SignInForm';

// SignInPage component
const SignInPage = () => {
  const dispatch: AppDispatch = useDispatch();

  // Function for handling test authentication
  const handleTestAuth = () => {
    const user = {
      email: 'testuser@gmail.com',
      password: '1234567890',
      name: 'TestUser',
    };
    dispatch(signInOperation(user));
  };

  // Function for handling sign-in
  // This function takes the user input values and a setSubmitting function from Formik
  const handleSignIn = (values: SignInValues, setSubmitting: (isSubmitting: boolean) => void) => {
    const { email, password } = values; // Destructure for readability
    dispatch(signInOperation({ email, password }))
      .unwrap() // Proceeds if the promise is resolved
      .then(() => notifySuccess('Login successful')) // Notify success
      .catch(error => notifyError(error.message || 'Login failed')) // Notify error
      .finally(() => setSubmitting(false)); // Always stop submitting after operation
  };

  // JSX for SignInPage
  return (
    <AuthContainer>
      <div>
        <ToastContainer />
        <div className={s.loginContainer}>
          <div className={s.loginHeader}>
            <Logo />
            <h1>Login</h1>
            <p>Enter your email and password to login</p>
          </div>
          <SignInForm handleSignIn={handleSignIn} />
          <div className={s.altLoginContainer}>
            <p className={s.altLoginText}>Or login with</p>
            <button type="button" className={`${s.button} ${s.googleLogin}`}>
              <SvgIcon name={'icon-google'} className={s.iconGoogle} />
              Google
            </button>
          </div>
          <div className={s.loginFooter}>
            <p className={s.navText}>
              Don't have an account?
              <NavLink to="/signUp" className={s.navLink}>
                Register
              </NavLink>
            </p>
            <p className={s.navText}>
              Want to test? Visit our
              <button onClick={handleTestAuth} className={s.navLink}>
                Test Page
              </button>
            </p>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

export default SignInPage;
