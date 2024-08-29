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
import EasyEdit, { Types } from 'react-easy-edit';

const Customer = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [addDialogVisible, setAddDialogVisible] = useState(false);
  const [planOptions, setPlanOptions] = useState([]);
   // eslint-disable-next-line 
  const [plans, setPlans] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerIdToDelete, setCustomerIdToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    fetchPlans(); // Fetch plans when component mounts
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users?user=customers`);
      const userData = response.data.map(user => ({
        id: user?.id,
        username: user?.username,
        company_name: user?.user_fields?.company_name || 'N/A',
        userid: user?.user_fields?.user_id,
        transactionId: '100',
        CurentRevenue: '50',
        plan: 'Testing Plan',
      }));
      setCustomers(userData);
    } catch (error) {
      console.error('Error fetching customer data', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/revenue-plans`);
      const planData = response.data;
      setPlans(planData);
      const options = planData.map(plan => ({
        label: plan.title,
        value: plan.title,
      }));
      setPlanOptions(options);
      console.log('Fetched Plans:', planData);
      console.log('Plan Options:', options);
    } catch (error) {
      console.error('Error fetching revenue plans:', error);
    }
  };

  const handleAddCustomer = () => {
    setAddDialogVisible(true);
  };

  const handleViewCustomer = () => {
    navigate('/customer/info');
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

  // const handlePlanChange = async (customer, newPlan) => {
  //   if (customer && newPlan) {
  //     console.log('Updated Plan:', newPlan);
  //     try {
  //       await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/users/${customer.id}`, {
  //         user_fields: {
  //           plan: newPlan
  //         }
  //       });
  //       // After updating the backend, refresh the customer data
  //       fetchData();
  //     } catch (error) {
  //       console.error('Error updating plan:', error);
  //     }
  //   }
  // };

  const columns = [
    { field: 'company_name', header: 'Company Name' },
    { field: 'username', header: 'Customer Id' },
    { 
      field: 'plan', 
      header: 'Plan',
      body: (rowData) => (
        <EasyEdit
          type={Types.SELECT}
          value={rowData.plan}
          onChange={(newPlan) =>
            //  handlePlanChange
             ( newPlan)}
          options={planOptions} 
        />
      )
    },
    { field: 'transactionId', header: 'Billed Amount Total' },
    { field: 'CurentRevenue', header: 'Current Revenue' },
  ];

  return (
    <div style={{ height: 'auto', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
        <Button
          label="Add Customer"
          style={{ margin: '5px', backgroundColor: '#06163A', borderRadius: '10px' }}
          onClick={handleAddCustomer}
        />
        <Button
          label="View Customer Details"
          style={{ margin: '5px', backgroundColor: '#06163A', borderRadius: '10px' }}
          onClick={handleViewCustomer}
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
