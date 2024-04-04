import s from './Budget.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { getBudget } from 'store/finances/finances-selectors';
import { AppDispatch } from 'store/store';
import { useEffect } from 'react';
import { getBudgetOperation } from 'store/finances/finances-operations';

import SvgIcon from 'components/shared/icons/SvgIcon';
import BudgetBarChart from './budgetBarChart/BudgetBarChart';

const Budget = () => {
  const budget = useSelector(getBudget);
  const budgetProgress = [
    { value: Math.round((budget.monthlyExpenses / budget.budgetLimit) * 100) },
  ];

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getBudgetOperation());
  }, [dispatch]);

  return (
    <>
      <div className={`${s.contentBackground} ${s.budgetContainer}`}>
        <h2 className={s.budgetTitle}>Monthly budget</h2>
        <div className={s.flex}>
          <div className={s.countContainer}>
            <span className={s.budgetCount}>€ {budget.budget}</span>{' '}
            <span className={s.budgetText}>left</span>
          </div>
          <p className={s.budgetTrack}>
            € {budget.monthlyExpenses} / € {budget.budgetLimit}
          </p>
        </div>
        <div className={s.barContainer}>
          <BudgetBarChart budgetProgress={budgetProgress} />
        </div>
        <div className={s.iconContainer}>
          <SvgIcon name={'icon-checkCircle'} className={s.iconBudget} />
          <p className={s.budgetText}>Budget on track</p>
        </div>
      </div>
    </>
  );
};

export default Budget;
