import React from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const DeleteUser = ({ visible, onClose, onConfirm }) => {
  return (
    <Dialog
      header="Confirm Delete"
      visible={visible}
      onHide={onClose}
    
    >
      <div style={{ textAlign: 'center' ,padding:'18px',paddingTop:'-10px'}}>
        <p style={{ fontSize: '16px' ,paddingTop:'-10px'}}>
          Are you sure you want to delete this user?
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>

        <Button 
            label="Yes" 
            icon="pi pi-check" 
            className="p-button-success" 
            onClick={onConfirm} 
            style={{ width: '100px' ,background:'#06163A',borderRadius: '25px'}} 
          />
          <Button 
            label="No" 
            icon="pi pi-times" 
            className="p-button-danger" 
            onClick={onClose} 
            style={{ width: '100px' ,borderRadius: '25px'}} 
          />
      </div>      </div>

      </Dialog>
  );
};

export default DeleteUser;
