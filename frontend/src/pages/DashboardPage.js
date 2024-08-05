import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="container">
      <h1 className="mt-5">Dashboard</h1>
      <p>Bem-vindo ao seu painel de controle.</p>
    </div>
  );
};

export default DashboardPage;
