import React from 'react';
import {
  TextField,
  Box,
  Button,
  Grid,
  IconButton,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Add, Delete } from '@mui/icons-material';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  plans: Yup.array().of(
    Yup.object().shape({
      min_value: Yup.number().required('Min value is required').min(0, 'Min value cannot be negative'),
      max_value: Yup.number()
        .when('noMaxValue', {
          is: false,
          then: Yup.number().required('Max value is required').moreThan(Yup.ref('min_value'), 'Max value must be greater than min value'),
        }),
      amount: Yup.number().required('Amount is required').positive('Amount must be positive').integer('Amount must be an integer'),
    })
  ).min(3, 'You must have at least 3 plans')
});

const EditPlan = ({ plan, onSave, onClose }) => {
  const formik = useFormik({
    initialValues: {
      title: plan?.title || '',
      plans: plan?.ranges.map(r => ({
        id: r.id,
        min_value: r.min_value,
        max_value: r.max_value,
        amount: r.prize,
        max_value_status: r.max_value_status
      })) || [{ min_value: '', max_value: '', amount: '' }],
      noMaxValue: plan?.ranges.some(r => r.max_value_status) || false
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        // Perform manual validation
        await validationSchema.validate(values, { abortEarly: false });

        const lastPlan = formik.values.plans[formik.values.plans.length - 1];
        if (lastPlan.min_value && lastPlan.max_value && parseFloat(lastPlan.max_value) <= parseFloat(lastPlan.min_value)) {
          toast.error('Max Value must be greater than Min Value.');
          return;
        }
        const formattedPlans = values.plans.map(({ min_value, max_value, amount }, index) => ({
          min_value: min_value,
          max_value: (index === values.plans.length - 1 && values.noMaxValue) ? '100000000000.00' : max_value,
          prize: amount,
          ...(index === values.plans.length - 1 && values.noMaxValue ? { max_value_status: 1 } : {})
        }));

        const payload = {
          title: values.title,
          status: plan?.status,
          ranges: formattedPlans
        };

        if (plan) {
          // For updating an existing plan
          const response = await axios.put(`https://ilipaone.com/api/revenue-plans/${plan.id}`, payload);
          if (response.status === 200) {
            toast.success('Plans updated successfully.');
            onSave();
          } else {
            toast.error('Failed to update plans.');
          }
        } else {
          toast.error('Failed to submit plans.');
        }
      } catch (error) {
        if (error.name === 'ValidationError') {
          error.inner.forEach(err => toast.error(err.message));
        } else {
          console.error('Error submitting plans:', error);
          toast.error('Error submitting plans.');
        }
      }
    }
  });

  const handleEditPlan = () => {
    const lastPlan = formik.values.plans[formik.values.plans.length - 1];
    if (lastPlan.min_value && lastPlan.max_value && parseFloat(lastPlan.max_value) <= parseFloat(lastPlan.min_value)) {
      toast.error('Max Value must be greater than Min Value.');
      return;
    }
    formik.setFieldValue('plans', [
      ...formik.values.plans,
      {
        min_value: (parseFloat(lastPlan.max_value) + 0.01).toFixed(2),
        max_value: '',
        amount: ''
      }
    ]);
  };

  return (
    <FormikProvider value={formik}>
      <Box mt={2} p={2} border={1} borderColor="grey.400" borderRadius={4} width={1}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8}>
            <TextField
              label="Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              fullWidth
              variant="outlined"
              size="small"
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
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
            />
          </Grid>
          <Grid item xs={12} sm={4} display="flex" alignItems="center">
            <IconButton color="primary" onClick={handleEditPlan} size="small">
              <Add />
            </IconButton>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControlLabel
              control={<Checkbox
                checked={formik.values.noMaxValue}
                onChange={(e) => formik.setFieldValue('noMaxValue', e.target.checked)}
              />}
              label="Do not require max value for last row"
              disabled={formik.values.plans.length <= 2}
            />
          </Grid>
        </Grid>
        <Box mt={2}>
          <FieldArray name="plans">
            {({ push, remove }) => (
              formik.values.plans.map((plan, index) => (
                <Grid container spacing={1} key={index} sx={{ paddingTop: '2%' }}>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Min Value"
                      name={`plans.${index}.min_value`}
                      value={plan.min_value}
                      onChange={formik.handleChange}
                      fullWidth
                      variant="outlined"
                      size="small"
                      type='number'
                      error={formik.touched.plans?.[index]?.min_value && Boolean(formik.errors.plans?.[index]?.min_value)}
                      helperText={formik.touched.plans?.[index]?.min_value && formik.errors.plans?.[index]?.min_value}
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
                      disabled={index !== formik.values.plans.length + 1}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Max Value"
                      name={`plans.${index}.max_value`}
                      value={plan.max_value}
                      onChange={formik.handleChange}
                      fullWidth
                      variant="outlined"
                      size="small"
                      type='number'
                      error={formik.touched.plans?.[index]?.max_value && Boolean(formik.errors.plans?.[index]?.max_value)}
                      helperText={formik.touched.plans?.[index]?.max_value && formik.errors.plans?.[index]?.max_value}
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
                      disabled={index !== formik.values.plans.length - 1 || formik.values.noMaxValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      label="Amount"
                      name={`plans.${index}.amount`}
                      value={plan.amount}
                      onChange={formik.handleChange}
                      fullWidth
                      variant="outlined"
                      size="small"
                      type='number'
                      error={formik.touched.plans?.[index]?.amount && Boolean(formik.errors.plans?.[index]?.amount)}
                      helperText={formik.touched.plans?.[index]?.amount && formik.errors.plans?.[index]?.amount}
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
                      disabled={index !== formik.values.plans.length - 1}
                    />
                  </Grid>
                  <Grid item xs={12} sm={1} display="flex" justifyContent="center" alignItems="center">
                    {index !== 0 && (
                      <IconButton
                        color="secondary"
                        onClick={() => {
                          if (index === formik.values.plans.length - 1) {
                            if (formik.values.plans.length > 1) {
                              formik.setFieldValue('plans', formik.values.plans.filter((_, i) => i !== index));
                            } else {
                              toast.error('At least 1 plan must be present.');
                            }
                          } else {
                            toast.error('You cannot delete previous rows.');
                          }
                        }}
                        size="small"
                        disabled={index !== formik.values.plans.length - 1}
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              ))
            )}
          </FieldArray>
        </Box>
        <Box mt={2}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#06163A',
              borderRadius: '25px',
              '&:hover': { backgroundColor: '#06163A' },
              width: '200px',
            }}
            onClick={() => formik.submitForm()}
            disabled={formik.values.plans.length < 3} // Disable submit if fewer than 3 plans
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
    </FormikProvider>
  );
};

export default EditPlan;
