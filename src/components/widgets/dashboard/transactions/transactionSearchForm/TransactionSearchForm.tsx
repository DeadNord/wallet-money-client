import React from 'react';
import { Field, Formik, Form } from 'formik';
import SvgIcon from 'components/shared/icons/SvgIcon';
import s from './TransactionSearchForm.module.scss';
import { addDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export interface FormValues {
  name: string;
  startDate: Date | null;
  endDate: Date | null;
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
        startDate: addDays(new Date(), -31),
        endDate: new Date(),
      }}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, values }) => (
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
          <div className={s.dateContainer}>
            <SvgIcon name="icon-calendar" className={s.calendarIcon} />
            <DatePicker
              className={s.datePicker}
              selected={values.startDate}
              onChange={(date: Date) => setFieldValue('startDate', date)}
              dateFormat="d MMMM"
            />
            <p>-</p>
            <DatePicker
              className={s.datePicker}
              selected={values.endDate}
              onChange={(date: Date) => setFieldValue('endDate', date)}
              dateFormat="d MMMM"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
});

export default TransactionSearchForm;
