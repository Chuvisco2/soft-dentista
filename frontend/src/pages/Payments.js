import React, { useState } from 'react';
import axios from 'axios';

const Payments = () => {
  const [amount, setAmount] = useState('');

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('/api/payments/create-payment-intent', { amount });
    // Aqui você pode redirecionar o usuário para a página de pagamento do Stripe ou processar o pagamento
    console.log(response.data);
  };

  return (
    <div className="container mt-5">
      <h2>Realizar Pagamento</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Valor</label>
          <input type="number" className="form-control" name="amount" value={amount} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Realizar Pagamento</button>
      </form>
    </div>
  );
};

export default Payments;
