import React from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const DeleteCustomer = ({ visible, onHide, onConfirm }) => {
  return (
    <Dialog
      header="Confirm Delete"
      visible={visible}
      onHide={onHide}
      footer={
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', padding: '10px' }}>
          <Button
            label="Yes"
            icon="pi pi-check"
            className="p-button-success"
            onClick={onConfirm}
            style={{ width: '100px',  fontSize: '12px',background:'#06163A',borderRadius: '25px',  }}
          />
          <Button
            label="No"
            icon="pi pi-times"
            className="p-button-danger"
            onClick={onHide}
            style={{ width: '100px', fontSize: '12px',borderRadius: '25px', }}
          />
        </div>
      }
      style={{ width: '400px', borderRadius: '10px' }} 
    >
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p style={{ fontSize: '16px', marginBottom: '20px' }}>
          Are you sure you want to delete this customer?
        </p>
      </div>
    </Dialog>
  );
};

export default DeleteCustomer;
