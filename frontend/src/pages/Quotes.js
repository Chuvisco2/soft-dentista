import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState({
    description: '',
    amount: '',
    patientId: ''
  });
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      const result = await axios.get('/api/quotes');
      setQuotes(result.data);
    };

    const fetchPatients = async () => {
      const result = await axios.get('/api/patients');
      setPatients(result.data);
    };

    fetchQuotes();
    fetchPatients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewQuote({ ...newQuote, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/quotes', newQuote);
    const result = await axios.get('/api/quotes');
    setQuotes(result.data);
  };

  return (
    <div className="container mt-5">
      <h2>Orçamentos</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <input type="text" className="form-control" name="description" value={newQuote.description} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Valor</label>
          <input type="number" className="form-control" name="amount" value={newQuote.amount} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Paciente</label>
          <select className="form-control" name="patientId" value={newQuote.patientId} onChange={handleChange}>
            <option value="">Selecione o paciente</option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>{patient.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Adicionar Orçamento</button>
      </form>
      <h3>Lista de Orçamentos</h3>
      <ul className="list-group">
        {quotes.map(quote => (
          <li key={quote.id} className="list-group-item">
            {quote.description} - R${quote.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quotes;
