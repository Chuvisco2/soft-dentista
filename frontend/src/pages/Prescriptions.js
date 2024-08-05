import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [newPrescription, setNewPrescription] = useState({
    medication: '',
    dosage: '',
    patientId: ''
  });
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      const result = await axios.get('/api/prescriptions');
      setPrescriptions(result.data);
    };

    const fetchPatients = async () => {
      const result = await axios.get('/api/patients');
      setPatients(result.data);
    };

    fetchPrescriptions();
    fetchPatients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPrescription({ ...newPrescription, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/prescriptions', newPrescription);
    const result = await axios.get('/api/prescriptions');
    setPrescriptions(result.data);
  };

  return (
    <div className="container mt-5">
      <h2>Receitas Digitais</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Medicação</label>
          <input type="text" className="form-control" name="medication" value={newPrescription.medication} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Dosagem</label>
          <input type="text" className="form-control" name="dosage" value={newPrescription.dosage} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Paciente</label>
          <select className="form-control" name="patientId" value={newPrescription.patientId} onChange={handleChange}>
            <option value="">Selecione o paciente</option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>{patient.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Adicionar Receita</button>
      </form>
      <h3>Lista de Receitas</h3>
      <ul className="list-group">
        {prescriptions.map(prescription => (
          <li key={prescription.id} className="list-group-item">
            {prescription.medication} - {prescription.dosage}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Prescriptions;
