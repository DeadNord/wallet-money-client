import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Bar } from 'recharts';
import variables from '../../../../../sass/variables.scss';
import { WeeklyTransactionSummary } from 'store/finances/FinancesTypes';

interface AnalyticsChartProps {
  data: WeeklyTransactionSummary[];
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = React.memo(({ data }) => {
  return (
    <BarChart
      width={600}
      height={260}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis
        tick={{ fontSize: 12, fontWeight: 300, fill: variables.mainTextColor }}
        dataKey="day"
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
      <Bar dataKey="income" fill={variables.incomeColor} radius={[10, 10, 0, 0]} barSize={9} />
      <Bar dataKey="outcome" fill={variables.outcomeColor} radius={[10, 10, 0, 0]} barSize={9} />
    </BarChart>
  );
});

export default AnalyticsChart;
