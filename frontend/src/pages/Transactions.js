import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    type: '',
    description: '',
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      const result = await axios.get('/api/transactions', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTransactions(result.data);
    };

    fetchTransactions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/transactions', newTransaction, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    const result = await axios.get('/api/transactions', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setTransactions(result.data);
  };

  return (
    <div className="container mt-5">
      <h2>Controle de Recebimentos</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Valor</label>
          <input type="number" className="form-control" name="amount" value={newTransaction.amount} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Tipo</label>
          <input type="text" className="form-control" name="type" value={newTransaction.type} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <input type="text" className="form-control" name="description" value={newTransaction.description} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Adicionar Transação</button>
      </form>
      <h3>Lista de Transações</h3>
      <ul className="list-group">
        {transactions.map(transaction => (
          <li key={transaction.id} className="list-group-item">
            Valor: R${transaction.amount}, Tipo: {transaction.type}, Descrição: {transaction.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
