import React, { useState } from 'react';
import axios from 'axios';

const ImportPatients = () => {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:3000/api/patients/import', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Importação concluída com sucesso');
    } catch (error) {
      console.error('Error importing patients:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Importar Pacientes</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Arquivo CSV</label>
          <input type="file" className="form-control" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Importar</button>
      </form>
    </div>
  );
};

export default ImportPatients;
