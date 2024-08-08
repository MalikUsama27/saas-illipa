import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, Box, Typography, MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import InputComponent from '../../reusable/InputComponent';
import CheckboxComponent from '../../reusable/CheckboxComponent';
import 'react-toastify/dist/ReactToastify.css';

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().required('Phone number is required').matches(/^\d+$/, 'Phone number must be numeric'),
  role: Yup.string().required('Role is required'),
  permissions: Yup.object({
    viewPayments: Yup.boolean(),
    addUsers: Yup.boolean(),
    makePremiumModules: Yup.boolean(),
  }).test(
    'at-least-one-permission',
    'Select at least one permission',
    (value) => Object.values(value).some(Boolean)
  ).required('Select at least one permission'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

const AddUser = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const phoneString = String(values.phone);

    const permissionsString = Object.entries(values.permissions)
      .filter(([_, value]) => value)
      .map(([key]) => {
        switch (key) {
          case 'viewPayments':
            return 'View Payments';
          case 'addUsers':
            return 'Add Users';
          case 'makePremiumModules':
            return 'Make Premium Modules';
          default:
            return '';
        }
      })
      .join(', ');

    const payload = {
      name: values.name,
      email: values.email,
      phone: phoneString,
      role: values.role.toLowerCase(),
      permissions: permissionsString,
      password: values.password,
    };

    try {
      const token = localStorage.getItem('token');
      await axios.post('https://ilipaone.com/api/users', payload, {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`,
        },
      });

      toast.success('User added successfully');
      resetForm();

      
      setTimeout(() => {
        onClose();
      }, 2000); 
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error(`${error.response ? error.response.data.errors.email : error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          role: '',
          permissions: {
            viewPayments: false,
            addUsers: false,
            makePremiumModules: false,
          },
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} sm={6}>
                <InputComponent label="Name" name="name" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputComponent label="Email" name="email" type="email" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputComponent label="Phone" name="phone" type="text" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel style={{ fontSize: '12px', marginTop: '-5px' }}>Role</InputLabel>
                  <Field
                    as={Select}
                    name="role"
                    label="Role"
                    value={values.role}
                    onChange={(e) => setFieldValue('role', e.target.value)}
                    style={{ borderRadius: '25px', fontSize: '12px', height: '42px' }}
                  >
                    {['Admin', 'Manager'].map((role) => (
                      <MenuItem key={role} value={role} style={{  fontSize: '12px', }}>{role}</MenuItem>
                    ))}
                  </Field>
                  <ErrorMessage name="role">
                    {msg => <FormHelperText style={{ color: '#D32F2F', fontSize:'12px' }}>{msg}</FormHelperText>}
                  </ErrorMessage>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <InputComponent
                  label="Password"
                  name="password"
                  type="password"
                  isPassword
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              </Grid><Grid item xs={12}>
                <Typography variant="subtitle1" style={{ fontSize: '12px' }}>Permissions</Typography>
                <CheckboxComponent style={{ fontSize: '12px' }} label="View Payments" name="permissions.viewPayments" />
                <CheckboxComponent style={{ fontSize: '12px' }} label="Add Users" name="permissions.addUsers" />
                <CheckboxComponent style={{ fontSize: '12px' }}  label="Make Premium Modules" name="permissions.makePremiumModules" />
                <ErrorMessage name="permissions">
                  {msg => <FormHelperText style={{ color: '#D32F2F', fontSize:'12px' }}>{msg}</FormHelperText>}
                </ErrorMessage>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: '#06163A',
                    borderRadius: '25px',
                    fontSize: '0.875rem',
                  }}
                >
                  Add User
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        rtl={false}
        style={{ zIndex: 1300, paddingTop:'55px'}} 
      />
    </Box>
  );
};

export default AddUser;
