import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTableComponent from '../reusable/DataTableComponent';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import EditCustomer from '../Home/Customer/EditCustomer';
import DeleteCustomer from '../Home/Customer/DeleteCustomer';
import AddCustomer from '../Home/Customer/AddCustomer';
import { Dialog } from 'primereact/dialog';
import { RingLoader } from 'react-spinners';

const Customer = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [addDialogVisible, setAddDialogVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerIdToDelete, setCustomerIdToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users?user=customers`);
      const userData = response.data.map(user => ({
        id: user?.id,
        name: user?.name,
        username: user?.username,
        email: user?.email,
        phone: user?.user_fields?.phone || 'N/A',
        company_name: user?.user_fields?.company_name || 'N/A',
        company_address: user?.user_fields?.company_address || 'N/A',
        country: user?.user_fields?.country || 'N/A',
        company_size: user?.user_fields?.company_size || 'N/A',
        industry: user?.user_fields?.industry || 'N/A',
        userid: user?.user_fields?.user_id,
      }));
      setCustomers(userData);
    } catch (error) {
      console.error('Error fetching customer data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = () => {
    setAddDialogVisible(true);
  };

  const handleSave = () => {
    setEditDialogVisible(false);
    fetchData();
  };

  const handleEditCustomer = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/${id}`);
      setSelectedCustomer(response.data);
      setEditDialogVisible(true);
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };

  const handleDeleteCustomer = (id) => {
    setCustomerIdToDelete(id);
    setDeleteDialogVisible(true);
  };

  const handleReceipt = (customer) => {
    if (!customer || !customer.userid) {
      console.error('Invalid customer object or missing userid');
      return;
    }

    const { userid } = customer;
    console.log('Selected User ID for Receipt:', userid);
    navigate('/receipt', { state: { customerId: userid } });
  };

  const handleInfo = () => {
    navigate('/revenue-projection');
  };

  const columns = [
    { field: 'email', header: 'Email' },
    { field: 'company_name', header: 'Company Name' },
    { field: 'username', header: 'User Name' },
    { field: 'phone', header: 'Mobile' },
    { field: 'industry', header: 'Industry' },
    { field: 'country', header: 'Country' },
    { field: 'company_address', header: 'Company Address' },
    { field: 'company_size', header: 'Company Size' },
  ];

  return (
    <div style={{ height: 'auto', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
        <Button
          label="Add Customer"
          style={{ margin: '5px', backgroundColor: '#06163A', borderRadius: '10px' }}
          onClick={handleAddCustomer}
        />
      </div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <RingLoader color="#06163A" />
        </div>
      ) : (
        <DataTableComponent
          header="Customer List"
          columns={columns}
          data={customers}
          showEdit={true}
          showReceipt={true}
          showdelete={true}
          showinfo={true}
          showActions={true}
          onEdit={handleEditCustomer}
          onDelete={handleDeleteCustomer}
          onReceipt={handleReceipt}
          oninfo={handleInfo}
        />
      )}
      {selectedCustomer && (
        <EditCustomer
        
          visible={editDialogVisible}
          customer={selectedCustomer}
          onHide={() => setEditDialogVisible(false)}
          onSave={handleSave}
          style={{ width: '50vw' }}
        />
      )}
      {customerIdToDelete !== null && (
        <DeleteCustomer
          visible={deleteDialogVisible}
          customerId={customerIdToDelete}
          onHide={() => setDeleteDialogVisible(false)}
          onDelete={() => {
            setDeleteDialogVisible(false);
            fetchData();
          }}
        />
      )}
      <Dialog
        header="Add New Customer"
        visible={addDialogVisible}
        onHide={() => setAddDialogVisible(false)}
        style={{ width: '50vw' }}
      >
        <AddCustomer onSave={() => { setAddDialogVisible(false); fetchData(); }} />
      </Dialog>
      <Outlet />
    </div>
  );
};

export default Customer;
