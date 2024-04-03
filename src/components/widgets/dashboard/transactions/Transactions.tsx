import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from 'store/finances/finances-selectors';
import { getTransactionsOperation } from 'store/finances/finances-operations';
import { AppDispatch } from 'store/store';
import { FormValues } from './transactionSearchForm/TransactionSearchForm';
import s from './Transactions.module.scss';

// Lazy loading components for improved performance
const TransactionList = React.lazy(() => import('./transactionList/TransactionList'));
const TransactionSearchForm = React.lazy(
  () => import('./transactionSearchForm/TransactionSearchForm'),
);

const Transactions = () => {
  // Fetch transactions from the Redux store
  const transactions = useSelector(getTransactions);
  const dispatch: AppDispatch = useDispatch();

  // Dispatch action to fetch transactions on component mount
  useEffect(() => {
    dispatch(getTransactionsOperation({ name: '', startDate: '', endDate: '' }));
  }, [dispatch]);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  // Function to handle form submission
  const submitForm = (values: FormValues) => {
    const { name, startDate, endDate } = values;
    const formattedName = name ?? null;
    const formattedStartDate = startDate ? formatDate(startDate) : null;
    const formattedEndDate = endDate ? formatDate(endDate) : null;

    dispatch(
      getTransactionsOperation({
        name: formattedName,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      }),
    );
  };

  return (
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
          {transactions && <TransactionList data={transactions} />}
        </Suspense>
      </div>
    </div>
  );
};

export default Transactions;
