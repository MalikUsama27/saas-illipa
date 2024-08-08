import React, { useState, useEffect } from 'react';
import { TextField, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const CustomTextField = ({ label, name, value, onChange, type = "text", error }) => (
  <TextField
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    fullWidth
    variant="outlined"
    size="small"
    type={type}
    error={!!error}
    helperText={error}
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
);

const EditPlan = ({ plan, onSave, onClose }) => {
  const [formData, setFormData] = useState(plan);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData(plan);
  }, [plan]);

  const validateFields = () => {
    const newErrors = {};
    let valid = true;

    if (!formData.title) {
      valid = false;
      newErrors.title = 'Title is required';
    }

    formData.ranges.forEach((range, index) => {
      const minValue = parseFloat(range.min_value);
      const maxValue = parseFloat(range.max_value);
      const prize = parseFloat(range.prize);

      if (!range.min_value || !range.max_value || !range.prize) {
        valid = false;
        newErrors[`range_${index}_min_value`] = !range.min_value ? 'Min value is required' : '';
        newErrors[`range_${index}_max_value`] = !range.max_value ? 'Max value is required' : '';
        newErrors[`range_${index}_prize`] = !range.prize ? 'Prize is required' : '';
      }

      if (minValue >= maxValue) {
        valid = false;
        newErrors[`range_${index}_min_value`] = 'Min value must be less than max value';
      }

      if (index > 0) {
        const prevMaxValue = parseFloat(formData.ranges[index - 1].max_value);
        if (minValue <= prevMaxValue) {
          valid = false;
          newErrors[`range_${index}_min_value`] = 'Min value must be greater than previous max value';
        }
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRangeChange = (index, field, value) => {
    setFormData(prevData => {
      const newRanges = [...prevData.ranges];
      newRanges[index] = { ...newRanges[index], [field]: value };
      return { ...prevData, ranges: newRanges };
    });
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      if (!validateFields()) {
        Object.values(errors).forEach(error => {
          if (error) toast.error(error);
        });
        return;
      }

      const payload = {
        title: formData.title,
        status: false,
        ranges: formData.ranges.map(range => ({
          min_value: parseFloat(range.min_value),
          max_value: parseFloat(range.max_value),
          prize: parseFloat(range.prize),
        })),
      };

      const response = await axios.put(`https://ilipaone.com/api/revenue-plans/${formData.id}`, payload);

      if (response.status === 200) {
        toast.success('Plan updated successfully!');
        onSave();
        onClose(); 
      } else {
        toast.error('Failed to update the plan.');
      }
    } catch (error) {
      console.error('Error updating plan:', error);
      toast.error('An error occurred while updating the plan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        width: '600px',
        margin: 'auto',
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <CustomTextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
      />

      <TableContainer component={Paper} sx={{ marginTop: '16px', width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Min Value</TableCell>
              <TableCell>Max Value</TableCell>
              <TableCell>Prize</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formData.ranges.map((range, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    label="Min Value"
                    value={range.min_value}
                    onChange={(e) => handleRangeChange(index, 'min_value', e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                    type="text"
                    error={!!errors[`range_${index}_min_value`]}
                    helperText={errors[`range_${index}_min_value`]}
                    sx={{ borderRadius: '25px' }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    label="Max Value"
                    value={range.max_value}
                    onChange={(e) => handleRangeChange(index, 'max_value', e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                    type="text"
                    error={!!errors[`range_${index}_max_value`]}
                    helperText={errors[`range_${index}_max_value`]}
                    sx={{ borderRadius: '25px' }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    label="Prize"
                    value={range.prize}
                    onChange={(e) => handleRangeChange(index, 'prize', e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                    type="text"
                    error={!!errors[`range_${index}_prize`]}
                    helperText={errors[`range_${index}_prize`]}
                    sx={{ borderRadius: '25px' }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'end', padding: '10px', borderTop: '1px solid #ddd', width: '100%' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ width: '100px', borderRadius: '25px', fontSize: '12px', backgroundColor: '#06163A', marginRight: '8px' }}
          disabled={isSubmitting}
        >
          Save
        </Button>
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        rtl={false}
        style={{ zIndex: 1300, paddingTop: '55px' }}
      />
    </Box>
  );
};

export default EditPlan;
