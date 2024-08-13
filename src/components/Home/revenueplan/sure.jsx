import React from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ToastContainer } from 'react-toastify';
const Sure = ({ onClose, onConfirm }) => {
  return (
    <Dialog
      visible
      onHide={onClose}
      header="Confirm Action"
      style={{ width: '400px' }}
      modal
    >
      <div>
        <p>Are you sure you want to disable the Current plan and make this plan default.  </p>
        <div style={{display:'flex',justifyContent:'center',gap: '10px' }}>
        <Button label="Yes"  
          icon="pi pi-check"
          className="p-button-success"
          onClick={onConfirm} 
          style={{ background: '#06163A', borderRadius: '25px' }}/>
        <Button onClick={onClose} 
               label="No"
               icon="pi pi-times"
               className="p-button-danger"
               style={{ borderRadius: '25px' }}
        /></div>
          <ToastContainer
        position="top-right"
        autoClose={5000}
        rtl={false}
        style={{ zIndex: 1300, paddingTop: '55px' }}
      />
      </div>
    </Dialog>
  );
};

export default Sure;
