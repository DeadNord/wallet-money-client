import { NavLink } from 'react-router-dom';
import s from './SignUpPage.module.scss';
import sprite from '../../assets/svg/sprites.svg';
// import { useDispatch } from 'react-redux';
// import { signInOperation } from '../../store/auth/auth-operation';
import { Formik, Form, Field } from 'formik';
import AuthContainer from 'components/shared/authContainer/AuthContainer';
import classnames from 'classnames';
// import { useState } from 'react';

const SignUpPage = () => {
  //   const [passwordState, setPasswordToogle] = useState(false);

  //   const dispatch = useDispatch<any>();

  //   const passwordToogle = () => {
  //     setPasswordToogle(!passwordState);
  //   };
  const TestAuth = () => {
    // Implement your authentication test logic here
    console.log('Testing Authentication');
  };

  const signIn = (values: any) => {
    // Implement your authentication test logic here
    console.log('Testing Authentication');
  };

  return (
    <>
      <AuthContainer>
        <div className={s.loginContainer}>
          <div className={s.loginHeader}>
            <svg className={s.icon}>
              <use href={sprite + '#icon-logo'} />
            </svg>
            <h1>Register</h1>
            <p>Enter your details to register</p>
          </div>
          <Formik
            initialValues={{
              username: '',
              email: '',
              mobile: '',
              password: '',
              passwordConfirm: '',
            }}
            onSubmit={values => {
              signIn(values);
            }}
          >
            <Form className={s.loginForm}>
              <Field type="text" name="username" placeholder="Name" className={s.input} />
              <Field type="text" name="email" placeholder="Email" className={s.input} />
              <Field type="text" name="mobile" placeholder="Mobile Number" className={s.input} />
              <Field type="password" name="password" placeholder="Password" className={s.input} />
              <Field
                type="password"
                name="passwordConfirm"
                placeholder="Confirm Password"
                className={s.input}
              />
              <div className={s.checkboxContainer}>
                <Field type="checkbox" name="agreeToTerms" id="agreeToTerms" />
                <label htmlFor="agreeToTerms">I agree with the terms and conditions</label>
              </div>
              <button type="submit" className={`${s.button} ${s.mainLogin}`}>
                Login
              </button>
            </Form>
          </Formik>
          <div className={s.loginFooter}>
            <p className={s.navText}>
              Want test? Visit our{' '}
              <button onClick={TestAuth} className={s.navLink}>
                Test Page
              </button>
            </p>
          </div>
        </div>
      </AuthContainer>
    </>
  );
};

export default SignUpPage;
