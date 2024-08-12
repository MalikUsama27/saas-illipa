import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, Box,  MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import InputComponent from '../../reusable/InputComponent';


// Validation schema
const validationSchema = Yup.object({
  company_name: Yup.string().required('Company Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().matches(/^[0-9]+$/, 'Phone number must be digits only').required('Phone number is required'),
  industry: Yup.string().required('Industry is required'),
  country: Yup.string().required('Country is required'),
  company_address: Yup.string().required('Company Address is required'),
  company_size: Yup.string().required('Company Size is required'),
  password: Yup.string().required('Password is required'),
});

// Initial values
const initialValues = {
  company_name: '',
  email: '',
  phone: '',
  industry: '',
  country: '',
  company_address: '',
  company_size: '',
  password: '',
};

// Dropdown options
const industries = ['Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Technology', 'Education'];
const company_sizes = ['>10', '11-25', '26-50', '50-100', '100+'];

const AddCustomer = () => {
  const [showPassword, setShowPassword] = useState(false);

  // const handleClickShowPassword = () => {
  //   setShowPassword(!showPassword);
  // };

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // const token = localStorage.getItem('token');
      const response = await fetch('https://ilipaone.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`,
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
    <Box 
    // p={3} border={1} borderColor="grey.400" borderRadius={4} width={1}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} sm={6}>
                <InputComponent
                  label="Company Name"
                  name="company_name"
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
                  label="Phone"
                  name="phone"
                  type="text"
                  required
                  inputProps={{ pattern: '[0-9]*' }}
                />
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
                  name="company_address"
                  required
                />
              </Grid>  <Grid item xs={12} sm={6}>
                <InputComponent
                  label="Password"
                  name="password"
                  isPassword={true}        
                  required
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              </Grid><Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" sx={{ borderRadius: '25px' }}>
                  <InputLabel style={{ fontSize: '12px'}}>Industry</InputLabel>
                  <Field
                    as={Select}
                    name="industry"
                    label="Industry"
                    value={values.industry}
                    onChange={(e) => setFieldValue('industry', e.target.value)}
                    sx={{ borderRadius: '25px', fontSize: '12px' ,height:'40px'}}
                  >
                    {industries.map((industry) => (
                      <MenuItem key={industry} value={industry}>
                        {industry}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" sx={{ borderRadius: '25px' }}>
                  <InputLabel style={{ fontSize: '12px',}}>Company Size</InputLabel>
                  <Field
                    as={Select}
                    name="company_size"
                    label="Company Size"
                    value={values.company_size}
                    onChange={(e) => setFieldValue('company_size', e.target.value)}
                    sx={{ borderRadius: '25px', fontSize: '12px' ,height:'40px'}}
                  >
                    {company_sizes.map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
             
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{ backgroundColor: '#06163A', borderRadius: '10px', '&:hover': { backgroundColor: '#06163A' } }}
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
