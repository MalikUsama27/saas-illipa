import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import InputComponent from '../../reusable/InputComponent'; 
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

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
  password: Yup.string().required('Password is required'),
});

const industries = ['Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Technology', 'Education'];
const companySizes = ['>10', '11-25', '26-50', '50-100', '100+'];

const EditCustomer = ({ visible, onHide, customer, onSave }) => {
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
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log(customer)
    if (customer && typeof customer === 'object') {
      setInitialValues({
        username: customer.username || 'N/A',
        email: customer.email || 'N/A',
        mobile: customer.user_fields.phone || 'N/A',
        companyName: customer.user_fields.company_name || 'N/A',
        industry: customer.user_fields.industry || 'N/A',
        country: customer.user_fields.country || 'N/A',
        companyAddress: customer.user_fields.company_address || 'N/A',
        companySize: customer.user_fields.company_size || 'N/A',
        password: 'N/A', 
      });
    }
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
      };

      await axios.put(`https://ilipaone.com/api/users/${customer.id}`, payload);
      onSave(); 
      onHide();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Dialog
      header="Edit Customer"
      visible={visible}
      onHide={onHide}
      footer={
        <div style={{ display: 'flex', justifyContent: 'end',padding: '10px', borderTop: '1px solid #ddd' }}>
          <Button
            label="Save"
            icon="pi pi-check"
            type="submit"
            form="edit-form"
            className="p-button-success"
            style={{ fontSize: '12px',background:'#06163A',borderRadius: '25px', }}
          />
          <Button
            label="Cancel"
            icon="pi pi-times"
            onClick={onHide}
            className="p-button-secondary"
            style={{ fontSize: '12px',background:'#d9535f' ,borderRadius: '25px',}}
          />
        </div>
      }
      style={{ width: '60%', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form id="edit-form">
            <div style={{ display: 'grid', gap: '16px',marginTop:'10px',  gridTemplateColumns: '1fr 1fr', marginBottom: '20px' }}>
              <div>
                <InputComponent label="Username" name="username" />
              </div>
              <div>
                <InputComponent label="Email" name="email" />
              </div>
              <div>
                <InputComponent label="Mobile" name="mobile" />
              </div>
              <div>
                <InputComponent label="Company Name" name="companyName" />
              </div>
              <div>
                <FormControl fullWidth variant="outlined" sx={{ borderRadius: '25px' }}>
                  <InputLabel>Industry</InputLabel>
                  <Field
                    as={Select}
                    name="industry"
                    label="Industry"
                    value={values.industry}
                    onChange={(e) => setFieldValue("industry", e.target.value)}
                    sx={{ borderRadius: '25px', fontSize: '12px',height: '47px' }}
                  >
                    {industries.map((industry) => (
                      <MenuItem key={industry} value={industry}>{industry}</MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </div>
              <div>
                <FormControl fullWidth variant="outlined" sx={{ borderRadius: '25px' }}>
                  <InputLabel>Company Size</InputLabel>
                  <Field
                    as={Select}
                    name="companySize"
                    label="Company Size"
                    value={values.companySize}
                    onChange={(e) => setFieldValue("companySize", e.target.value)}
                    sx={{ borderRadius: '25px', fontSize: '12px',height: '47px' }}
                  >
                    {companySizes.map((size) => (
                      <MenuItem key={size} value={size}>{size}</MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </div>
              <div>
                <InputComponent label="Country" name="country" />
              </div>
              <div>
                <InputComponent label="Company Address" name="companyAddress" />
              </div>
              <div>
                <div style={{ position: 'relative' }}>
                  <InputComponent
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                  />
                  <IconButton
                    style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditCustomer;
