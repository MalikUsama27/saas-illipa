import React, { useState } from 'react';
import { TextField, IconButton, Grid, Box, Button } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InputField = ({ label, name, value, onChange, disabled = false, ...props }) => (
  <TextField
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    fullWidth
    variant="outlined"
    size="small"
    disabled={disabled}
    sx={{
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
    {...props}
  />
);

const AddRevenuePlan = () => {
  const [plans, setPlans] = useState([{ min_value: '1', max_value: '', amount: '' }]);
  const [title, setTitle] = useState('');
  const [currentIndex, setCurrentIndex] = useState(plans.length - 1);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setPlans(prevPlans =>
      prevPlans.map((plan, i) => (i === index ? { ...plan, [name]: value } : plan))
    );
  };

  const handleAddPlan = () => {
    const isValid = plans.every(plan => plan.max_value && plan.amount);
    if (!isValid) {
      toast.error('Please complete all fields in the current plan before adding a new one.');
      return;
    }

    if (currentIndex !== plans.length - 1) {
      toast.error('Please complete the current row before adding a new one.');
      return;
    }

    const lastPlan = plans[plans.length - 1];
    if (lastPlan.max_value && lastPlan.min_value && parseInt(lastPlan.max_value) <= parseInt(lastPlan.min_value)) {
      toast.error('Max Value must be greater than Min Value.');
      return;
    }

    const newMinValue = lastPlan.max_value ? (parseInt(lastPlan.max_value) + 1).toString() : '1';

    const newPlan = {
      min_value: newMinValue, 
      max_value: '',
      amount: ''
    };

    setPlans([...plans, newPlan]);
    setCurrentIndex(plans.length); 
  };

  const handleDeletePlan = (index) => {
    if (index === plans.length - 1) {
      if (plans.length > 1) {
        setPlans(plans.filter((_, i) => i !== index));
        setCurrentIndex(Math.max(0, currentIndex - 1)); 
      } else {
        toast.error('At least 3 plan must be present.');
      }
    } else {
      toast.error('You cannot delete previous rows.');
    }
  };

  const handleSubmit = async () => {
    if (title.trim() === '' || plans.some(plan => !plan.max_value || !plan.amount)) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const formattedPlans = plans.map(({ min_value, max_value, amount }) => ({
        min_value,
        max_value,
        prize: amount
      }));

      const payload = {
        title,
        status: false,
        ranges: formattedPlans
      };

      const response = await axios.post('https://ilipaone.com/api/revenue-plans', payload);
      if (response.status === 201) {
        setPlans([{ min_value: '1', max_value: '', amount: '' }]);
        setTitle('');
        setCurrentIndex(0);
        toast.success('Plans submitted successfully.');
      } else {
        toast.error('Failed to submit plans.');
      }
    } catch (error) {
      console.error('Error submitting plans:', error);
      toast.error('Add Atleast 3 plans');
    }
  };

  const PlanEntry = ({ plan, index }) => (
    <Grid container spacing={1} style={{ paddingTop: '2%' }}>
      <Grid item xs={12} sm={3}>
        <InputField
          label="Min Value"
          name="min_value"
          value={plan.min_value}
          onChange={(e) => handleChange(e, index)}
          disabled={index !== plans.length + 1} 
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <InputField
          label="Max Value"
          name="max_value"
          value={plan.max_value}
          onChange={(e) => handleChange(e, index)}
          disabled={index !== currentIndex} 
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <InputField
          label="Amount"
          name="amount"
          value={plan.amount}
          onChange={(e) => handleChange(e, index)}
          disabled={index !== currentIndex} 
        />
      </Grid>
      <Grid item xs={12} sm={1} display="flex" justifyContent="center" alignItems="center">
        <IconButton 
          color="secondary" 
          onClick={() => handleDeletePlan(index)} 
          size="small"
          disabled={index !== plans.length - 1} 
        >
          <Delete />
        </IconButton>
      </Grid>
    </Grid>
  );

  return (
    <Box mt={2} p={2} border={1} borderColor="grey.400" borderRadius={4} width={1}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={8} sm={8}>
          <InputField
            label="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={2} sm={1} display="flex" justifyContent="center" alignItems="center">
          <IconButton color="primary" onClick={handleAddPlan} size="small">
            <Add />
          </IconButton>
        </Grid>
      </Grid>
      <Box mt={2}>
        {plans.map((plan, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <PlanEntry plan={plan} index={index} />
          </Box>
        ))}
      </Box>
      <Button
        variant="contained"
        sx={{ backgroundColor: '#06163A', borderRadius: '10px', '&:hover': { backgroundColor: '#06163A' }, mt: 2 }}
        onClick={handleSubmit}
      >
        Submit Plans
      </Button>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        rtl={false}
        style={{ zIndex: 1300, paddingTop: '55px' }}
      />
    </Box>
  );
};

export default AddRevenuePlan;
