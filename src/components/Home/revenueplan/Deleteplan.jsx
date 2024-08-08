import React from 'react';
import { Button } from 'primereact/button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const DeletePlan = ({ selectedPlan, onClose, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://ilipaone.com/api/revenue-plans/${selectedPlan.id}`);
      toast.success('Plan deleted successfully!');
      onDeleteSuccess();
    } catch (error) {
      toast.error('Error deleting plan.');
      console.error('Error deleting plan:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <p style={{ marginBottom: '20px', fontSize: '16px' }}>
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
        autoClose={5000}
        rtl={false}
        style={{ zIndex: 1300, paddingTop: '55px' }}
      />
    </div>
  );
};

export default DeletePlan;
