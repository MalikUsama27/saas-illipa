import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import Modules from './components/Home/Modules';
import Customer from './components/Home/Customer';
import RevenuePlan from './components/Home/RevenuePlan';
import AddRevenuePlan from './components/Home/AddRevenuePlan';
import Users from './components/Home/Users';
import AddUser from './components/Home/AddUser';
import AddCustomer from './components/Home/AddCustomer';

function App() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            if (location.pathname === '/') {
               
                navigate('/dashboard/modules');
            }
        } else {
            if (location.pathname !== '/' ) {
                
                navigate('/');
            }
        }
    }, [navigate, location.pathname]);

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Layout />}>
                <Route path="modules" element={<Modules />} />
                <Route path="customers" element={<Customer />} />
                <Route path="revenue-plan" element={<RevenuePlan />} />
                <Route path="add-revenue" element={<AddRevenuePlan />} />
                <Route path="users" element={<Users />} />
                <Route path="add-user" element={<AddUser />} />
                <Route path="add-customer" element={<AddCustomer/>}/>
            </Route>
        </Routes>
    );
}

export default App;
