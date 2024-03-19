import React from 'react';
import { List } from 'react-virtualized';
import s from './TransactionList.module.scss'; // Убедитесь, что у вас правильные пути к файлам стилей
import { Transaction } from 'store/finances/FinancesTypes';
import variables from '../../../../../sass/variables.scss';

interface TransactionListProps {
  data: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = React.memo(({ data }) => {
  const rowRenderer = ({
    key,
    index,
    style,
  }: {
    key: string;
    index: number;
    style: React.CSSProperties;
  }) => {
    const transaction = data[index];
    return (
      <div key={key} style={style} className={s.tableItem}>
        <div className={s.tableCell}>{transaction.name}</div>
        <div className={s.tableCell}>{transaction.date}</div>
        <div className={`${s.tableCell} ${s.amount}`}>€{transaction.amount}</div>
        <div
          className={`${s.tableCell} ${s.type}`}
          style={{
            backgroundColor:
              transaction.type === 'Income' ? variables.incomeColor : variables.outcomeColor,
          }}
        >
          {transaction.type}
        </div>
      </div>
    );
  };

  return (
    <div className={s.tableContainer}>
      <List
        width={1000}
        height={52}
        rowCount={data.length}
        rowHeight={26}
        rowRenderer={rowRenderer}
      />
    </div>
  );
});

export default TransactionList;
