import React, { useState, useEffect } from 'react';
import {
  TextField,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Add, Delete } from '@mui/icons-material';

const formatDollar = (value) => {
  return value ? `$${parseFloat(value).toFixed(2)}` : '';
};

const parseDollar = (value) => {
  const parsedValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
  return isNaN(parsedValue) ? '' : parsedValue.toFixed(2);
};

const CustomTextField = ({ label, name, value, onChange, type = 'text', error, disabled }) => (
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
    InputProps={{
      startAdornment: <InputAdornment position="start"></InputAdornment>,
    }}
    sx={{
      marginBottom: '15px',
      '& .MuiOutlinedInput-root': {
        borderRadius: '25px',
      },
      '& .MuiInputLabel-root': {
        fontSize: '12px',
        fontFamily: 'Open Sans',
      },
    }}
    disabled={disabled}
  />
);

const EditPlan = ({ plan, onSave, onClose }) => {
  const [plans, setPlans] = useState([{ min_value: '', max_value: '', amount: '' }]);
  const [title, setTitle] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [noMaxValue, setNoMaxValue] = useState(false);

  useEffect(() => {
    if (plan) {
      setTitle(plan.title || '');
      setPlans(plan.ranges.map(r => ({
        min_value: r.min_value,
        max_value: r.max_value,
        amount: r.prize
      })));
      setCurrentIndex(plan.ranges.length - 1);
      setNoMaxValue(plan.ranges.some(r => r.max_value_status));
    }
  }, [plan]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const parsedValue = parseDollar(value);

    setPlans(prevPlans =>
      prevPlans.map((plan, i) => (i === index ? { ...plan, [name]: parsedValue } : plan))
    );
  };

  const handleEditPlan = () => {
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
    if (lastPlan.max_value && lastPlan.min_value && parseFloat(lastPlan.max_value) <= parseFloat(lastPlan.min_value)) {
      toast.error('Max Value must be greater than Min Value.');
      return;
    }

    const newMinValue = (parseFloat(lastPlan.max_value) + 0.01).toFixed(2);

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
        toast.error('At least one plan must be present.');
      }
    } else {
      toast.error('You cannot delete previous rows.');
    }
  };

  const validatePlans = () => {
    if (plans.some((_, index) => index === currentIndex && (!plans[index].min_value || (!noMaxValue && !plans[index].max_value) || !plans[index].amount))) {
      toast.error('Please complete the current row before submitting.');
      return false;
    }

    if (title.trim() === '' || plans.some(plan => !plan.min_value || (!noMaxValue && !plan.max_value) || !plan.amount)) {
      toast.error('Please add a title and complete all plans.');
      return false;
    }

    if (plans.some(plan => !noMaxValue && parseFloat(plan.max_value) <= parseFloat(plan.min_value))) {
      toast.error('Max value must be greater than min value.');
      return false;
    }

    if (plans.length <= 2) {
      toast.error('You must have at least 3 plans.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validatePlans()) return;

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

      if (plan) {
        // For updating an existing plan
        const response = await axios.put(`https://ilipaone.com/api/revenue-plans/${plan.id}`, payload);
        if (response.status === 200) {
          toast.success('Plans updated successfully.');
        } else {
          toast.error('Failed to update plans.');
        }
      } else {
        // For creating a new plan
        const response = await axios.post('https://ilipaone.com/api/revenue-plans', payload);
        if (response.status === 201) {
          toast.success('Plans submitted successfully.');
        } else {
          toast.error('Failed to submit plans.');
        }
      }

      // Reset state and call onSave callback
      setPlans([{ min_value: '0.00', max_value: '', amount: '' }]);
      setTitle('');
      onSave();
    } catch (error) {
      console.error('Error submitting plans:', error);
      toast.error('Error submitting plans.');
    }
  };

  const PlanEntry = ({ plan, index }) => (
    <Grid container spacing={1} sx={{ paddingTop: '2%' }}>
      <Grid item xs={12} sm={3}>
        <CustomTextField
          label="Min Value"
          name="min_value"
          value={formatDollar(plan.min_value)}
          onChange={(e) => handleChange(e, index)}
          disabled={index !== plans.length + 1}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <CustomTextField
          label="Max Value"
          name="max_value"
          value={formatDollar(plan.max_value)}
          onChange={(e) => handleChange(e, index)}
          disabled={index !== currentIndex || (index === plans.length - 1 && noMaxValue)}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <CustomTextField
          label="Amount"
          name="amount"
          value={formatDollar(plan.amount)}
          onChange={(e) => handleChange(e, index)}
          disabled={index !== currentIndex}
        />
      </Grid>
      <Grid item xs={12} sm={1} display="flex" alignItems="center" justifyContent="center">
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
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={8}>
          <CustomTextField
            label="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={title.trim() === '' ? 'Title is required' : null}
          />
        </Grid>
        <Grid item xs={12} sm={4} display="flex" alignItems="center">
          <IconButton color="primary" onClick={handleEditPlan} size="small">
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
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#06163A',
            borderRadius: '25px',
            '&:hover': { backgroundColor: '#06163A' },
            width: '200px',
          }}
          onClick={handleSubmit}
        >
          Update Plan
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
