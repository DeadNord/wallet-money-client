// SignUpPage.tsx
import React from 'react';
import AuthContainer from 'components/shared/authContainer/AuthContainer';
import Logo from 'components/shared/icons/logo/Logo';
import s from './SignUpPage.module.scss';
import { ToastContainer } from 'react-toastify'; // Import toastify
import { AppDispatch } from 'store/store';
import { useDispatch } from 'react-redux';
import { signInOperation, signUpOperation } from 'store/auth/auth-operations';
import { SignUpValues } from 'store/auth/AuthTypes';
import { notifyError, notifySuccess } from 'components/shared/notifications/Notifications';
import SignUpForm from 'components/widgets/signUp/SignUpForm';

const SignUpPage = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleTestAuth = () => {
    const user = {
      email: 'testuser@gmail.com',
      password: '1234567890',
      name: 'TestUser',
    };
    dispatch(signInOperation(user));
  };

  const handleSignUp = (values: SignUpValues, setSubmitting: (isSubmitting: boolean) => void) => {
    const { email, password, name, mobile } = values; // Destructure for readability
    dispatch(signUpOperation({ email, password, name, mobile }))
      .unwrap() // Proceeds if the promise is resolved
      .then(() => notifySuccess('SignUp successful')) // Notify success
      .catch(error => notifyError(error.message || 'SignUp failed')) // Notify error
      .finally(() => setSubmitting(false)); // Always stop submitting after operation
  };

  return (
    <>
      <AuthContainer>
        <div>
          <ToastContainer />
          <div className={s.loginContainer}>
            <div className={s.loginHeader}>
              <Logo />
              <h1>Register</h1>
              <p>Enter your details to register</p>
            </div>
            <SignUpForm handleSignUp={handleSignUp} />
            <div className={s.loginFooter}>
              <p className={s.navText}>
                Want to test? Visit our
                <button onClick={() => handleTestAuth} className={s.navLink}>
                  Test Page
                </button>
              </p>
            </div>
          </div>
        </div>
      </AuthContainer>
    </>
  );
};

export default SignUpPage;
