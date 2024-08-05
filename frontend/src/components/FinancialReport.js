import React, { useState } from 'react';
import api from '../services/api';

const FinancialReport = () => {
  const [report, setReport] = useState(null);
  const [dates, setDates] = useState({ startDate: '', endDate: '' });

  const handleChange = (e) => {
    setDates({ ...dates, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get('/financial/report', {
        params: dates,
      });
      setReport(response.data);
    } catch (error) {
      console.error('Error fetching financial report:', error);
    }
  };

  return (
    <div>
      <h2>Relatório Financeiro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Data Inicial</label>
          <input
            type="date"
            className="form-control"
            name="startDate"
            value={dates.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Data Final</label>
          <input
            type="date"
            className="form-control"
            name="endDate"
            value={dates.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Gerar Relatório</button>
      </form>
      {report && (
        <div className="mt-4">
          <h4>Relatório de {dates.startDate} a {dates.endDate}</h4>
          <p>Total de Receitas: {report.totalIncome}</p>
          <p>Total de Despesas: {report.totalExpenses}</p>
          <p>Saldo: {report.balance}</p>
        </div>
      )}
    </div>
  );
};

export default FinancialReport;
