import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionsByWeek } from 'store/finances/finances-selectors';
import { getTransactionsByWeekOperation } from 'store/finances/finances-operations';
import s from './Analytics.module.scss';
import { AppDispatch } from 'store/store';
const LazyAnalyticsChart = React.lazy(() => import('./analyticsChart/AnalyticsChart'));

// Component showcasing the analytics section of the dashboard
const Analytics = () => {
  // Fetching the weekly transactions data from the store
  const data = useSelector(getTransactionsByWeek);
  const dispatch: AppDispatch = useDispatch();

  // Fetching the weekly transactions data when the component mounts
  useEffect(() => {
    dispatch(getTransactionsByWeekOperation());
  }, [data, dispatch]);

  return (
    <div className={`${s.contentBackground} ${s.analyticsContainer}`}>
      <div className={`${s.flex} ${s.titleContainer}`}>
        <h2 className={s.title}>Analytics</h2>
        <div className={`${s.flex}`}>
          <div className={`${s.flex} ${s.indicatorItem}`}>
            <div className={`${s.icon} ${s.iconIncome}`} />
            <p className={s.text}>Income</p>
          </div>
          <div className={`${s.flex} ${s.iconOutcomeContainer}`}>
            <div className={`${s.icon} ${s.iconOutcome}`} />
            <p className={s.text}>Outcome</p>
          </div>
        </div>
      </div>
      <Suspense fallback={<div>Loading Chart...</div>}>
        <LazyAnalyticsChart data={data} />
      </Suspense>
    </div>
  );
};

export default Analytics;
