import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';

import axios from 'axios';

import InputComponent from '../reusable/InputComponent'; 
import { Grid } from '@mui/material';

// Validation schema using Yup
const validationSchema = Yup.object({
  currentPassword: Yup.string().required('Current password is required').min(8, 'Password must be at least 8 characters long'),
  newPassword: Yup.string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm your new password'),
});

// UpdatePassword component
const UpdatePassword = ({ visible, onHide }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    // Retrieve the token (from local storage, context, etc.)
    const token = localStorage.getItem('token'); // Replace with your actual method of retrieving the token
  
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/password/update`,
        {
          current_password: values.currentPassword,
          new_password: values.newPassword,
          new_password_confirmation: values.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
     
      toast.success('Password updated successfully!');
      setTimeout(()=>{
         onHide(); 
      },1000)
      
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Failed to update password. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      header="Update Password"
      visible={visible}
      onHide={onHide}
      style={{ width: '30vw' }}
      modal
    >
      <Formik
        initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
          <Form>
            <Grid container spacing={2} style={{ padding: '20px' }}>
              <Grid item xs={12}>
                <InputComponent
                  label="Current Password"
                  name="currentPassword"
                  type={showCurrentPassword ? 'text' : 'password'}
                  isPassword={true}
                  value={values.currentPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.currentPassword && errors.currentPassword}
                  showPassword={showCurrentPassword}
                  setShowPassword={setShowCurrentPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <InputComponent
                  label="New Password"
                  name="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  isPassword={true}
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.newPassword && errors.newPassword}
                  showPassword={showNewPassword}
                  setShowPassword={setShowNewPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <InputComponent
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  isPassword={true}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.confirmPassword && errors.confirmPassword}
                  showPassword={showConfirmPassword}
                  setShowPassword={setShowConfirmPassword}
                />
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Button
                  label="Submit"
                  icon="pi pi-check"
                  type="submit"
                  disabled={isSubmitting}
                  style={{ marginRight: '10px', backgroundColor: '#06163A', borderRadius: '15px' }}
                />
                <Button
                  label="Cancel"
                  icon="pi pi-times"
                  type="button"
                  onClick={onHide}
                  className="p-button-danger"
                  style={{ marginRight: '10px', borderRadius: '15px' }}
                />
              </Grid>
            </Grid>
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

export default UpdatePassword;
