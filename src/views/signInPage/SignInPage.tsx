import { NavLink } from 'react-router-dom';
import s from './SignInPage.module.scss';
// import sprite from '../../assets/svg/sprites.svg';
// import { useDispatch } from 'react-redux';
// import { signInOperation } from '../../store/auth/auth-operation';
import { Formik, Form, Field } from 'formik';
import AuthContainer from 'components/shared/authContainer/AuthContainer';
import classnames from 'classnames';
import { signInOperation } from 'store/auth/auth-operation';
import { useDispatch } from 'react-redux';
import Icon from 'components/shared/icon/Icon';
// import { useState } from 'react';

const SignInPage = () => {
  //   const [passwordState, setPasswordToogle] = useState(false);

    const dispatch = useDispatch<any>();

  //   const passwordToogle = () => {
  //     setPasswordToogle(!passwordState);
  //   };
  const TestAuth = () => {
    // Implement your authentication test logic here
    console.log('Testing Authentication');
  };

  const signIn = (values: any) => {
    dispatch(signInOperation(values))
  };

  return (
    <>
      <AuthContainer>
        <div className={s.loginContainer}>
          <div className={s.loginHeader}>
            <Icon/>
            <h1>Login</h1>
            <p>Enter your username and password to login</p>
          </div>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={values => {
              signIn(values);
            }}
          >
            <Form className={s.loginForm}>
              <Field type="text" name="email" placeholder="Email" className={s.input} />
              <NavLink to="#" className={s.inputLink}>
                Forgot Username?
              </NavLink>
              <Field type="password" name="password" placeholder="Password" className={s.input} />
              <NavLink to="#" className={s.inputLink}>
                Forgot Password?
              </NavLink>
              <button type="submit" className={`${s.button} ${s.mainLogin}`}>
                Login
              </button>
              <p className={s.altLoginText}>Or login with</p>
              <button type="button" className={`${s.button} ${s.googleLogin}`}>
                Google
              </button>
            </Form>
          </Formik>
          <div className={s.loginFooter}>
            <p  className={s.navText}>
            Don't have an account? <NavLink to="/signUp" className={s.navLink}>Register</NavLink>
            </p>
            <p  className={s.navText}>
            Want test? Visit our <button onClick={TestAuth} className={s.navLink}>Test Page</button>
            </p>
          </div>
        </div>
      </AuthContainer>
    </>
  );
};

export default SignInPage;
