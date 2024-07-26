import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import InputComponent from '../../reusable/InputComponent'; 
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

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

const industries = [
  'Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Technology', 'Education'
];

const companySizes = [
  '>10', '11-25', '26-50', '50-100', '100+'
];

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

  useEffect(() => {
    if (customer) {
      setInitialValues(customer);
    }
  }, [customer]);

//   const handleSubmit = async (values) => {
//     try {
//       await axios.put(`https://ilipaone.com/api/users/${values.id}`, values);
//       onSave(); // Refresh data or handle after save
//       onHide();
//     } catch (error) {
//       console.error('Error updating user:', error);
//       // Handle error
//     }
//   };

  return (
    <Dialog
      header="Edit Customer"
      visible={visible}
      onHide={onHide}
      footer={
        <div>
          <Button label="Save" icon="pi pi-check" type="submit" form="edit-form" />
          <Button label="Cancel" icon="pi pi-times" onClick={onHide} />
        </div>
      }
      style={{ width: '50%' }} 
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        // onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form id="edit-form">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ flex: '1 1 45%' }}>
                <InputComponent label="Email" name="email" />
              </div>
              <div style={{ flex: '1 1 45%' }}>
                <InputComponent label="Company Name" name="companyName" />
              </div>
              <div style={{ flex: '1 1 45%' }}>
                <InputComponent label="User Name" name="username" />
              </div>
              <div style={{ flex: '1 1 45%' }}>
                <InputComponent label="Mobile" name="mobile" />
              </div>
              <div style={{ flex: '1 1 45%' }}>
                <InputComponent label="Country" name="country" />
              </div>
              <div style={{ flex: '1 1 45%' }}>
                <InputComponent label="Company Address" name="companyAddress" />
              </div>
              <div style={{ flex: '1 1 45%' }}>
                <InputComponent label="Password" name="password" type="password" />
              </div>
              <div style={{ flex: '1 1 45%' }}>
                <FormControl fullWidth>
                  <InputLabel>Industry</InputLabel>
                  <Field
                    as={Select}
                    name="industry"
                    label="Industry"
                    value={values.industry}
                    onChange={(e) => setFieldValue("industry", e.target.value)}
                  >
                    {industries.map((industry) => (
                      <MenuItem key={industry} value={industry}>{industry}</MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </div>
              <div style={{ flex: '1 1 45%' }}>
                <FormControl fullWidth>
                  <InputLabel>Company Size</InputLabel>
                  <Field
                    as={Select}
                    name="companySize"
                    label="Company Size"
                    value={values.companySize}
                    onChange={(e) => setFieldValue("companySize", e.target.value)}
                  >
                    {companySizes.map((size) => (
                      <MenuItem key={size} value={size}>{size}</MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditCustomer;
