import React, { useState } from 'react';
import { TextField, IconButton, Grid, Box, Button } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { css, keyframes } from '@emotion/react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const slideInAnimation = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const InputField = ({ label, name, value, onChange, ...props }) => (
  <TextField
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    fullWidth
    variant="outlined"
    size="small"
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
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState({ title: '', min_value: '', max_value: '', amount: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPlan((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPlan = () => {
    if (Object.values(currentPlan).every(field => field.trim() !== '')) {
      setPlans([...plans, currentPlan]);
      setCurrentPlan({ title: '', min_value: '', max_value: '', amount: '' });
      toast.success('Plan added successfully.');
    } else {
      toast.error('Please fill in all fields.');
    }
  };

  const handleDeletePlan = (index) => {
    setPlans(plans.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (plans.length === 0) {
      toast.error('No plans to submit.');
      return;
    }

    try {
      const formattedPlans = plans.map(plan => ({
        ...plan,
        prize: plan.amount, 
        amount: undefined 
      }));

      const response = await axios.post('https://ilipaone.com/api/revenue-plans', { plans: formattedPlans });
      if (response.status === 201) {
        setPlans([]); 
        toast.success('Plans submitted successfully.');
      } else {
        toast.error('Failed to submit plans.');
      }
    } catch (error) {
      console.error('Error submitting plans:', error);
      toast.error('Error submitting plans.');
    }
  };

  const PlanEntry = ({ plan, index }) => (
    <Grid container spacing={1} style={{ paddingTop: '2%' }}>
      <Grid item xs={12} sm={3}>
        <InputField
          label="Title"
          value={plan.title}
          disabled
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <InputField
          label="Min Value"
          value={plan.min_value}
          disabled
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <InputField
          label="Max Value"
          value={plan.max_value}
          disabled
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <InputField
          label="Amount" 
          value={plan.amount}
          disabled
        />
      </Grid>
      <Grid item xs={12} sm={1} display="flex" justifyContent="center" alignItems="center">
        <IconButton color="secondary" onClick={() => handleDeletePlan(index)} size="small">
          <Delete />
        </IconButton>
      </Grid>
    </Grid>
  );

  return (
    <Box mt={2} p={2} border={1} borderColor="grey.400" borderRadius={4} width={1}>
      <Grid container spacing={1} mt={2}>
        <Grid item xs={12} sm={3}>
          <InputField
            label="Title"
            name="title"
            value={currentPlan.title}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <InputField
            label="Min Value"
            name="min_value"
            value={currentPlan.min_value}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <InputField
            label="Max Value"
            name="max_value"
            value={currentPlan.max_value}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <InputField
            label="Amount" // Display label as 'Amount'
            name="amount" // Use 'amount' in state
            value={currentPlan.amount}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={1} display="flex" justifyContent="center" alignItems="center">
          <IconButton color="primary" onClick={handleAddPlan} size="small">
            <Add />
          </IconButton>
        </Grid>
      </Grid>
      <Box mt={2}>
        {plans.map((plan, index) => (
          <Box
            key={index}
            sx={{
              animation: `${slideInAnimation} 0.5s ease-in-out`,
              mb: 2,
            }}
          >
            <PlanEntry plan={plan} index={index} />
          </Box>
        ))}
      </Box>
      <Button
        variant="contained"
        sx={{  backgroundColor: '#06163A', borderRadius: '10px' , '&:hover': { backgroundColor: '#06163A' }, mt: 2 }}
        onClick={handleSubmit}
      >
        Submit Plans
      </Button>
      <ToastContainer /> 
    </Box>
  );
};

export default AddRevenuePlan;
