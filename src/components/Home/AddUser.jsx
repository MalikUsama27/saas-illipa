import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Grid, Box, Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  role: Yup.string().required('Role is required'),
  permissions: Yup.object({
    viewPayments: Yup.boolean(),
    addUsers: Yup.boolean(),
    makePremiumModules: Yup.boolean(),
  }),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const AddUser = () => {
  const handleSubmit = async (values, { setSubmitting }) => {
    const payload = {
      ...values,
      permissions: Object.entries(values.permissions)
        .filter(([_, value]) => value)
        .map(([key]) => key.replace(/([A-Z])/g, ' $1').trim()),
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://ilipaone.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${errorText}`);
      }

      toast.success('User Added successfully');
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error(`Error adding user: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box p={3} border={1} borderColor="grey.400" borderRadius={4} width={1}>
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
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  name="name"
                  as={TextField}
                  label="Name"
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="email"
                  as={TextField}
                  label="Email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="phone"
                  as={TextField}
                  label="Phone"
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel>Role</InputLabel>
                  <Field
                    as={Select}
                    name="role"
                    label="Role"
                    onChange={e => setFieldValue('role', e.target.value)}
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Permissions</Typography>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      name="permissions.viewPayments"
                      checked={values.permissions.viewPayments}
                    />
                  }
                  label="View Payments"
                />
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      name="permissions.addUsers"
                      checked={values.permissions.addUsers}
                    />
                  }
                  label="Add Users"
                />
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      name="permissions.makePremiumModules"
                      checked={values.permissions.makePremiumModules}
                    />
                  }
                  label="Make Premium Modules"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="password"
                  as={TextField}
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="confirmPassword"
                  as={TextField}
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{ backgroundColor: '#434191', '&:hover': { backgroundColor: '#323b7a' } }}
                >
                  Add User
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

export default AddUser;
