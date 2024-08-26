import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import Modules from "./components/Home/Modules";
import Customer from "./components/Home/Customer";
import RevenuePlan from "./components/Home/RevenuePlan";
import Users from "./components/Home/Users";
import Receipt from "./components/Home/Receipt";
import RevenueProjection from "./components/Home/RevenueProjection";
import Graphs from "./components/Home/Graphs";
import { availablePermissions } from "./constants";

function App() {
  const [permissions, setPermissions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle authentication and redirection based on token and path
  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentPath = location.pathname;

    if (!token && currentPath !== "/") {
      navigate("/");
    } else if (token && (currentPath === "/" || currentPath === "/forgot-password")) {
      navigate("/dashboard");
    }
  }, [navigate, location.pathname]);

  // Retrieve permissions from localStorage
  useEffect(() => {
    const storedPermissions = localStorage.getItem('permissions');
    if (storedPermissions) {
      const permissionsArray = storedPermissions
        .split(',')
        .map(label => label.trim())
        .map(label => availablePermissions.find(p => p.label === label)?.key)
        .filter(Boolean);
      setPermissions(permissionsArray);
    }
  }, []);

  const ProtectedRoute = ({ children, requiredPermission }) => {
    if (!permissions.includes(requiredPermission) && !permissions.includes('view_all')) {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Graphs />} />
        <Route
          path="modules"
          element={
            <ProtectedRoute requiredPermission="view_modules">
              <Modules />
            </ProtectedRoute>
          }
        />
        <Route
          path="customers"
          element={
            <ProtectedRoute requiredPermission="view_payments">
              <Customer />
            </ProtectedRoute>
          }
        />
        <Route
          path="revenue-plan"
          element={
            <ProtectedRoute requiredPermission="view_plans">
              <RevenuePlan />
            </ProtectedRoute>
          }
        />
        <Route
          path="users"
          element={
            <ProtectedRoute requiredPermission="view_users">
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="receipt"
          element={
           // <ProtectedRoute requiredPermission="view_receipts">
              <Receipt />
           // </ProtectedRoute>
          }
        />
        <Route
          path="revenue-projection"
          element={
            // <ProtectedRoute requiredPermission="view_projections">
              <RevenueProjection />
          // </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
