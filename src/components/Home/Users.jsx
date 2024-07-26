import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RingLoader } from 'react-spinners';
import { Button } from 'primereact/button';
import DataTableComponent from '../reusable/DataTableComponent';
import EditUser from './Users/Edituser'; 
import DeleteUser from './Users/DeleteUser'; 

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://ilipaone.com/api/users');
      const formattedUsers = response.data.map(user => ({
        name: user.name,
        email: user.email,
        mobile: user.user_fields.phone,
        role: user.roles[0]?.name || 'N/A',
        permissions: user.user_fields.permissions || 'N/A',
        id: user.id,
      }));
      setUsers(formattedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = () => {
    navigate('/dashboard/add-user');
  };

  const handleEdit = (userId) => {
    setSelectedUserId(userId);
    setEditDialogVisible(true);
  };

  const handleDelete = (userId) => {
    setSelectedUserId(userId);
    setDeleteDialogVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`https://ilipaone.com/api/users/${selectedUserId}`);
      setUsers(users.filter(user => user.id !== selectedUserId));
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setDeleteDialogVisible(false);
    }
  };

  const handleSaveEdit = () => {
    setEditDialogVisible(false);
    fetchUsers(); // Refresh the user list after editing
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Button
          label="Add User"
          style={{ margin: '5px', backgroundColor: '#434191' }}
          onClick={handleAddUser}
        />
      </div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <RingLoader color="#434191" loading={loading} size={60} />
        </div>
      ) : (
        <DataTableComponent
          columns={[
            { field: 'name', header: 'Name' },
            { field: 'email', header: 'Email' },
            { field: 'mobile', header: 'Mobile' },
            { field: 'role', header: 'Role' },
            { field: 'permissions', header: 'Permissions' },
          ]}
          data={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showEdit={true}
        />
      )}
      <EditUser
        visible={editDialogVisible}
        onClose={() => setEditDialogVisible(false)}
        userId={selectedUserId}
        onSave={handleSaveEdit}
      />
      <DeleteUser
        visible={deleteDialogVisible}
        onClose={() => setDeleteDialogVisible(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};
export default Users;
