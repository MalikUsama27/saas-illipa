import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const LogoutDialog = ({ visible, onConfirm, onCancel }) => {
  return (
    <Dialog
      header="Confirm Logout"
      visible={visible}
      onHide={onCancel}
      style={{ width: '30vw' }}
      modal
    >
      <div style={{ textAlign: 'center' }}>
        <p>Are you sure you want to logout?</p>
        <Button
          label="Yes"
          icon="pi pi-check"
          onClick={onConfirm}
          style={{ marginRight: '10px',backgroundColor:'#06163A' ,borderRadius:'15px' }}
        />
        <Button
          label="No"
          icon="pi pi-times"
          onClick={onCancel}
          className="p-button-danger" 

          style={{ marginRight: '10px',borderRadius:'15px' }}
        />
      </div>
    </Dialog>
  );
};

export default LogoutDialog;
