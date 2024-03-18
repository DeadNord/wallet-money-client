import React from 'react';
import { Field, Formik, Form } from 'formik';
import SvgIcon from 'components/shared/icons/SvgIcon';
import s from './TransactionSearchForm.module.scss'; // Убедитесь, что стили правильно импортированы
import { addDays } from 'date-fns';

interface FormValues {
  searchTerm: string;
  startDate: Date;
  endDate: Date;
}

interface TransactionSearchFormProps {
  onSubmit: (values: FormValues) => void;
}

const TransactionSearchForm: React.FC<TransactionSearchFormProps> = React.memo(({ onSubmit }) => {
  console.log('TransactionSearchForm rendered');
  return (
    <Formik
      initialValues={{ searchTerm: '', startDate: new Date(), endDate: addDays(new Date(), 30) }}
      onSubmit={onSubmit}
    >
      <Form className={s.formContainer}>
        <div className={s.seachContainer}>
          <Field
            name="search"
            className={s.searchInput}
            type="text"
            placeholder="Search for anything..."
          />
          <SvgIcon name="icon-search" className={s.searchIcon} />
        </div>
      </Form>
    </Formik>
  );
});

export default TransactionSearchForm;