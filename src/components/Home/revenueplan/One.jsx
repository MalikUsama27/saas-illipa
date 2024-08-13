import React from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ToastContainer } from 'react-toastify';


const One = ({ onClose }) => {
  return (
    <Dialog
      visible
      onHide={onClose}
      header="Error"
      style={{ width: '300px' }}
      modal
    >
      <div>
        <p>One plan must be active! </p>
        <div style={{display:'flex',justifyContent:'center',gap: '10px' }}>

        <Button onClick={onClose} 
               label="Dismiss"
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
  )
}

export default One
