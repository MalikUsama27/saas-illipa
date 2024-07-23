import React, { useState } from 'react';
import { TextField, IconButton, Grid, Box, Typography } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const AddRevenuePlan = () => {
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState({ title: '', minValue: '', maxValue: '', prize: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPlan((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPlan = () => {
    setPlans([...plans, currentPlan]);
    setCurrentPlan({ title: '', minValue: '', maxValue: '', prize: '' });
  };

  const handleDeletePlan = (index) => {
    setPlans(plans.filter((_, i) => i !== index));
  };

  const PlanEntry = ({ plan, index }) => (
    // <Box mt={2} p={2}>
      <Grid container spacing={1} style={{paddingTop:'2%'}}>
        <Grid item xs={12} sm={3}>
          <TextField label="Title" value={plan.title} fullWidth variant="outlined" size="small" disabled />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField label="Min Value" value={plan.minValue} fullWidth variant="outlined" size="small" disabled />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField label="Max Value" value={plan.maxValue} fullWidth variant="outlined" size="small" disabled />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField label="Prize" value={plan.prize} fullWidth variant="outlined" size="small" disabled />
        </Grid>
        <Grid item xs={12} sm={1} display="flex" justifyContent="center" alignItems="center">
          <IconButton color="secondary" onClick={() => handleDeletePlan(index)} size="small">
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
    // </Box>
  );

  return (
    <Box mt={2} p={2} border={1} borderColor="grey.400" borderRadius={4} width={1}>
      {/* <Typography variant="h6">Revenue Plan</Typography> */}
      <Grid container spacing={1} mt={2}>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Title"
            name="title"
            value={currentPlan.title}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Min Value"
            name="minValue"
            value={currentPlan.minValue}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Max Value"
            name="maxValue"
            value={currentPlan.maxValue}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            label="Prise"
            name="prise"
            value={currentPlan.prize}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={1} display="flex" justifyContent="center" alignItems="center">
          <IconButton color="primary" onClick={handleAddPlan} size="small">
            <Add />
          </IconButton>
        </Grid>
      </Grid>
      {plans.map((plan, index) => (
        <PlanEntry key={index} plan={plan} index={index} />
      ))}
    </Box>
  );
};

export default AddRevenuePlan;
