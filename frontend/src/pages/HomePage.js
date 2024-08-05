import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="container mt-5">
    <h1 className="display-4">Bem-vindo Soft Do Dentista</h1>
    <p className="lead">Faça login ou registre-se para continuar.</p>
    <Link className="btn btn-primary btn-lg" to="/login">Login</Link>
    <Link className="btn btn-secondary btn-lg ms-2" to="/register">Registrar</Link>
  </div>
);

export default HomePage;
