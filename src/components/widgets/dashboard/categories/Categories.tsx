import s from './Categories.module.scss';
import sprite from '../../assets/svg/sprites.svg';
import { Route, Router, Routes } from 'react-router-dom';
import Icon from 'components/shared/icon/Icon';
import { getUserInfo } from 'store/auth/auth-selectors';
import { useDispatch, useSelector } from 'react-redux';
import { getBudget, getExpensesByCategories } from 'store/finances/finances-selectors';
import { AppDispatch } from 'store/store';
import {
  getBudgetOperation,
  getExpensesByCategoriesOperation,
} from 'store/finances/finances-operation';
import { useEffect } from 'react';
import { List } from 'react-virtualized';
import { Cell, Pie, PieChart, ResponsiveContainer, Text } from 'recharts';
import Scrollbar from 'react-scrollbars-custom';

// const generatePurpleShades = (numShades: number) => {
//   const shades = [];
//   const maxLightness = 90; // Максимальная светлость для самого светлого оттенка
//   const minLightness = 30; // Минимальная светлость для самого темного оттенка

//   for (let i = 0; i < numShades; i++) {
//     const lightness = minLightness + (maxLightness - minLightness) * (i / (numShades - 1));
//     shades.push(`hsl(270, 50%, ${lightness}%)`); // HSL для фиолетового цвета (270°)
//   }

//   return shades;
// };

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
    dispatch(getExpensesByCategoriesOperation(null));
  }, [dispatch]);

  const rowRenderer = ({ key, index, style }: RowRendererParams) => {
    const expense = expenses[index];
    return (
      <li key={key} style={style} className={s.categoryItem}>
        <div className={s.categoryNameContainer}>
          <div className={s.categoryIcon}></div>
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
        <ResponsiveContainer width="100%" height={188}>
          <PieChart>
            <Pie
              data={expenses}
              cx="50%"
              cy="50%"
              labelLine={false}
              innerRadius="60%"
              outerRadius="80%"
              // fill="#8884d8"
              dataKey="value"
              stroke="none"
            >
              {expenses.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <text
              x="50%"
              y="45%" // Поднимаем текст чуть выше центра
              textAnchor="middle"
              dominantBaseline="central"
              className={s.chartBudget} // Применяем стили для бюджета
            >
              {`€${budget.monthlyExpenses}`}
            </text>
            <text
              x="50%"
              y="55%" // Размещаем текст чуть ниже центра
              textAnchor="middle"
              dominantBaseline="central"
              className={s.chartText} // Применяем стили для описательного текста
            >
              Total expenses
            </text>
          </PieChart>
        </ResponsiveContainer>
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
