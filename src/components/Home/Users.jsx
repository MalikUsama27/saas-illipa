import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RingLoader } from 'react-spinners';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import DataTableComponent from '../reusable/DataTableComponent';
import EditUser from './Users/Edituser'; 
import DeleteUser from './Users/DeleteUser'; 
import AddUser from './Users/AddUser';

const Users = () => {
  // const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [addUserDialogVisible, setAddUserDialogVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://ilipaone.com/api/users');
      const formattedUsers = response.data.map(user => ({
        name: user.name,
        email: user.email,
        phone: user.user_fields?.phone || 'N/A',
        role: user.roles?.[0]?.name || 'N/A',
        permissions: user.user_fields?.permissions || 'N/A',
        id: user.id,
        userData: user, 
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
    setAddUserDialogVisible(true);
  };

  const handleEdit = (userId) => {
    const user = users.find(user => user.id === userId);
    setSelectedUser(user);
    setEditDialogVisible(true);
  };

  const handleDelete = (userId) => {
    setSelectedUser({ id: userId });
    setDeleteDialogVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`https://ilipaone.com/api/users/${selectedUser.id}`);
      setUsers(users.filter(user => user.id !== selectedUser.id));
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setDeleteDialogVisible(false);
    }
  };

  const handleSaveEdit = () => {
    setEditDialogVisible(false);
    fetchUsers(); 
  };

  const handleCloseAddUserDialog = () => {
    setAddUserDialogVisible(false);
    fetchUsers();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
        
        <Button
          label="Add User"
          style={{ margin: '5px', backgroundColor: '#06163A', borderRadius: '10px' }}
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
            { field: 'phone', header: 'Phone' },
            { field: 'role', header: 'Role' },
            { field: 'permissions', header: 'Permissions'},
          ]}
          header="User"
          data={users}
          showEdit={true}
          onEdit={handleEdit}
          showdelete={true}
          onDelete={handleDelete}
          showActions={true} 
        />
      )}
      {selectedUser && (
        <EditUser
          visible={editDialogVisible}
          onClose={() => setEditDialogVisible(false)}
          user={selectedUser.userData} 
          onSave={handleSaveEdit}
        />
      )}
      {selectedUser && (
        <DeleteUser
          visible={deleteDialogVisible}
          onClose={() => setDeleteDialogVisible(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
      <Dialog
        header="Add New User"
        visible={addUserDialogVisible}
        onHide={() => setAddUserDialogVisible(false)}
        style={{ width: '50vw' }}
        
      >
        <AddUser onClose={handleCloseAddUserDialog} />
      </Dialog>
    </div>
  );
};

export default Users;
