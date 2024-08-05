import React, { useState } from 'react';
import axios from 'axios';

const Reminders = () => {
  const [returnReminder, setReturnReminder] = useState(true);
  const [alignmentReminder, setAlignmentReminder] = useState(true);

  const handleToggleReturnReminder = async () => {
    setReturnReminder(!returnReminder);
    // Enviar configuração para o backend se necessário
  };

  const handleToggleAlignmentReminder = async () => {
    setAlignmentReminder(!alignmentReminder);
    // Enviar configuração para o backend se necessário
  };

  return (
    <div className="container mt-5">
      <h2>Configurações de Lembretes</h2>
      <div className="form-check form-switch mb-3">
        <input 
          className="form-check-input" 
          type="checkbox" 
          checked={returnReminder} 
          onChange={handleToggleReturnReminder} 
        />
        <label className="form-check-label">Lembretes de Retorno</label>
      </div>
      <div className="form-check form-switch mb-3">
        <input 
          className="form-check-input" 
          type="checkbox" 
          checked={alignmentReminder} 
          onChange={handleToggleAlignmentReminder} 
        />
        <label className="form-check-label">Lembretes de Troca de Alinhadores</label>
      </div>
    </div>
  );
};

export default Reminders;
