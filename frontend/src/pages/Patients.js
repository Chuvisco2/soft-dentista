import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Patients = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    birthDate: '',
    type: 'particular'
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const result = await axios.get('http://localhost:3000/api/patients', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setPatients(result.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    fetchPatients();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/patients', newPatient, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await axios.get('http://localhost:3000/api/patients', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPatients(result.data);
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Pacientes</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input type="text" className="form-control" name="name" value={newPatient.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={newPatient.email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Telefone</label>
          <input type="text" className="form-control" name="phone" value={newPatient.phone} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Endereço</label>
          <input type="text" className="form-control" name="address" value={newPatient.address} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Data de Nascimento</label>
          <input type="date" className="form-control" name="birthDate" value={newPatient.birthDate} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Tipo</label>
          <select className="form-control" name="type" value={newPatient.type} onChange={handleChange}>
            <option value="particular">Particular</option>
            <option value="convenio">Convênio</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Adicionar Paciente</button>
      </form>
      <h3>Lista de Pacientes</h3>
      <ul className="list-group">
        {patients.map(patient => (
          <li key={patient.id} className="list-group-item">{patient.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Patients;
