import { useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBudget, getExpensesByCategories } from 'store/finances/finances-selectors';
import { getExpensesByCategoriesOperation } from 'store/finances/finances-operations';
import s from './Categories.module.scss';
import { CategoriesList } from './categoriesList/CategoriesList';
import { AppDispatch } from 'store/store';
const ExpensePieChart = lazy(() => import('./expensePieChart/ExpensePieChart'));

const Categories = () => {
  const expenses = useSelector(getExpensesByCategories);
  const budget = useSelector(getBudget);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpensesByCategoriesOperation());
  }, [expenses, budget, dispatch]);

  return (
    <div className={`${s.contentBackground} ${s.categoriesContainer}`}>
      <h2>Top expense categories, Mar</h2>
      <Suspense fallback={<div>Loading Chart...</div>}>
        <ExpensePieChart expenses={expenses} monthlyExpenses={budget.monthlyExpenses} />
      </Suspense>
      <div className={s.categoriesListContainer}>
        <Suspense fallback={<div>Loading List...</div>}>
          <CategoriesList expenses={expenses} />
        </Suspense>
      </div>
    </div>
  );
};

export default Categories;
