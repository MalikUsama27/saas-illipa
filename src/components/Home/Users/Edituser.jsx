import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { RingLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  role: Yup.string().required('Role is required'),
  permissions: Yup.array().min(1, 'At least one permission is required'),
  password: Yup.string().when('confirmPassword', {
    is: val => val && val.length > 0,
    then: Yup.string().required('Password is required'),
  }),
});

// Available permissions
const availablePermissions = [
  { key: 'viewPayments', label: 'View Payments' },
  { key: 'addUsers', label: 'Add Users' },
  { key: 'makePremiumModules', label: 'Make Premium Modules' }
];

const EditUser = ({ visible, onClose, user, onSave }) => {
  const [fetchingUser, setFetchingUser] = useState(false);
  const [rolesOptions, setRolesOptions] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.user_fields?.phone || '',
      role: user?.roles?.[0]?.name || '',
      permissions: user?.user_fields?.permissions || [],
      password: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem('token'); 

        const permissionsString = availablePermissions
          .filter(p => values.permissions.includes(p.key))
          .map(p => p.label)
          .join(', ');

        const requestData = {
          name: values.name,
          email: values.email,
          phone: values.phone,
          role: values.role,
          permissions: permissionsString,
          password: values.password || undefined,
        };

        console.log('Payload to be sent:', requestData);

        await axios.put(
          `https://ilipaone.com/api/users/${user.id}`,
          requestData,
          {
            headers: {
              'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json',
            },
          }
        );
        toast.success('User updated successfully!');
        onSave();
      } catch (error) {
        console.error('Error updating user:', error);
        toast.error('Failed to update user.');
      }
    }
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setRolesOptions([
          { label: 'Manager', value: 'manager' },
          { label: 'Admin', value: 'admin' },
        ]);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);

  const handlePermissionChange = (permission, checked) => {
    const updatedPermissions = checked
      ? [...formik.values.permissions, permission]
      : formik.values.permissions.filter(p => p !== permission);
    formik.setFieldValue('permissions', updatedPermissions);
  };

  return (
    <>
      <Dialog
        header="Edit User"
        visible={visible}
        onHide={onClose}
        footer={
          <div>
            <Button label="Save" icon="pi pi-check" style={{background:'#06163A',borderRadius: '25px', }} onClick={formik.handleSubmit} />
            <Button label="Cancel" icon="pi pi-times" style={{background:'#d9535f',borderRadius: '25px', }} onClick={onClose} />
          </div>
        }
        style={{ width: '50vw', borderRadius: '25px', fontFamily: 'Open Sans', fontSize: '12px' }}
        modal
      >
        {fetchingUser ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <RingLoader color="#007ad9" />
          </div>
        ) : (
          <div className="p-fluid" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ flex: 1, marginRight: '10px' }}>
                <label htmlFor="name" style={{ display: 'block' }}>Name:</label>
                <input
                  id="name"
                  type="text"
                  {...formik.getFieldProps('name')}
                  className="p-inputtext p-component"
                  style={{ width: '100%', borderRadius: '25px' }}
                />
                {formik.touched.name && formik.errors.name && (
                  <div style={{ color: 'red' }}>{formik.errors.name}</div>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="email" style={{ display: 'block' }}>Email:</label>
                <input
                  id="email"
                  type="email"
                  {...formik.getFieldProps('email')}
                  className="p-inputtext p-component"
                  style={{ width: '100%', borderRadius: '25px' }}
                />
                {formik.touched.email && formik.errors.email && (
                  <div style={{ color: 'red' }}>{formik.errors.email}</div>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ flex: 1, marginRight: '10px' }}>
                <label htmlFor="phone" style={{ display: 'block' }}>Phone:</label>
                <input
                  id="phone"
                  type="text"
                  {...formik.getFieldProps('phone')}
                  className="p-inputtext p-component"
                  style={{ width: '100%', borderRadius: '25px' }}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div style={{ color: 'red' }}>{formik.errors.phone}</div>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="role">Role:</label>
                <Dropdown
                  id="role"
                  value={formik.values.role}
                  options={rolesOptions}
                  onChange={(e) => formik.setFieldValue('role', e.value)}
                  optionLabel="label"
                  placeholder="Select Role"
                  style={{ borderRadius: '25px' }}
                />
                {formik.touched.role && formik.errors.role && (
                  <div style={{ color: 'red' }}>{formik.errors.role}</div>
                )}
              </div>
            </div>
            <div className="p-field" style={{ marginBottom: '10px' }}>
              <label>Permissions:</label>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {availablePermissions.map(permission => (
                  <FormControlLabel
                    key={permission.key}
                    control={
                      <Checkbox
                        checked={formik.values.permissions.includes(permission.key)}
                        onChange={(e) => handlePermissionChange(permission.key, e.target.checked)}
                        style={{ marginRight: '8px' }}
                      />
                    }
                    label={permission.label}
                    style={{ fontSize: '12px', marginRight: '10px' }}
                  />
                ))}
              </div>
              {formik.touched.permissions && formik.errors.permissions && (
                <div style={{ color: 'red' }}>{'Select Atleast one '}</div>
              )}
            </div>
            <div className="p-field" style={{ marginBottom: '10px' }}>
              <label htmlFor="password">Password:</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...formik.getFieldProps('password')}
                  className="p-inputtext p-component"
                  style={{ width: '100%', borderRadius: '25px' }}
                />
                <IconButton
                  style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div style={{ color: 'red' }}>{formik.errors.password}</div>
              )}
            </div>
          </div>
        )}
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default EditUser;
