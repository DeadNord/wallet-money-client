import s from './Transactions.module.scss';
import sprite from '../../assets/svg/sprites.svg';
import Icon from 'components/shared/icon/Icon';
import { getUserInfo } from 'store/auth/auth-selectors';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from 'store/finances/finances-selectors';
import { AutoSizer, Column, List, Table } from 'react-virtualized';
import { Field, Formik, Form } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import variables from '../../../../sass/variables.scss';
import { getTransactionsOperation } from 'store/finances/finances-operation';
import { useEffect } from 'react';
import { AppDispatch } from 'store/store';

interface RowRendererParams {
  key: string;
  index: number;
  style: React.CSSProperties;
}

const Transactions = () => {
  const data = useSelector(getTransactions);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactionsOperation(null));
  }, [dispatch]);

  const submitForm = (values: any) => {
    console.log(values);
  };

  const rowRenderer = ({ key, index, style }: RowRendererParams) => {
    const transaction = data[index];

    return (
      <div key={key} className={s.tableItem}>
        <div className={s.tableCell}>{transaction.name}</div>
        <div className={s.tableCell}>{transaction.date}</div>
        <div className={`${s.tableCell} ${s.amount}`}>€{transaction.amount}</div>
        <div
          className={`${s.tableCell} ${s.type}`}
          style={{
            backgroundColor:
              transaction.type === 'Income' ? variables.incomeColor : variables.outcomeColor,
          }}
        >
          {transaction.type}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={`${s.contentBackground} ${s.transactionsContainer}`}>
        <div className={s.titleContainer}>
          <h2 className={s.title}>Transactions</h2>
          <Formik
            initialValues={{ searchTerm: '', startDate: new Date(), endDate: new Date() }}
            onSubmit={(values, { setSubmitting }) => {
              submitForm(values);
            }}
          >
            {formikProps => (
              <Form className={s.formContainer}>
                <div className={s.seachContainer}>
                  <Field
                    name="search"
                    className={s.searchInput}
                    type="text"
                    placeholder="Search for anything..."
                  />
                  <div className={s.searchIcon}></div>
                </div>
                {/* <DatePicker
                  name="startDate"
                  selected={formikProps.values.startDate}
                  onChange={(date: Date | null) => formikProps.setFieldValue('startDate', date)}
                  selectsStart
                  startDate={formikProps.values.startDate}
                  endDate={formikProps.values.endDate}
                  isClearable
                  placeholderText="Start Date"
                />
                <DatePicker
                  name="endDate"
                  selected={formikProps.values.endDate}
                  onChange={(date: Date | null) => formikProps.setFieldValue('endDate', date)}
                  selectsEnd
                  startDate={formikProps.values.startDate}
                  endDate={formikProps.values.endDate}
                  minDate={formikProps.values.startDate}
                  isClearable
                  placeholderText="End Date"
                /> */}
              </Form>
            )}
          </Formik>
        </div>
        <div>
          <div className={s.headerContainer}>
            <div className={s.headerItem}>Name</div>
            <div className={s.headerItem}>Date</div>
            <div className={s.headerItem}>Amount</div>
            <div className={s.headerItem}>Status</div>
          </div>
          <AutoSizer className={s.tableContainer}>
            {({ width, height }) => (
              <List
                width={width}
                height={52}
                rowCount={data.length}
                rowHeight={21}
                rowRenderer={rowRenderer}
              />
            )}
          </AutoSizer>
        </div>
      </div>
    </>
  );
};

export default Transactions;
