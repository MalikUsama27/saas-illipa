import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Grid, FormControlLabel, Checkbox, Select, MenuItem } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputComponent from '../../reusable/InputComponent';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  role: Yup.string().required('Role is required'),
  permissions: Yup.string().required('At least one permission is required'),
  password: Yup.string().when('confirmPassword', {
    is: (val) => val && val.length > 0,
    then: Yup.string().required('Password is required'),
  }),
});

// Available roles
const availableRoles = [
  { id: 1, name: 'admin' },
  { id: 2, name: 'manager' },
  // Add more roles as needed
];

// Available permissions
const availablePermissions = [
  { key: 'View Customers', label: 'View Customers' },
  { key: 'View Users', label: 'View Users' },
  { key: 'View Plans', label: 'View Plans' },
  { key: 'View Modules', label: 'View Modules' }
  // Add more permissions as needed
];

const EditUser = ({ visible, onClose, user, onSave }) => {
  const [showPassword, setShowPassword] = useState(false);

  // Initialize form values based on user prop
  const initialValues = {
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.user_fields?.phone || '',
    role: user?.roles?.[0]?.name || '', // Correctly set the role value
    permissions: Array.isArray(user?.user_fields?.permissions)
      ? user.user_fields.permissions.join(', ')
      : user?.user_fields?.permissions || '',
    password: '',
  };
console.log(user?.roles?.[0]?.name)
  const handleSubmit = async (values) => {
    try {
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password || undefined,
        phone: values.phone,
        role: values.role,
        permissions: values.permissions,
      };

      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/users/${user.id}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success('User updated successfully!');
      onSave();
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user.');
    }
  };

  const handlePermissionChange = (permission, checked, setFieldValue, permissions) => {
    const permissionLabel = availablePermissions.find((p) => p.key === permission)?.label;
    const currentPermissions = permissions.split(', ').filter((p) => p);

    const updatedPermissions = checked
      ? [...currentPermissions, permissionLabel].join(', ')
      : currentPermissions.filter((p) => p !== permissionLabel).join(', ');

    setFieldValue('permissions', updatedPermissions);
  };

  return (
    <Dialog
      header="Edit User"
      visible={visible}
      onHide={onClose}
      style={{ width: '50vw', borderRadius: '25px' }}
      modal
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, handleSubmit }) => (
          <div className="p-fluid" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} sm={6}>
                <InputComponent
                  label="Name"
                  name="name"
                  formik={{ values, setFieldValue }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputComponent
                  label="Email"
                  name="email"
                  type="email"
                  formik={{ values, setFieldValue }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} sm={6}>
                <InputComponent
                  label="Phone"
                  name="phone"
                  type="text"
                  formik={{ values, setFieldValue }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={Select}
                  name="role"
                  value={values.role} // Ensure the role is set correctly
                  onChange={(e) => setFieldValue('role', e.target.value)}
                  fullWidth
                  style={{ borderRadius: '25px', fontSize: '12px', height: '42px' }}
                >
                  {availableRoles.map((role) => (
                    <MenuItem key={role.id} value={role.name} style={{ fontSize: '12px' }}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={6}>
                <InputComponent
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  isPassword
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  formik={{ values, setFieldValue }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={12}>
                <div role="group" aria-labelledby="checkbox-group">
                  {availablePermissions.map((permission) => (
                    <FormControlLabel
                      key={permission.key}
                      control={
                        <Checkbox
                          style={{ fontFamily: 'Open Sans', fontSize: '12px' }}
                          checked={values.permissions.split(', ').includes(permission.label)}
                          onChange={(e) =>
                            handlePermissionChange(permission.key, e.target.checked, setFieldValue, values.permissions)
                          }
                        />
                      }
                      label={permission.label}
                    />
                  ))}
                </div>
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={12}>
                <Button
                  label="UPDATE"
                  style={{
                    backgroundColor: '#06163A',
                    borderRadius: '25px',
                    fontSize: '0.875rem',
                    width: '100px',
                  }}
                  onClick={handleSubmit}
                />
              </Grid>
            </Grid>
          </div>
        )}
      </Formik>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        rtl={false}
        style={{ zIndex: 1300, paddingTop: '55px' }}
      />
    </Dialog>
  );
};

export default EditUser;
