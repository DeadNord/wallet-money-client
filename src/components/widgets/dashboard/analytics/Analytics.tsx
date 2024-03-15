import s from './Analytics.module.scss';
import sprite from '../../assets/svg/sprites.svg';
import { Route, Router, Routes } from 'react-router-dom';
import Icon from 'components/shared/icon/Icon';
import { getUserInfo } from 'store/auth/auth-selectors';
import { useDispatch, useSelector } from 'react-redux';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts';
import { AppDispatch } from 'store/store';
import { useEffect } from 'react';
import { getTransactionsByWeek } from 'store/finances/finances-selectors';
import { getTransactionsByWeekOperation } from 'store/finances/finances-operation';

import variables from '../../../../sass/variables.scss';

const Analytics = () => {
  const data = useSelector(getTransactionsByWeek);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactionsByWeekOperation(null));
  }, [dispatch]);

  // console.log(data);

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
        <div>
          <BarChart
            width={600}
            height={260}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              tick={{ fontSize: 12, fontWeight: 300, fill: variables.mainTextColor }}
              dataKey="name"
              dy={5}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fontWeight: 300, fill: variables.mainTextColor }}
              dx={-20}
              axisLine={false}
              tickLine={false}
            />
            {/* <Tooltip /> */}
            <Bar dataKey="Income" fill={variables.incomeColor} radius={[10, 10, 0, 0]} barSize={9} />
            <Bar dataKey="Outcome" fill={variables.outcomeColor} radius={[10, 10, 0, 0]} barSize={9} />
          </BarChart>
        </div>
      </div>
    </>
  );
};

export default Analytics;
