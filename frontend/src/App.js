import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import Financial from './pages/Financial';
import Quotes from './pages/Quotes';
import Prescriptions from './pages/Prescriptions';
import Header from './components/Header';

const App = () => (
  <div>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/financial" element={<Financial />} />
      <Route path="/quotes" element={<Quotes />} />
      <Route path="/prescriptions" element={<Prescriptions />} />
    </Routes>
  </div>
);

export default App;
