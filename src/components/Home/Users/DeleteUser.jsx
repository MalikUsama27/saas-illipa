import React from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';


const DeleteUser = ({ visible, onClose, onConfirm }) => {
  return (
    <Dialog
      header="Confirm Delete"
      visible={visible}
      onHide={onClose}
      footer={
        <div>
          <Button label="Yes" icon="pi pi-check" onClick={onConfirm} />
          <Button label="No" icon="pi pi-times" onClick={onClose} />
        </div>
      }
    >
      <p>Are you sure you want to delete this user?</p>
    </Dialog>
  );
};

export default DeleteUser;
