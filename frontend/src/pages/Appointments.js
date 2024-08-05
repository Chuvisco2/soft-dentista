import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    description: '',
    patientId: ''
  });
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const result = await axios.get('/api/appointments');
      setAppointments(result.data);
    };

    const fetchPatients = async () => {
      const result = await axios.get('/api/patients');
      setPatients(result.data);
    };

    fetchAppointments();
    fetchPatients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({ ...newAppointment, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/appointments', newAppointment);
    const result = await axios.get('/api/appointments');
    setAppointments(result.data);
  };

  return (
    <div className="container mt-5">
      <h2>Agendamentos</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Data</label>
          <input type="date" className="form-control" name="date" value={newAppointment.date} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <input type="text" className="form-control" name="description" value={newAppointment.description} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Paciente</label>
          <select className="form-control" name="patientId" value={newAppointment.patientId} onChange={handleChange}>
            <option value="">Selecione o paciente</option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>{patient.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Adicionar Agendamento</button>
      </form>
      <h3>Lista de Agendamentos</h3>
      <ul className="list-group">
        {appointments.map(appointment => (
          <li key={appointment.id} className="list-group-item">
            {appointment.description} - {appointment.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
