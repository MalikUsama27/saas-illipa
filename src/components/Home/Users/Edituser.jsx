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
  permissions: Yup.string().required('At least one permission is required'),
  password: Yup.string().when('confirmPassword', {
    is: val => val && val.length > 0,
    then: Yup.string().required('Password is required'),
  }),
});

// Available permissions
const availablePermissions = [
  { key: 'View Payments', label: 'View Payments' },
  { key: 'Add Users', label: 'Add Users' },
  { key: 'Make Premium Modules', label: 'Make Premium Modules' }
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
      permissions: Array.isArray(user?.user_fields?.permissions) 
        ? user.user_fields.permissions.join(', ') 
        : user?.user_fields?.permissions || '',
      password: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem('token');

       
        const permissionsArray = values.permissions
          .split(', ')
          .map(label => availablePermissions.find(p => p.label === label)?.key)
          .filter(Boolean);

        const requestData = {
          name: values.name,
          email: values.email,
          phone: values.phone,
          role: values.role,
          permissions: permissionsArray.join(', '),
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
        setTimeout(() => {
          onClose();
        }, 2000); 
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
    const permissionLabel = availablePermissions.find(p => p.key === permission)?.label;
    const currentPermissions = formik.values.permissions ? formik.values.permissions.split(', ').filter(p => p) : [];

    const updatedPermissions = checked
      ? [...currentPermissions, permissionLabel].join(', ')
      : currentPermissions.filter(p => p !== permissionLabel).join(', ');

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
            <Button label="Save" icon="pi pi-check" style={{ background: '#06163A', borderRadius: '25px' }} onClick={formik.handleSubmit} />
            <Button label="Cancel" icon="pi pi-times" style={{ background: '#d9535f', borderRadius: '25px' }} onClick={onClose} />
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
                <label htmlFor="name" style={{ display: 'block',fontFamily: 'Open Sans', fontSize: '12px' }}>Name:</label>
                <input
                  id="name"
                  type="text"
                  {...formik.getFieldProps('name')}
                  className="p-inputtext p-component"
                  style={{ width: '100%', borderRadius: '25px',fontFamily: 'Open Sans', fontSize: '12px' }}
                />
                {formik.touched.name && formik.errors.name && (
                  <div style={{ color: 'red' }}>{formik.errors.name}</div>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="email" style={{ display: 'block',fontFamily: 'Open Sans', fontSize: '12px' }}>Email:</label>
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
                <label htmlFor="phone" style={{ display: 'block' ,fontFamily: 'Open Sans', fontSize: '12px'}}>Phone:</label>
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
                <label htmlFor="role" style={{ fontSize: '12px' }}>Role:</label>
                <Dropdown
                  id="role"
                  value={formik.values.role}
                  options={rolesOptions}
                  onChange={(e) => formik.setFieldValue('role', e.value)}
                  optionLabel="label"
                  placeholder="Select Role"
                  style={{ borderRadius: '25px', fontSize: '12px' }}
                />
                {formik.touched.role && formik.errors.role && (
                  <div style={{ color: 'red' }}>{formik.errors.role}</div>
                )}
              </div>
            </div>

            <div className="p-field" style={{ marginBottom: '10px' }}>
              <label htmlFor="password">Password:</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...formik.getFieldProps('password')}
                  className="p-inputtext p-component"
                  style={{ width: '50%', borderRadius: '25px' }}
                />
                <IconButton
                  style={{ position: 'absolute', right: '50%', top: '50%', transform: 'translateY(-50%)' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div style={{ color: 'red' }}>{formik.errors.password}</div>
              )}
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="permissions" style={{ display: 'block',fontFamily: 'Open Sans', fontSize: '12px' }}>Permissions:</label>
              <div role="group" aria-labelledby="checkbox-group">
                {availablePermissions.map(permission => (
                  <FormControlLabel
                    key={permission.key}
                    control={
                      <Checkbox
                      style={{fontFamily: 'Open Sans', fontSize: '12px'}}
                        checked={formik.values.permissions.split(', ').includes(permission.label)}
                        onChange={(e) => handlePermissionChange(permission.key, e.target.checked)}
                      />
                    }
                    label={permission.label}
                  />
                ))}
              </div>
              {formik.touched.permissions && formik.errors.permissions && (
                <div style={{ color: 'red' }}>{formik.errors.permissions}</div>
              )}
            </div>
          </div>
        )}
       <ToastContainer
        position="top-right"
        autoClose={5000}
        rtl={false}
        style={{ zIndex: 1300, paddingTop:'55px'}} 
      />
      </Dialog>
    </>
  );
};

export default EditUser;
