import React from 'react';
import { List } from 'react-virtualized';
import s from './CategoriesList.module.scss';
import { CategoryExpense } from 'store/finances/FinancesTypes';

interface CategoriesListProps {
  expenses: CategoryExpense[];
}

interface RowRendererParams {
  key: string;
  index: number;
  style: React.CSSProperties;
}

export const CategoriesList: React.FC<CategoriesListProps> = ({ expenses }) => {
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
    <List
      width={300}
      height={40}
      rowCount={expenses.length}
      rowHeight={21}
      rowRenderer={rowRenderer}
      overscanRowCount={3}
    />
  );
};
