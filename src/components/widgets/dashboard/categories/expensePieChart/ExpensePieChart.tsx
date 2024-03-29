import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import s from './ExpensePieChart.module.scss';
import { CategoryExpense } from 'store/finances/FinancesTypes';

interface ExpensePieChartProps {
  expenses: CategoryExpense[];
  monthlyExpenses: number;
}

const ExpensePieChart = React.memo(({ expenses, monthlyExpenses }: ExpensePieChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={188}>
      <PieChart>
        <Pie
          data={expenses}
          cx="50%"
          cy="50%"
          labelLine={false}
          innerRadius="60%"
          outerRadius="80%"
          dataKey="value"
          stroke="none"
        >
          {expenses.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || s.basicBackground} />
          ))}
        </Pie>
        <text
          x="50%"
          y="45%"
          textAnchor="middle"
          dominantBaseline="central"
          className={s.chartBudget}
        >
          {`€${monthlyExpenses}`}
        </text>
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          dominantBaseline="central"
          className={s.chartText}
        >
          Total expenses
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
});

export default ExpensePieChart;
