import s from './Transactions.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from 'store/finances/finances-selectors';
// import { Field, Formik, Form } from 'formik';

import { getTransactionsOperation } from 'store/finances/finances-operation';
import { Suspense, lazy, useEffect } from 'react';
import { AppDispatch } from 'store/store';
// import SvgIcon from 'components/shared/icons/SvgIcon';

const TransactionList = lazy(() => import('./transactionList/TransactionList'));
const TransactionSearchForm = lazy(() => import('./transactionSearchForm/TransactionSearchForm'));

const Transactions = () => {
  const data = useSelector(getTransactions);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactionsOperation(null));
  }, [dispatch]);

  const submitForm = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <div className={`${s.contentBackground} ${s.transactionsContainer}`}>
        <div className={s.titleContainer}>
          <h2 className={s.title}>Transactions</h2>
          <Suspense fallback={<div>Loading Search Form...</div>}>
            <TransactionSearchForm onSubmit={submitForm} />
          </Suspense>
        </div>
        <div>
          <div className={s.headerContainer}>
            <div className={s.headerItem}>Name</div>
            <div className={s.headerItem}>Date</div>
            <div className={s.headerItem}>Amount</div>
            <div className={s.headerItem}>Status</div>
          </div>
          <Suspense fallback={<div>Loading Transactions...</div>}>
            <TransactionList data={data} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Transactions;
