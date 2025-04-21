import React from 'react';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Balance from './components/Balance';
import IncomeExpense from './components/IncomeExpense';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'income') return transaction.amount > 0;
    if (filter === 'expense') return transaction.amount < 0;
    return true;
  });

  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="theme-toggle">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
      <Header />
      <Balance transactions={transactions} />
      <IncomeExpense transactions={transactions} />
      <div className="filter-buttons">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={filter === 'income' ? 'active' : ''} 
          onClick={() => setFilter('income')}
        >
          Income
        </button>
        <button 
          className={filter === 'expense' ? 'active' : ''} 
          onClick={() => setFilter('expense')}
        >
          Expenses
        </button>
      </div>
      <TransactionList 
        transactions={filteredTransactions} 
        deleteTransaction={deleteTransaction} 
      />
      <AddTransaction addTransaction={addTransaction} />
    </div>
  );
}

export default App