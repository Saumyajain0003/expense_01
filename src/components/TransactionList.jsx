import React from 'react';

function TransactionList({ transactions, deleteTransaction }) {
  return (
    <div className="transaction-list">
      <h3>History</h3>
      <ul className="list">
        {transactions.map(transaction => (
          <li 
            key={transaction.id}
            className={transaction.amount < 0 ? 'minus' : 'plus'}
          >
            {transaction.text} 
            <span>${Math.abs(transaction.amount)}</span>
            <button 
              className="delete-btn"
              onClick={() => deleteTransaction(transaction.id)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;