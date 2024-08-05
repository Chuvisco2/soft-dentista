import React, { useState } from 'react';
import api from '../services/api';

const PatientForm = ({ onSave }) => {
  const [patient, setPatient] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    birthDate: '',
    type: 'particular',
  });

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/patients', patient);
      onSave(response.data);
      setPatient({
        name: '',
        email: '',
        phone: '',
        address: '',
        birthDate: '',
        type: 'particular',
      });
    } catch (error) {
      console.error('Error saving patient:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nome</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={patient.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={patient.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Telefone</label>
        <input
          type="text"
          className="form-control"
          name="phone"
          value={patient.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Endereço</label>
        <input
          type="text"
          className="form-control"
          name="address"
          value={patient.address}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Data de Nascimento</label>
        <input
          type="date"
          className="form-control"
          name="birthDate"
          value={patient.birthDate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Tipo</label>
        <select
          className="form-control"
          name="type"
          value={patient.type}
          onChange={handleChange}
          required
        >
          <option value="particular">Particular</option>
          <option value="convenio">Convênio</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Salvar</button>
    </form>
  );
};

export default PatientForm;
