import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AppointmentForm = ({ onSave }) => {
  const [appointment, setAppointment] = useState({
    date: '',
    description: '',
    patientId: '',
  });
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get('/patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/appointments', appointment);
      onSave(response.data);
      setAppointment({
        date: '',
        description: '',
        patientId: '',
      });
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Data</label>
        <input
          type="datetime-local"
          className="form-control"
          name="date"
          value={appointment.date}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Descrição</label>
        <input
          type="text"
          className="form-control"
          name="description"
          value={appointment.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Paciente</label>
        <select
          className="form-control"
          name="patientId"
          value={appointment.patientId}
          onChange={handleChange}
          required
        >
          <option value="">Selecione um paciente</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Salvar</button>
    </form>
  );
};

export default AppointmentForm;
