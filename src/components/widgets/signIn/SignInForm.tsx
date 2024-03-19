import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import s from './SignInForm.module.scss';

// Define your validation schema
const signInValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

// Define props type
interface SignInFormProps {
  handleSignIn: (values: any, setSubmitting: (isSubmitting: boolean) => void) => void; // Update 'any' to your specific type
}

const SignInForm: React.FC<SignInFormProps> = ({ handleSignIn }) => {
  return (
    <Formik
      initialValues={{ email: '', password: '', confirmPassword: '' }}
      validationSchema={signInValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleSignIn(values, setSubmitting);
      }}
    >
      {({ errors, touched }) => (
        <Form className={s.loginForm}>
          {/* Form fields and validation messages */}
          <Field name="email" type="text" placeholder="Email" className={s.input} />
          {errors.email && touched.email && <div className={s.error}>{errors.email}</div>}
          <NavLink to="#" className={s.inputLink}>
            Forgot Username?
          </NavLink>
          <Field name="password" type="password" placeholder="Password" className={s.input} />
          {errors.password && touched.password && <div className={s.error}>{errors.password}</div>}
          <NavLink to="#" className={s.inputLink}>
            Forgot Password?
          </NavLink>
          <button type="submit" className={`${s.button} ${s.mainLogin}`}>
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
