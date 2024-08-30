import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import InputComponent from '../../reusable/InputComponent';
import { MenuItem, Select, FormControl, InputLabel, Grid } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  mobile: Yup.string().required('Mobile number is required'),
  companyName: Yup.string().required('Company name is required'),
  industry: Yup.string().required('Industry is required'),
  country: Yup.string().required('Country is required'),
  companyAddress: Yup.string().required('Company address is required'),
  companySize: Yup.string().required('Company size is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password must be at least'),
  revenue_plan_id: Yup.string().required('Revenue plan is required'),
});

const industries = ['Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Technology', 'Education'];
const companySizes = ['1-10', '11-25', '26-50', '50-100', '100+'];

const EditCustomer = ({ visible, onHide, customer, onSave }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [revenuePlans, setRevenuePlans] = useState([]);

  const [initialValues, setInitialValues] = useState({
    username: '',
    email: '',
    mobile: '',
    companyName: '',
    industry: '',
    country: '',
    companyAddress: '',
    companySize: '',
    password: '',
    revenue_plan_id: '',

  });

  useEffect(() => {
    if (customer) {
      setInitialValues({
        username: customer?.username || '',
        email: customer?.email || '',
        mobile: customer.user_fields?.phone || '',
        companyName: customer.user_fields?.company_name || '',
        industry: customer.user_fields?.industry || '',
        country: customer.user_fields?.country || '',
        companyAddress: customer.user_fields?.company_address || '',
        companySize: customer.user_fields?.company_size || '',
        password: '',
        revenue_plan_id: customer.user_fields?.revenue_plan_id || '',
      });
    }

    // Fetch revenue plans
    const fetchRevenuePlans = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/revenue-plans`);
        setRevenuePlans(response.data);
      } catch (error) {
        console.error('Error fetching revenue plans:', error);
      }
    };

    fetchRevenuePlans();
  }, [customer]);


  const handleSubmit = async (values) => {
    try {
      const payload = {
        email: values.email,
        password: values.password,
        phone: values.mobile,
        company_name: values.companyName,
        company_address: values.companyAddress,
        industry: values.industry,
        country: values.country,
        company_size: values.companySize,
        revenue_plan_id: values.revenue_plan_id,
        // ...(values.password && { password: values.password }),
      };

      // PUT request to update customer
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/users/${customer.id}`, payload);
      onSave(); 
      onHide();
      toast.success('Customer updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Error updating customer');
    }
  };

  return (
    <Dialog
      header="Edit Customer"
      visible={visible}
      onHide={onHide}
      // footer={
        // <div style={{ display: 'flex', justifyContent: 'end', padding: '10px', borderTop: '1px solid #ddd' }}>
      
          // {
            /* <Button
            label="Cancel"
            icon="pi pi-times"
            onClick={onHide}
            className="p-button-secondary"
            style={{ fontSize: '12px', background:'#d9535f', borderRadius: '25px' }}
          /> */
        // }
        // </div>
      // }
      // style={{ width: '60%', borderRadius: '10px', padding: '20px'}}
    >    
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form id="edit-form"style={{ width: '46vw',paddingTop:'5px'}}>
           <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <InputComponent label="Email" name="email"  disabled />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputComponent label="Mobile" name="mobile" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputComponent label="Company Name" name="companyName" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputComponent label="Company Address" name="companyAddress" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputComponent label="Country" name="country" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel style={{ fontSize: '12px' }}>Industry</InputLabel>
                  <Field
                    as={Select}
                    name="industry"
                    label="Industry"
                    value={values.industry}
                    onChange={(e) => setFieldValue("industry", e.target.value)}
                    sx={{ borderRadius: '25px', fontSize: '12px', height: '40px'  }}
                  >
                    {industries.map((industry) => (
                      <MenuItem key={industry} value={industry} style={{ fontSize: '12px' }}>
                        {industry}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel style={{ fontSize: '12px' }}>Company Size</InputLabel>
                  <Field
                    as={Select}
                    name="companySize"
                    label="Company Size"
                    value={values.companySize}
                    onChange={(e) => setFieldValue("companySize", e.target.value)}
                    sx={{ borderRadius: '25px', fontSize: '12px', height: '40px'  }}
                  >
                    {companySizes.map((size) => (
                      <MenuItem key={size} value={size} style={{ fontSize: '12px' }}>
                        {size}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
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
                      <MenuItem key={plan.id} value={plan.id} style={{ fontSize: '12px' }}>
                        {plan.title}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div style={{ position: 'relative' }}>
                  <InputComponent
                    label="Password"
                    name="password"
                    isPassword={true}  
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                </div>
              </Grid>
            </Grid>
            <Button
              label="UPDATE CUSTOMER"
              type="submit"
              style={{ backgroundColor: '#06163A', borderRadius: '10px', marginTop: '20px' }}
            />
          </Form>
          )}
      </Formik>
      <ToastContainer
        position="top-right"
        autoClose={800}
        rtl={false}
        style={{ zIndex: 1300, paddingTop:'55px'}} 
      />
    </Dialog>
  );
};

export default EditCustomer;
