/* eslint-disable camelcase */
import { Formik, Form, Field } from 'formik';
import Select, { SingleValue } from 'react-select';
import * as Yup from 'yup';
import s from './AddTransactionModal.module.scss';
import SvgIcon from 'components/shared/icons/SvgIcon';
import {
  addTransactionOperation,
  getCategoriesOperation,
} from 'store/finances/finances-operations';
import { AppDispatch } from 'store/store';
import { useDispatch, useSelector } from 'react-redux';
import { TransactionSentData, TransactionType } from 'store/finances/FinancesTypes';
import { useEffect, useState } from 'react';
import { getCategories } from 'store/finances/finances-selectors';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface OptionType {
  value: string;
  label: string;
}

// Validation schema using Yup
const TransactionSchema = Yup.object().shape({
  type: Yup.string().required('Required'),
  amount: Yup.number().positive('Amount must be positive').required('Required'),
  fromAccount: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  note: Yup.string(),
});

interface IDate {
  date: Date | null;
}

const AddTransactionModal = ({ closeModal }: { closeModal: () => void }) => {
  const [startDate, setStartDate] = useState<IDate>({ date: new Date() });
  const dispatch: AppDispatch = useDispatch();

  const categories = useSelector(getCategories);

  const accounts = [
    { id: '1', name: 'Savings' },
    { id: '2', name: 'Checking' },
  ];

  // Dispatch action to fetch transactions on component mount
  useEffect(() => {
    dispatch(getCategoriesOperation());
  }, [dispatch]);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (values: TransactionSentData) => {
    const { name, type, amount, from_account, category_id, note } = values;
    const formattedDate = startDate.date ? formatDate(startDate.date) : '';
    await dispatch(
      addTransactionOperation({
        type,
        name,
        amount,
        date: formattedDate,
        from_account,
        category_id,
        note,
      }),
    );
    closeModal();
  };

  const categoryOptions: OptionType[] = categories.map(category => ({
    value: category.name,
    label: category.name,
  }));

  const accountOptions: OptionType[] = accounts.map(account => ({
    value: account.name,
    label: account.name,
  }));

  return (
    <div className={s.modalContent}>
      <Formik
        initialValues={{
          type: 'Expense',
          name: '',
          amount: '',
          date: '',
          fromAccount: '',
          category: '',
          note: '',
        }}
        validationSchema={TransactionSchema}
        onSubmit={(values, { setSubmitting }) => {
          const categoryId = categories.find(c => c.name === values.category)?.id ?? null;
          const transactionData: TransactionSentData = {
            ...values,
            amount: parseFloat(values.amount), // Convert string to number
            type: values.type as TransactionType, // Assert to TransactionType
            category_id: categoryId,
            from_account: values.fromAccount,
            name: values.category,
          };
          handleSubmit(transactionData);
          setSubmitting(false);
        }}
      >
        {({ setFieldValue, values, setFieldTouched }) => (
          <Form className={s.form}>
            <div className={s.buttonGroup}>
              <button
                type="button"
                onClick={() => setFieldValue('type', 'Expense')}
                className={`${s.typeButton} ${values.type === 'Expense' ? s.active : ''}`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => setFieldValue('type', 'Income')}
                className={`${s.typeButton} ${values.type === 'Income' ? s.active : ''}`}
              >
                Income
              </button>
            </div>

            <div className={s.sectionContainer}>
              <div className={s.inputContainer}>
                <span className={s.inputLabel}>$</span>
                <Field type="number" name="amount" className={s.input} placeholder="0" />
              </div>
              <div className={s.flex}>
                <SvgIcon name={'icon-calendar'} className={s.iconSmall} />
                <DatePicker
                  className={s.datePicker}
                  selected={startDate.date}
                  onChange={date => setStartDate({ date })}
                />
              </div>
            </div>

            <div className={s.sectionContainer}>
              <div className={s.flex}>
                <SvgIcon name={'icon-money-cycle'} className={s.icon} />
                <div>
                  <p className={s.label}>From account</p>
                  <Select
                    options={accountOptions}
                    className={s.select}
                    onChange={(option: SingleValue<string | OptionType>) => {
                      if (option !== undefined && option !== null && typeof option !== 'string') {
                        setFieldValue('fromAccount', option.value);
                      }
                    }}
                    onBlur={() => setFieldTouched('fromAccount', true)}
                    value={accountOptions.find(option => option.value === values.fromAccount) || ''}
                  />
                </div>
              </div>
            </div>
            <div className={s.sectionContainer}>
              <div className={s.flex}>
                <SvgIcon name={'icon-cart'} className={s.icon} />
                <div>
                  <p className={s.label}>To category</p>
                  <Select
                    options={categoryOptions}
                    className={s.select}
                    onChange={(option: SingleValue<string | OptionType>) => {
                      if (option !== undefined && option !== null && typeof option !== 'string') {
                        setFieldValue('category', option.value);
                      }
                    }}
                    onBlur={() => setFieldTouched('category', true)}
                    value={categoryOptions.find(option => option.value === values.category) || ''}
                  />
                </div>
              </div>
            </div>

            <div className={s.notesContainer}>
              <div className={`${s.flex} ${s.notesLabelContainer}`}>
                <SvgIcon name={'icon-pen'} className={s.icon} />
                <p className={s.label}>Add Notes</p>
              </div>
              <Field as="textarea" name="note" className={s.textInput} />
            </div>

            <div className={s.saveButtonContainer}>
              <button type="submit" className={s.saveButton}>
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTransactionModal;
