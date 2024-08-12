import React, { useState } from 'react';
import { TextField, IconButton, Grid, Box, Button, InputAdornment, Checkbox, FormControlLabel } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InputField = ({ label, name, value, onChange, onBlur, disabled = false, currency = false, ...props }) => (
  <TextField
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    fullWidth
    variant="outlined"
    size="small"
    disabled={disabled}
    InputProps={{
      startAdornment: currency ? <InputAdornment position="start">$</InputAdornment> : null,
    }}
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
      '& input': {
        textAlign: 'left',
      }
    }}
    {...props}
  />
);

const AddRevenuePlan = ({ onClose }) => {
  const [plans, setPlans] = useState([{ min_value: '1', max_value: '', amount: '' }]);
  const [title, setTitle] = useState('');
  const [currentIndex, setCurrentIndex] = useState(plans.length - 1);
  const [noMaxValue, setNoMaxValue] = useState(false);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setPlans(prevPlans =>
      prevPlans.map((plan, i) =>
        i === index
          ? {
              ...plan,
              [name]: value
            }
          : plan
      )
    );
  };

  const handleBlur = (e, index) => {
    const { name, value } = e.target;

    // Convert value to number and format
    let formattedValue = value;
    if (name !== 'amount') {
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
      formattedValue = isNaN(numericValue) ? '' : numericValue.toFixed(2);
    }

    setPlans(prevPlans =>
      prevPlans.map((plan, i) =>
        i === index
          ? {
              ...plan,
              [name]: formattedValue
            }
          : plan
      )
    );
  };

  const handleAddPlan = () => {
    const currentPlan = plans[currentIndex];
    const isCurrentPlanValid =
      currentPlan.min_value &&
      (noMaxValue || currentPlan.max_value) &&
      (noMaxValue || parseFloat(currentPlan.max_value) > parseFloat(currentPlan.min_value)) &&
      currentPlan.amount;

    if (!isCurrentPlanValid) {
      toast.error('Please complete the current plan correctly before adding a new one.');
      return;
    }

    const lastPlan = plans[plans.length - 1];
    if (lastPlan.max_value || noMaxValue) {
      const newMinValue = (parseFloat(lastPlan.max_value || '0') + 0.01).toFixed(2);
      const newPlan = {
        min_value: newMinValue,
        max_value: '',
        amount: ''
      };

      setPlans([...plans, newPlan]);
      setCurrentIndex(plans.length);
    } else {
      toast.error('Max Value must be set before adding a new plan.');
    }
  };

  const handleDeletePlan = (index) => {
    if (index === plans.length - 1) {
      if (plans.length > 1) {
        setPlans(plans.filter((_, i) => i !== index));
        setCurrentIndex(Math.max(0, currentIndex - 1));
      } else {
        toast.error('At least 1 plan must be present.');
      }
    } else {
      toast.error('You cannot delete previous rows.');
    }
  };

  const handleSubmit = async () => {
    if (plans.some((_, index) => index === currentIndex && (!plans[index].min_value || (!noMaxValue && !plans[index].max_value) || !plans[index].amount))) {
      toast.error('Please complete the current row before submitting.');
      return;
    }

    if (title.trim() === '' || plans.some(plan => !plan.min_value || (!noMaxValue && !plan.max_value) || !plan.amount)) {
      toast.error('Please add a title and complete all plans.');
      return;
    }

    if (plans.some(plan => !noMaxValue && parseFloat(plan.max_value) <= parseFloat(plan.min_value))) {
      toast.error('Max value must be greater than min value.');
      return;
    }

    if (plans.length <= 2) {
      toast.error('You must have at least 3 plans.');
      return;
    }

    try {
      const formattedPlans = plans.map(({ min_value, max_value, amount }, index) => ({
        min_value: parseFloat(min_value).toFixed(2),
        max_value: (index === plans.length - 1 && noMaxValue) ? '1000000.00' : parseFloat(max_value).toFixed(2),
        prize: parseFloat(amount).toFixed(0),  
        ...(index === plans.length - 1 && noMaxValue ? { max_value_status: true } : {})
      }));

      const payload = {
        title,
        status: true,
        ranges: formattedPlans
      };

      const response = await axios.post('https://ilipaone.com/api/revenue-plans', payload);
      if (response.status === 201) {
        setPlans([{ min_value: '1.00', max_value: '', amount: '' }]);
        setTitle('');
        toast.success('Plans submitted successfully.');
        onClose();
      } else {
        toast.error('Failed to submit plans.');
      }
    } catch (error) {
      console.error('Error submitting plans:', error);
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
          onBlur={(e) => handleBlur(e, index)}
          disabled={index !== plans.length + 1}
          currency
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <InputField
          label="Max Value"
          name="max_value"
          value={plan.max_value}
          onChange={(e) => handleChange(e, index)}
          onBlur={(e) => handleBlur(e, index)}
          disabled={index !== currentIndex || (index === plans.length - 1 && noMaxValue)}
          currency
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <InputField
          label="Amount"
          name="amount"
          value={plan.amount}
          onChange={(e) => handleChange(e, index)}
          onBlur={(e) => handleBlur(e, index)}
          disabled={index !== currentIndex}
          currency
        />
      </Grid>
      <Grid item xs={12} sm={1} display="flex" justifyContent="center" alignItems="center">
        {index !== 0 && (
          <IconButton
            color="secondary"
            onClick={() => handleDeletePlan(index)}
            size="small"
            disabled={index !== plans.length - 1}
          >
            <Delete />
          </IconButton>
        )}
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
        <Grid item xs={12} sm={12}>
          <FormControlLabel
            control={<Checkbox checked={noMaxValue} onChange={(e) => setNoMaxValue(e.target.checked)} />}
            label="Do not require max value for last row"
            disabled={plans.length <= 2} 
          />
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
