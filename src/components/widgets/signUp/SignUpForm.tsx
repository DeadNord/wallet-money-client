// SignUpForm.tsx
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import s from './SignUpForm.module.scss'; // Adjust the path as necessary

type SignUpFormValues = {
  name: string;
  email: string;
  mobile: string;
  password: string;
  passwordConfirm: string;
  agreeToTerms: boolean;
};

// Props type for SignUpForm
interface SignUpFormProps {
  handleSignUp: (values: SignUpFormValues, setSubmitting: (isSubmitting: boolean) => void) => void; // Update 'any' to your specific type
}

// Validation schema for the sign-up form using Yup
const signUpValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  mobile: Yup.string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  agreeToTerms: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions'),
});

const SignUpForm: React.FC<SignUpFormProps> = ({ handleSignUp }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        mobile: '',
        password: '',
        passwordConfirm: '',
        agreeToTerms: false,
      }}
      validationSchema={signUpValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleSignUp(values, setSubmitting);
      }}
    >
      {({ errors, touched, isValid, values }) => (
        <Form className={s.loginForm}>
          <Field type="text" name="name" placeholder="Name" className={s.input} />
          {errors.name && touched.name && <div className={s.error}>{errors.name}</div>}
          <Field type="text" name="email" placeholder="Email" className={s.input} />
          {errors.email && touched.email && <div className={s.error}>{errors.email}</div>}
          <Field type="text" name="mobile" placeholder="Mobile Number" className={s.input} />
          {errors.mobile && touched.mobile && <div className={s.error}>{errors.mobile}</div>}
          <Field type="password" name="password" placeholder="Password" className={s.input} />
          {errors.password && touched.password && <div className={s.error}>{errors.password}</div>}
          <Field
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            className={s.input}
          />
          {errors.passwordConfirm && touched.passwordConfirm && (
            <div className={s.error}>{errors.passwordConfirm}</div>
          )}
          <div className={s.checkboxContainer}>
            <Field type="checkbox" name="agreeToTerms" id="agreeToTerms" className={s.checkbox} />
            <label htmlFor="agreeToTerms">I agree with the terms and conditions</label>
          </div>
          <button
            type="submit"
            className={`${s.button} ${s.mainLogin}`}
            disabled={!(isValid && values.agreeToTerms)} // Button is disabled unless form is valid and terms are agreed
          >
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
