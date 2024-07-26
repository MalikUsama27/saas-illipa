import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, Box, InputAdornment, IconButton, MenuItem } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import InputComponent from '../reusable/InputComponent';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const validationSchema = Yup.object({
  companyName: Yup.string().required('Company Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  mobile: Yup.string().matches(/^[0-9]+$/, 'Mobile number must be digits only').required('Mobile number is required'),
  username: Yup.string().required('Owner Name is required'),
  industry: Yup.string().required('Industry is required'),
  country: Yup.string().required('Country is required'),
  companyAddress: Yup.string().required('Company Address is required'),
  companySize: Yup.string().required('Company Size is required'),
  password: Yup.string().required('Password is required'),
});

const initialValues = {
  companyName: '',
  email: '',
  mobile: '',
  username: '',
  industry: '',
  country: '',
  companyAddress: '',
  companySize: '',
  password: '',
};

const industries = ['Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Technology', 'Education'];
const companySizes = ['>10', '11-25', '26-50', '50-100', '100+'];

const AddCustomer = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://ilipaone.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${response.statusText}. Response: ${errorText}`);
      }

      const data = await response.json();
      console.log('Customer added successfully:', data);
      toast.success('Customer added successfully');
    } catch (error) {
      console.error('Error adding customer:', error);
      toast.error(`Error adding customer: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box p={3} border={1} borderColor="grey.400" borderRadius={4} width={1}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} sm={6}>
                <InputComponent
                  label="Company Name"
                  name="companyName"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputComponent
                  label="Email"
                  name="email"
                  type="email"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputComponent
                  label="Mobile"
                  name="mobile"
                  inputProps={{ pattern: '[0-9]*' }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputComponent
                  label="Owner Name"
                  name="username"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputComponent
                  label="Industry"
                  name="industry"
                  select
                  required
                >
                  {industries.map((industry) => (
                    <MenuItem key={industry} value={industry}>
                      {industry}
                    </MenuItem>
                  ))}
                </InputComponent>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputComponent
                  label="Country"
                  name="country"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputComponent
                  label="Company Address"
                  name="companyAddress"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputComponent
                  label="Company Size"
                  name="companySize"
                  select
                  required
                >
                  {companySizes.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </InputComponent>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputComponent
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{ backgroundColor: '#434191', '&:hover': { backgroundColor: '#323b7a' } }}
                >
                  Add Customer
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </Box>
  );
};

export default AddCustomer;
