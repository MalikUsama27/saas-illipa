import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 
import loginImage from './loginimg.PNG';

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      navigate('/dashboard');
    },
  });

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-form">
          <h1>Welcome Back</h1>
          <p>Please sign in to continue</p>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className={formik.errors.email ? 'input-error' : ''}
            />
            {formik.errors.email && <div className="error-message">{formik.errors.email}</div>}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className={formik.errors.password ? 'input-error' : ''}
            />
            {formik.errors.password && <div className="error-message">{formik.errors.password}</div>}
            <button type="submit" className="login-button">Login</button>
          </form>
          <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
        </div>
        <div className="login-image">
          <img src={loginImage} alt="Login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
