import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
// import Layout from "./components/Layout/Layout";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import Modules from "./components/Home/Modules";
import Customer from "./components/Home/Customer";
import RevenuePlan from "./components/Home/RevenuePlan";
// import AddRevenuePlan from './components/Home/AddRevenuePlan';
import Users from "./components/Home/Users";
// import AddUser from './components/Home/AddUser';
// import AddCustomer from './components/Home/AddCustomer';
import Receipt from "./components/Home/Receipt";
import RevenueProjection from "./components/Home/RevenueProjection";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("path",location.pathname);
    if (token) {
      if (location.pathname === "/"  )  {
        navigate("/modules");
      }
      // else if(location.pathname ==='/modules'){
      //   navigate("/modules");
      // }
    } else {
      if (location.pathname !== "/") {
        navigate("/");
      }
    }
  }, [navigate, location.pathname]);

  return (
    // <Router>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/forgot-password" element={<ForgotPassword />} />
      {/* <Route exact path="/dashboard" element={<Layout />}> */}
        <Route exact path="/modules" element={<Modules />} />
        <Route exact path="/customers" element={<Customer />} />
        <Route exact path="/revenue-plan" element={<RevenuePlan />} />
        {/* <Route exact  path="add-revenue" element={<AddRevenuePlan />} /> */}
        <Route exact path="/users" element={<Users />} />
        {/* <Route exact  path="add-user" element={<AddUser />} /> */}
        {/* <Route exact  path="add-customer" element={<AddCustomer/>}/> */}
        <Route exact path="/receipt" element={<Receipt />} />
        <Route
          exact
          path="/revenue-projection"
          element={<RevenueProjection />}
        />
      {/* </Route> */}
    </Routes>
    // </Router>
  );
}

export default App;
