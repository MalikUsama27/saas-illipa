import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, Box, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import InputComponent from '../../reusable/InputComponent';
import axios from 'axios';

// Validation schema
const validationSchema = Yup.object({
  company_name: Yup.string().required('Company Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().matches(/^[0-9]+$/, 'Phone number must be digits only').required('Phone number is required'),
  industry: Yup.string().required('Industry is required'),
  country: Yup.string().required('Country is required'),
  company_address: Yup.string().required('Company Address is required'),
  company_size: Yup.string().required('Company Size is required'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long'),
  revenue_plan_id: Yup.string().required('Revenue Plan is required'), 
});

const initialValues = {
  company_name: '',
  email: '',
  phone: '',
  industry: '',
  country: '',
  company_address: '',
  company_size: '',
  password: '',
  revenue_plan_id: '', 
};

const industries = ['Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Technology', 'Education'];
const company_sizes = ['1-10', '11-25', '26-50', '50-100', '100+'];

const AddCustomer = ({ onSave }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [revenuePlans, setRevenuePlans] = useState([]);

  useEffect(() => {
    const fetchRevenuePlans = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/revenue-plans`);
        setRevenuePlans(response.data);
      } catch (error) {
        console.error('Error fetching revenue plans:', error);
        toast.error('Error fetching revenue plans');
      }
    };

    fetchRevenuePlans();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok && response.status === 201) {
        await response.json();
        toast.success('Customer added successfully');
        onSave(); // Close dialog and fetch data
      } else {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${response.statusText}. Response: ${errorText}`);
      }
    } catch (error) {
      console.error('Error adding customer:', error);
      toast.error(`Email Already Taken`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box>
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
                  label="Company Name"
                  name="company_name"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputComponent
                  label="Company Address"
                  name="company_address"
                  required
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
                <FormControl fullWidth variant="outlined" sx={{ borderRadius: '25px', fontSize: '12px'  }}>
                  <InputLabel style={{ fontSize: '12px' }}>Industry</InputLabel>
                  <Field
                    as={Select}
                    name="industry"
                    label="Industry"
                    value={values.industry}
                    onChange={(e) => setFieldValue('industry', e.target.value)}
                    sx={{ borderRadius: '25px', fontSize: '12px', height: '40px' }}
                  >
                    {industries.map((industry) => (
                      <MenuItem key={industry} value={industry} style={{fontSize:'12px'}}>
                        {industry}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" sx={{ borderRadius: '25px' }}>
                  <InputLabel style={{ fontSize: '12px' }}>Company Size</InputLabel>
                  <Field
                    as={Select}
                    name="company_size"
                    label="Company Size"
                    value={values.company_size}
                    onChange={(e) => setFieldValue('company_size', e.target.value)}
                    sx={{ borderRadius: '25px', fontSize: '12px', height: '40px' }}
                  >
                    {company_sizes.map((size) => (
                      <MenuItem key={size} value={size} style={{fontSize:'12px'}}>
                        {size}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" sx={{ borderRadius: '25px' }}>
                  <InputLabel style={{ fontSize: '12px' }}>Revenue Plan</InputLabel>
                  <Field
                    as={Select}
                    name="revenue_plan_id"
                    label="Revenue Plan"
                    value={values.revenue_plan_id}
                    onChange={(e) => setFieldValue('revenue_plan_id', e.target.value)}
                    sx={{ borderRadius: '25px', fontSize: '12px', height: '40px' }}
                  >
                    {revenuePlans.map((plan) => (
                      <MenuItem key={plan.id} value={plan.id} style={{fontSize:'12px'}}>
                        {plan.title}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
             
              
              <Grid item xs={12} sm={6}>
                <InputComponent
                  label="Password"
                  name="password"
                  isPassword={true}
                  required
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{ backgroundColor: '#06163A', borderRadius: '10px' }}
                >
                  Add Customer
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <ToastContainer
        position="top-right"
        autoClose={800}
        rtl={false}
        style={{ zIndex: 1300, paddingTop: '55px' }}
      />
    </Box>
  );
};

export default AddCustomer;
