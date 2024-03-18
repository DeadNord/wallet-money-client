import React, { Suspense, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionsByWeek } from 'store/finances/finances-selectors';
import { getTransactionsByWeekOperation } from 'store/finances/finances-operations';
import s from './Analytics.module.scss';
// import AnalyticsChart from './analyticsChart/AnalyticsChart';
import { AppDispatch } from 'store/store';
const LazyAnalyticsChart = React.lazy(() => import('./analyticsChart/AnalyticsChart'));

const Analytics = () => {
  const data = useSelector(getTransactionsByWeek);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactionsByWeekOperation());
  }, [dispatch]);

  return (
    <>
      <div className={`${s.contentBackground} ${s.analyticsContainer}`}>
        <div className={`${s.flex} ${s.titleContainer}`}>
          <h2 className={s.title}>Analytics</h2>
          <div className={s.flex}>
            <div className={s.flex}>
              <div className={`${s.icon} ${s.iconIncome}`}></div>
              <p className={s.text}>Income</p>
            </div>
            <div className={`${s.flex} ${s.iconContainer}`}>
              <div className={`${s.icon} ${s.iconOutcome}`}></div>
              <p className={s.text}>Outcome</p>
            </div>
          </div>
        </div>
        <Suspense fallback={<div>Loading Chart...</div>}>
          <LazyAnalyticsChart data={data} />
        </Suspense>
      </div>
    </>
  );
};

export default Analytics;
