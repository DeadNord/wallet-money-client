import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import s from './AddTransactionModal.module.scss';
import SvgIcon from 'components/shared/icons/SvgIcon';
import { addTransactionOperation } from 'store/finances/finances-operations';
import { AppDispatch } from 'store/store';
import { useDispatch } from 'react-redux';
import { Transaction, TransactionType } from 'store/finances/FinancesTypes';

// Validation schema using Yup
const TransactionSchema = Yup.object().shape({
  type: Yup.string().required('Required'),
  amount: Yup.number().positive('Amount must be positive').required('Required'),
  //   date: Yup.date().required('Required'),
  //   fromAccount: Yup.string().required('Required'),
  //   category: Yup.string().required('Required'),
  notes: Yup.string(),
});

const AddTransactionModal = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (values: Transaction) => {
    const { type, amount, date, fromAccount, category, notes } = values;
    dispatch(
      addTransactionOperation({ type, name: category, amount, date, fromAccount, category, notes }),
    );
  };

  return (
    <div className={s.modalContent}>
      <Formik
        initialValues={{
          type: 'expense',
          name: '',
          amount: '',
          date: '',
          fromAccount: '',
          category: '',
          notes: '',
        }}
        validationSchema={TransactionSchema}
        onSubmit={(values, { setSubmitting }) => {
          const transactionData: Transaction = {
            ...values,
            amount: parseFloat(values.amount), // Convert string to number
            type: values.type as TransactionType, // Assert to TransactionType
          };
          handleSubmit(transactionData);
          setSubmitting(false);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className={s.form}>
            <div className={s.buttonGroup}>
              <button
                type="button"
                onClick={() => setFieldValue('type', 'expense')}
                className={`${s.typeButton} ${values.type === 'expense' ? s.active : ''}`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => setFieldValue('type', 'income')}
                className={`${s.typeButton} ${values.type === 'income' ? s.active : ''}`}
              >
                Income
              </button>
            </div>

            <div className={s.sectionContainer}>
              <div className={s.inputContainer}>
                <span className={s.inputLabel}>$</span>
                <Field type="number" name="amount" className={s.input} placeholder="0" />
              </div>
            </div>

            <div className={s.sectionContainer}>
              <div className={s.flex}>
                <SvgIcon name={'icon-money-cycle'} className={s.icon} />
                <div>
                  <p className={s.label}>From account</p>
                  <Field as="select" name="fromAccount" className={s.select}>
                    <option value="">Select account</option>
                  </Field>
                </div>
              </div>
            </div>

            <div className={s.sectionContainer}>
              <div className={s.flex}>
                <SvgIcon name={'icon-cart'} className={s.icon} />
                <div>
                  <p className={s.label}>To category</p>
                  <Field as="select" name="category" className={s.select}>
                    <option value="">Select category</option>
                  </Field>
                </div>
              </div>
            </div>

            <div className={s.notesContainer}>
              <div className={`${s.flex} ${s.notesLabelContainer}`}>
                <SvgIcon name={'icon-pen'} className={s.icon} />
                <p className={s.label}>Add Notes</p>
              </div>
              <Field as="textarea" name="notes" className={s.textInput} />
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
