import React from 'react';
import { Field, Formik, Form } from 'formik';
import SvgIcon from 'components/shared/icons/SvgIcon';
import s from './TransactionSearchForm.module.scss'; // Убедитесь, что стили правильно импортированы
import { addDays } from 'date-fns';

export interface FormValues {
  name: string;
  startDate: Date;
  endDate: Date;
}

interface TransactionSearchFormProps {
  onSubmit: (values: FormValues) => void;
}

const TransactionSearchForm: React.FC<TransactionSearchFormProps> = React.memo(({ onSubmit }) => {
  const handleSubmitButtonClick = (values: FormValues) => {
    onSubmit(values);
  };
  return (
    <Formik
      initialValues={{
        name: '',
        startDate: addDays(new Date(), -30),
        endDate: new Date(),
      }}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <Form className={s.formContainer}>
          <div className={s.searchContainer}>
            <Field
              name="name"
              className={s.searchInput}
              type="text"
              placeholder="Search for anything..."
            />
            <div onClick={() => handleSubmitButtonClick(values)}>
              <SvgIcon name="icon-search" className={s.searchIcon} />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
});

export default TransactionSearchForm;
