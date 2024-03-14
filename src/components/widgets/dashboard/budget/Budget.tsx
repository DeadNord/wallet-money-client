import s from './Budget.module.scss';

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

import { useDispatch, useSelector } from 'react-redux';
import { getBudget } from 'store/finances/finances-selectors';
import { AppDispatch } from 'store/store';
import { useEffect } from 'react';
import { getBudgetOperation } from 'store/finances/finances-operation';

import variables from "../../../../sass/variables.scss"

const Budget = () => {
  const budget = useSelector(getBudget);
  const budgetProgress = [
    { value: Math.round((budget.monthlyExpenses / budget.budgetLimit) * 100) },
  ];
  console.log(budgetProgress);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getBudgetOperation(null));
  }, [dispatch]);

  return (
    <>
      <div className={`${s.contentBackground} ${s.budgetContainer}`}>
        <h2 className={s.budgetTitle}>Monthly budget</h2>
        <div className={s.flex}>
          <div className={s.countContainer}>
            <span className={s.budgetCount}>$ {budget.budget}</span>{' '}
            <span className={s.budgetText}>left</span>
          </div>
          <p className={s.budgetTrack}>
            $ {budget.monthlyExpenses} / $ {budget.budgetLimit}
          </p>
        </div>
        <div className={s.barContainer}>
          <ResponsiveContainer>
            <BarChart
              layout="vertical"
              data={budgetProgress}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="mainGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={variables.startMainGradient} />
                  <stop offset="100%" stopColor={variables.endMainGradient} />
                </linearGradient>
              </defs>
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} hide />
              <Bar dataKey="value" barSize={17} fill="url(#mainGradient)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className={s.iconContainer}>
          <svg className={s.iconBudget}></svg>
          <p className={s.budgetText}>Budget on track</p>
        </div>
      </div>
    </>
  );
};

export default Budget;
