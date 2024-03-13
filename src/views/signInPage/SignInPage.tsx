import { NavLink } from 'react-router-dom';
import s from './SignInPage.module.scss';
import sprite from '../../assets/svg/sprites.svg';
// import { useDispatch } from 'react-redux';
// import { signInOperation } from '../../store/auth/auth-operation';
import { Formik, Form, Field } from 'formik';
import classNames from 'classnames';
// import { useState } from 'react';

const SignInPage = () => {  
//   const [passwordState, setPasswordToogle] = useState(false);
  
//   const dispatch = useDispatch<any>();

//   const passwordToogle = () => {
//     setPasswordToogle(!passwordState);
//   };

  return (
    <>
      <div >
        <div >
          <span >SignIn</span>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={values => {
            //   dispatch(signInOperation(values));
            }}
          >
            <Form >
              <Field  name="email" type="email" placeholder="Email" />
              <div >
                <Field
                  
                  name="password"
                //   type={passwordState ? 'text' : 'password'}
                  placeholder="Password"
                />
                <svg  
                // onClick={() => passwordToogle()}
                >
                  {/* <use href={sprite + (passwordState ? '#icon-eye' : '#icon-eyeSlash')}></use> */}
                </svg>
              </div>
              <button type="submit">
                SignIn
              </button>
            </Form>
          </Formik>
          <div >
            <NavLink to="/signUp/merchant" >
              Sign up new Merchant
            </NavLink>
            <NavLink to="/signUp/customer" >
              Sign up new Customer
            </NavLink>
          </div>
          <NavLink  to="/recovery">
            Password recovery
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
