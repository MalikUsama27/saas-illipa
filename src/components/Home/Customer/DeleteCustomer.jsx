import React from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteCustomer = ({ visible, onHide, customerId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/users/${customerId}`);
      onDelete(); // Notify parent to update the customer list
      toast.success('Customer deleted successfully');
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast.error('Error deleting customer');
    }
  };

  return (
    <Dialog
      header="Confirm Delete"
      visible={visible}
      onHide={onHide}
      footer={
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px',  }}>
          <Button
            label="Yes"
            icon="pi pi-check"
            className="p-button-success"
            onClick={handleDelete}
            style={{ width: '100px', fontSize: '12px', background: '#06163A', borderRadius: '25px' }}
          />
          <Button
            label="No"
            icon="pi pi-times"
            className="p-button-danger"
            onClick={onHide}
            style={{ width: '100px', fontSize: '12px', background: '#d9535f', borderRadius: '25px' }}
          />
        </div>
      }
    
    >
      <p>Are you sure you want to delete this customer?</p>
      <ToastContainer
        position="top-right"
        autoClose={800}
        rtl={false}
        style={{ zIndex: 1300, paddingTop: '55px' }}
      />
    </Dialog>
  );
};

export default DeleteCustomer;
