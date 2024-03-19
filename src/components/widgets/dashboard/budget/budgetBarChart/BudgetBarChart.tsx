// BudgetBarChart.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import variables from '../../../.././../sass/variables.scss';

// Props type, if using TypeScript
interface BudgetBarChartProps {
  budgetProgress: { value: number }[];
}

const BudgetBarChart: React.FC<BudgetBarChartProps> = ({ budgetProgress }) => {
  return (
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
  );
};

export default BudgetBarChart;
