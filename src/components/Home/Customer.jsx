import React, { useState } from 'react';
import DataTableComponent from "../reusable/DataTableComponent";
import { Outlet } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import EditCustomer from '../Home/Customer/EditCustomer';
import DeleteCustomer from '../Home/Customer/DeleteCustomer';

const usersData = [
  {
    id: 1,
    username: 'Johnson',
    email: 'johnson@abc.com',
    mobile: '(995) 555-1234',
    companyName: 'Lorem Ipsum dolor sit amet',
    industry: 'Healthcare',
    country: 'USA',
    companyAddress: '123 Main St, Anytown, USA',
    companySize: '50-100',
    password: 'password123',
  },
  // Add more users as needed
];
const Customer = () => {
  const navigate = useNavigate();
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleAddCustomer = () => {
    navigate('/dashboard/add-customer');
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setEditDialogVisible(true);
  };

  const handleDeleteCustomer = (customer) => {
    setSelectedCustomer(customer);
    setDeleteDialogVisible(true);
  };

  // const handleSave = () => {
   
  // };

  const handleConfirmDelete = () => {
    
    setDeleteDialogVisible(false);
  };

  const columns = [
    { field: 'email', header: 'Email' },
    { field: 'companyName', header: 'Company Name' },
    { field: 'username', header: 'User Name' },
    { field: 'mobile', header: 'Mobile' },
    { field: 'industry', header: 'Industry' },
    { field: 'country', header: 'Country' },
    { field: 'companyAddress', header: 'Company Address' },
    { field: 'companySize', header: 'Company Size' },
    { field: 'password', header: 'Password' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Button
          label="Add Customer"
          style={{ margin: '5px', backgroundColor: '#434191' }}
          onClick={handleAddCustomer}
        />
      </div>
      <DataTableComponent 
        columns={columns} 
        data={usersData}
        showEdit={true}
        onEdit={handleEditCustomer}
        onDelete={handleDeleteCustomer}
      />
      <EditCustomer
        visible={editDialogVisible}
        customer={selectedCustomer}
        onHide={() => setEditDialogVisible(false)}
        // onSave={handleSave}
      />
      <DeleteCustomer
        visible={deleteDialogVisible}
        onHide={() => setDeleteDialogVisible(false)}
        onConfirm={handleConfirmDelete}
      />
      <Outlet />
    </div>
  );
};

export default Customer;