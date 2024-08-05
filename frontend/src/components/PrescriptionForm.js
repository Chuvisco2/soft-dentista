import React, { useState } from 'react';
import axios from '../utils/axiosConfig';

const PrescriptionForm = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/prescriptions', formData);
    // Adicionar lógica para atualizar a lista de prescrições...
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>ID do Paciente:</label>
        <input type="number" name="patientId" value={formData.patientId} onChange={handleChange} />
      </div>
      <div>
        <label>Medicação:</label>
        <input type="text" name="medication" value={formData.medication} onChange={handleChange} />
      </div>
      <div>
        <label>Dosagem:</label>
        <input type="text" name="dosage" value={formData.dosage} onChange={handleChange} />
      </div>
      <div>
        <label>Frequência:</label>
        <input type="text" name="frequency" value={formData.frequency} onChange={handleChange} />
      </div>
      <div>
        <label>Duração:</label>
        <input type="text" name="duration" value={formData.duration} onChange={handleChange} />
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
};

export default PrescriptionForm;
