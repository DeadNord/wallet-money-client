import React from 'react';
import { List, AutoSizer } from 'react-virtualized';
import s from './TransactionList.module.scss'; // Убедитесь, что у вас правильные пути к файлам стилей

interface Transaction {
  name: string;
  date: string;
  amount: number;
  type: string;
}

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
              transaction.type === 'Income' ? 'var(--income-color)' : 'var(--outcome-color)',
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
        width={938}
        height={52}
        rowCount={data.length}
        rowHeight={26}
        rowRenderer={rowRenderer}
      />
    </div>
  );
});

export default TransactionList;
