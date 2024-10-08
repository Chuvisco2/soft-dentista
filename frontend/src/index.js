import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>
);
