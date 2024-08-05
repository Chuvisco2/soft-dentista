import React, { useState } from 'react';
import axios from 'axios';

const Financial = () => {
  const [report, setReport] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0
  });

  const [dates, setDates] = useState({
    startDate: '',
    endDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDates({ ...dates, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.get('/api/financial', { params: dates });
    setReport(result.data);
  };

  return (
    <div className="container mt-5">
      <h2>Relatório Financeiro</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Data Inicial</label>
          <input type="date" className="form-control" name="startDate" value={dates.startDate} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Data Final</label>
          <input type="date" className="form-control" name="endDate" value={dates.endDate} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Gerar Relatório</button>
      </form>
      <h3>Resultados</h3>
      <ul className="list-group">
        <li className="list-group-item">Receita Total: {report.totalIncome}</li>
        <li className="list-group-item">Despesas Totais: {report.totalExpenses}</li>
        <li className="list-group-item">Balanço: {report.balance}</li>
      </ul>
    </div>
  );
};

export default Financial;
