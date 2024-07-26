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

const EditUser = ({ visible, onClose, userId, onSave }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    permissions: '',
    password: '',
  });
  const [fetchingUser, setFetchingUser] = useState(false);
  const [rolesOptions, setRolesOptions] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        // Fetch roles from API or define them here
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

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          setFetchingUser(true);
          const response = await axios.get(`https://ilipaone.com/api/users/${userId}`);
          const data = response.data;
          setUserData({
            name: data.name || '',
            email: data.email || '',
            phone: data.user_fields?.phone || '',
            role: data.roles?.name || '',
            permissions: data.user_fields?.permissions || '',
            password: '',
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setFetchingUser(false);
        }
      };
      fetchUserData();
    }
  }, [userId]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token'); 
      await axios.put(
        `https://ilipaone.com/api/users/${userId}`,
        {
          name: userData.name,
          email: userData.email,
          user_fields: {
            phone: userData.phone,
            permissions: userData.permissions,
          },
          roles: [{ name: userData.role }],
          password: userData.password ? userData.password : undefined, 
        },
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
  };

  return (
    <>
      <Dialog
        header="Edit User"
        visible={visible}
        onHide={onClose}
        footer={
          <div>
            <Button label="Save" icon="pi pi-check" onClick={handleSave} />
            <Button label="Cancel" icon="pi pi-times" onClick={onClose} />
          </div>
        }
        style={{ width: '50vw' }}
        modal
      >
        {fetchingUser ? (
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '200px' 
            }}
          >
            <RingLoader color="#007ad9" />
          </div>
        ) : (
          <div className="p-fluid">
            <div className="p-field">
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                className="p-inputtext p-component"
                style={{ width: '100%' }}
              />
            </div>
            <div className="p-field">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                className="p-inputtext p-component"
                style={{ width: '100%' }}
              />
            </div>
            <div className="p-field">
              <label htmlFor="phone">Phone:</label>
              <input
                id="phone"
                type="text"
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                className="p-inputtext p-component"
                style={{ width: '100%' }}
              />
            </div>
            <div className="p-field">
              <label htmlFor="role">Role:</label>
              <Dropdown
                id="role"
                value={userData.role}
                options={rolesOptions}
                onChange={(e) => setUserData({ ...userData, role: e.value })}
                optionLabel="label"
                placeholder="Select Role"
              />
            </div>
            <div className="p-field">
              <label htmlFor="permissions">Permissions:</label>
              <input
                id="permissions"
                type="text"
                value={userData.permissions}
                onChange={(e) => setUserData({ ...userData, permissions: e.target.value })}
                className="p-inputtext p-component"
                style={{ width: '100%' }}
              />
            </div>
            <div className="p-field">
              <label htmlFor="password">Password:</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={userData.password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  className="p-inputtext p-component"
                  style={{ width: '100%' }}
                />
                <IconButton
                  style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ?  <Visibility />: <VisibilityOff />}
                </IconButton>
              </div>
            </div>
          </div>
        )}
      </Dialog>
      <ToastContainer /> 
    </>
  );
};

export default EditUser;
