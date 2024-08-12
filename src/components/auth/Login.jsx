import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginImage from '../../assets/images/loginimg.PNG';
import logo from '../../assets/logo.png';
import { Button } from 'primereact/button';
import ForgotPassword from './ForgotPassword';

const Login = () => {
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('https://ilipaone.com/api/login', {
          username_or_email: values.email,
          password: values.password,
        });

        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('permissions', response.data.permissions);

          // window.location.reload();
          navigate('/')
          toast.success('Login Successfully');
        } else {
          console.log('Login failed');
        }
      } catch (error) {
        toast.error('Email and Password Incorrect');
        console.error('Login error:', error);
      }
    },
  });

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-form">
          <img src={logo} alt="Login" style={{ width: '60%' }} />
          <h1>Welcome Back</h1>
          <p>Please sign in to continue</p>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="User-Name or Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.email && formik.errors.email ? 'input-error' : ''}
            />
            {formik.touched.email && formik.errors.email && <div className="error-message">{formik.errors.email}</div>}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.password && formik.errors.password ? 'input-error' : ''}
            />
            {formik.touched.password && formik.errors.password && <div className="error-message">{formik.errors.password}</div>}
            <button type="submit" className="login-button">Login</button>
          </form>
          <Button type="button" className="forgot-password" onClick={() => setForgotPasswordVisible(true)}>
            Forgot Password?
          </Button>
        </div>
        <ForgotPassword visible={forgotPasswordVisible} onHide={() => setForgotPasswordVisible(false)} />
        <div className="login-image">
          <img src={loginImage} alt="Login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
