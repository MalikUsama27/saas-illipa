import React, { useState, useEffect } from 'react';
import { TextField, Box } from '@mui/material';
import { Button } from 'primereact/button'; 

const EditPlan = ({ plan, onSave, onClose }) => {
  const [formData, setFormData] = useState(plan);

  useEffect(() => {
    setFormData(plan);
  }, [plan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    onSave(formData); 
  };

  return (
    <Box
      component="form"
      sx={{
        width: '400px',
        margin: 'auto',
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: '#fff',
      }}
    >
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        size="small"
        sx={{
          marginBottom: '15px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '25px',
          },
          '& .MuiInputLabel-root': {
            fontSize: '12px',
            fontFamily: 'Open Sans',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '25px',
          },
        }}
      />
      <TextField
        label="Min Value"
        name="min_value"
        value={formData.min_value}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        size="small"
        type="number"
        sx={{
          marginBottom: '15px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '25px',
          },
          '& .MuiInputLabel-root': {
            fontSize: '12px',
            fontFamily: 'Open Sans',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '25px',
          },
        }}
      />
      <TextField
        label="Max Value"
        name="max_value"
        value={formData.max_value}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        size="small"
        type="number"
        sx={{
          marginBottom: '15px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '25px',
          },
          '& .MuiInputLabel-root': {
            fontSize: '12px',
            fontFamily: 'Open Sans',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '25px',
          },
        }}
      />
      <TextField
        label="Amount"
        name="prize"
        value={formData.prize}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        size="small"
        type="number"
        sx={{
          marginBottom: '24px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '25px',
          },
          '& .MuiInputLabel-root': {
            fontSize: '14px',
            fontFamily: 'Open Sans',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '25px',
          },
        }}
      />
      <Box sx={{display: 'flex', justifyContent: 'end',padding: '10px', borderTop: '1px solid #ddd'}}>
        <Button
          label="Yes"
          icon="pi pi-check"
          className="p-button-success"
          onClick={handleSubmit}
          style={{ width: '100px', borderRadius: '25px',fontSize: '12px', backgroundColor: '#06163A' , marginRight: '8px' }}
        />
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-danger"
          onClick={onClose} 
          style={{ width: '100px',borderRadius: '25px', fontSize: '12px', }}
        />
      </Box>
    </Box>
  );
};

export default EditPlan;
