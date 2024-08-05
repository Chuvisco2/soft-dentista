import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Commissions = () => {
  const [commissions, setCommissions] = useState([]);
  const [newCommission, setNewCommission] = useState({
    amount: '',
    date: '',
    dentistId: '',
  });

  useEffect(() => {
    const fetchCommissions = async () => {
      const result = await axios.get('/api/commissions', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCommissions(result.data);
    };

    fetchCommissions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCommission({ ...newCommission, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/commissions', newCommission, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    const result = await axios.get('/api/commissions', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setCommissions(result.data);
  };

  return (
    <div className="container mt-5">
      <h2>Gestão de Comissões</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Valor</label>
          <input type="number" className="form-control" name="amount" value={newCommission.amount} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Data</label>
          <input type="date" className="form-control" name="date" value={newCommission.date} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">ID do Dentista</label>
          <input type="text" className="form-control" name="dentistId" value={newCommission.dentistId} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Adicionar Comissão</button>
      </form>
      <h3>Lista de Comissões</h3>
      <ul className="list-group">
        {commissions.map(commission => (
          <li key={commission.id} className="list-group-item">
            Valor: R${commission.amount}, Data: {commission.date}, Dentista: {commission.dentistId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Commissions;
