import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Dashboard from './components/Home/Dashboard';
import ForgotPassword from './components/auth/ForgotPassword';

const AuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  }, [navigate]);

  return null; 
};

function App() {
  return (
    <>
      <AuthCheck />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
      </Routes>
    </>
  );
}

export default App;
