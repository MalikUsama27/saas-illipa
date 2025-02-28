import React from 'react';
import { Button } from 'primereact/button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const DeletePlan = ({ selectedPlan, onClose, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/revenue-plans/${selectedPlan.id}`);
        onDeleteSuccess();
    //  toast.success(`Successfully`,{autoClose: 3000})
    
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        // Show the specific error message
        toast.error(error.response.data.message);
      } else {
        // Show a generic error message
        toast.error('Error deleting plan. Please try again.');
      }
      console.error('Error deleting plan:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '16px' }}>
        Are you sure you want to delete this revenue plan?
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <Button
          label="Yes"
          icon="pi pi-check"
          className="p-button-success"
          onClick={handleDelete}
          style={{ background: '#06163A', borderRadius: '25px' }}
        />
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-danger"
          onClick={onClose}
          style={{ borderRadius: '25px' }}
        />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={800}
        rtl={false}
        style={{ zIndex: 1300, paddingTop: '55px' }}
      />
    </div>
  );
};

export default DeletePlan;
