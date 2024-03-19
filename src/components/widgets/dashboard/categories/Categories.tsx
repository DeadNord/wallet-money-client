import s from './Categories.module.scss';
// import sprite from '../../assets/svg/sprites.svg';
import { Route, Router, Routes } from 'react-router-dom';
import { getUserInfo } from 'store/auth/auth-selectors';
import { useDispatch, useSelector } from 'react-redux';
import { getBudget, getExpensesByCategories } from 'store/finances/finances-selectors';
import { AppDispatch } from 'store/store';
import {
  getBudgetOperation,
  getExpensesByCategoriesOperation,
} from 'store/finances/finances-operations';
import { Suspense, lazy, useEffect } from 'react';
import { List } from 'react-virtualized';
import { Cell, Pie, PieChart, ResponsiveContainer, Text } from 'recharts';
import Scrollbar from 'react-scrollbars-custom';

const ExpensePieChart = lazy(() => import('./expensePieChart/ExpensePieChart'));

interface RowRendererParams {
  key: string;
  index: number;
  style: React.CSSProperties;
}

const Categories = () => {
  const expenses = useSelector(getExpensesByCategories);
  const budget = useSelector(getBudget);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpensesByCategoriesOperation());
  }, [dispatch]);

  const rowRenderer = ({ key, index, style }: RowRendererParams) => {
    const expense = expenses[index];
    return (
      <li key={key} style={style} className={s.categoryItem}>
        <div className={s.categoryNameContainer}>
          <div
            className={s.icon}
            style={{ backgroundColor: expense.color || s.basicBackground }}
          ></div>
          <p className={`${s.categoryText} ${s.categoryName}`}>{expense.category}</p>
        </div>
        <p className={s.categoryText}>€{expense.value}</p>
      </li>
    );
  };

  return (
    <>
      <div className={`${s.contentBackground} ${s.categoriesContainer}`}>
        <h2>Top expense categories, Mar</h2>
        <Suspense fallback={<div>Loading Chart...</div>}>
          <ExpensePieChart expenses={expenses} monthlyExpenses={budget.monthlyExpenses} />
        </Suspense>
        <div className={s.categoriesListContainer}>
          <List
            width={300}
            height={40}
            rowCount={expenses.length}
            rowHeight={21}
            rowRenderer={rowRenderer}
          />
        </div>
      </div>
    </>
  );
};

export default Categories;
