import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Consultório</Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {user ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/patients">Pacientes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/appointments">Agendamentos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/financial">Financeiro</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/quotes">Orçamentos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/prescriptions">Receitas</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={logout}>Sair</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Registrar</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
