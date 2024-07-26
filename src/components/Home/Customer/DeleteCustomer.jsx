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
        <div>
          <Button label="Yes" icon="pi pi-check" onClick={onConfirm} />
          <Button label="No" icon="pi pi-times" onClick={onHide} />
        </div>
      }
      style={{ width: '50%' }} 
    >
      <p>Are you sure you want to delete this user?</p>
    </Dialog>
  );
};

export default DeleteCustomer;
