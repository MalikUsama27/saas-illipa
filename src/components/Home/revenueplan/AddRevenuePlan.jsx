import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, IconButton, Grid, Box, Button, InputAdornment, Checkbox, FormControlLabel } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../css/AddRevenuePlan.css';

// Validation Schema
const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  plans: Yup.array().of(
    Yup.object().shape({
      min_value: Yup.number().required('Min value is required').min(0, 'Min value cannot be less than 0'),
      max_value: Yup.number()
        .when('noMaxValue', {
          is: false,
          then: Yup.number().required('Max value is required').moreThan(Yup.ref('min_value'), 'Max value must be greater than min value'),
        }),
      amount: Yup.number().required('Amount is required').integer('Amount must be an integer'),
    })
  ).min(3, 'You must have at least 3 plans')
});

const InputField = ({ label, name, currency, ...props }) => (
  <Field name={name}>
    {({ field, meta }) => (
      <TextField
        {...field}
        label={label}
        fullWidth
        variant="outlined"
        size="small"
        type={name === 'title' ? 'text' : 'number'}
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
        error={Boolean(meta.touched && meta.error)}
        helperText={meta.touched && meta.error ? meta.error : ''}
      />
    )}
  </Field>
);

const AddRevenuePlan = ({ onClose }) => {
  return (
    <Formik
      initialValues={{
        title: '',
        plans: [{ min_value: '0.00', max_value: '', amount: '' }],
        noMaxValue: false
      }}
      validationSchema={validationSchema}
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const lastPlan = values.plans[values.plans.length - 1];
          if (lastPlan.max_value && lastPlan.min_value && parseFloat(lastPlan.max_value) <= parseFloat(lastPlan.min_value)) {
            toast.error('Max Value must be greater than Min Value.');
            return;
          }
          if (lastPlan.min_value && (values.noMaxValue || lastPlan.max_value) && (values.noMaxValue || parseFloat(lastPlan.max_value) > parseFloat(lastPlan.min_value)) && lastPlan.amount) {
            if (values.plans.some((plan, index) => index < values.plans.length - 1 && (!plan.max_value || !plan.amount))) {
              toast.error('Please complete all fields in previous plans.');
              return;
            }

            const formattedPlans = values.plans.map(({ min_value, max_value, amount }, index) => ({
              min_value: parseFloat(min_value).toFixed(2),
              max_value: (index === values.plans.length - 1 && values.noMaxValue) ? '100000000000.00' : parseFloat(max_value).toFixed(2),
              prize: parseFloat(amount).toFixed(0),
              ...(index === values.plans.length - 1 && values.noMaxValue ? { max_value_status: true } : {})
            }));

            const payload = {
              title: values.title,
              status: false,
              ranges: formattedPlans
            };

            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/revenue-plans`, payload);
            if (response.status === 201) {
              toast.success('Plans submitted successfully.');
              onClose();
            } else {
              toast.error('Failed to submit plans.');
            }
          } else {
            toast.error('Please complete the last plan correctly before submitting.');
          }
        } catch (error) {
          console.error('Error submitting plans:', error);
          toast.error('An error occurred while submitting the plans.');
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, setFieldValue, handleSubmit, isValid, dirty }) => (
        <Form onSubmit={handleSubmit}>
          <Box mt={2} p={2} border={1} borderColor="grey.400" borderRadius={4} width={1} className="container-box">
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={8} sm={8}>
                <InputField
                  label="Title"
                  name="title"
                />
              </Grid>
              <Grid item xs={2} sm={1} display="flex" justifyContent="center" alignItems="center">
                <IconButton
                  color="primary"
                  type="button"
                  onClick={() => {
                    const lastPlan = values.plans[values.plans.length - 1];

                    if (lastPlan.max_value && lastPlan.min_value && parseFloat(lastPlan.max_value) <= parseFloat(lastPlan.min_value)) {
                      toast.error('Max Value must be greater than Min Value.');
                      return;
                    }
                    if (parseFloat(lastPlan.min_value) >= 0 && (values.noMaxValue || parseFloat(lastPlan.max_value)) && (values.noMaxValue || parseFloat(lastPlan.max_value) > parseFloat(lastPlan.min_value)) && lastPlan.amount) {
                      // Add new plan with incremented min_value
                      const newMinValue = (parseFloat(lastPlan.max_value) + 0.01).toFixed(2);
                      setFieldValue('plans', [...values.plans, { min_value: newMinValue, max_value: '', amount: '' }]);
                    } else {
                      toast.error('Please complete the current plan correctly before adding a new one.');
                    }
                  }}
                  className="add-button"
                  disabled={values.noMaxValue}
                >
                  <Add />
                </IconButton>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControlLabel
                  control={<Checkbox checked={values.noMaxValue} onChange={(e) => setFieldValue('noMaxValue', e.target.checked)} />}
                  label="Do not require max value for last row"
                  disabled={values.plans.length <= 2}
                  className="checkbox-label"
                />
              </Grid>
            </Grid>
            <Box mt={2}>
              {values.plans.map((plan, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Grid container spacing={1} style={{ paddingTop: '2%' }}>
                    <Grid item xs={12} sm={3}>
                      <InputField
                        label="Min Value"
                        name={`plans.${index}.min_value`}
                        value={plan.min_value}
                        onChange={(e) => setFieldValue(`plans.${index}.min_value`, e.target.value)}
                        currency
                        disabled={index !== values.plans.length + 1}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <InputField
                        label="Max Value"
                        name={`plans.${index}.max_value`}
                        value={plan.max_value}
                        onChange={(e) => setFieldValue(`plans.${index}.max_value`, e.target.value)}
                        currency
                        disabled={index !== values.plans.length - 1 || values.noMaxValue}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <InputField
                        label="Amount"
                        name={`plans.${index}.amount`}
                        value={plan.amount}
                        onChange={(e) => setFieldValue(`plans.${index}.amount`, e.target.value)}
                        currency
                        disabled={index !== values.plans.length - 1}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                      />
                    </Grid>
                    <Grid item xs={12} sm={1} display="flex" justifyContent="center" alignItems="center">
                      {index !== 0 && (
                        <IconButton
                          color="secondary"
                          onClick={() => {
                            if (index === values.plans.length - 1) {
                              if (values.plans.length > 1) {
                                setFieldValue('plans', values.plans.filter((_, i) => i !== index));
                              } else {
                                toast.error('At least 1 plan must be present.');
                              }
                            } else {
                              toast.error('You cannot delete previous rows.');
                            }
                          }}
                          size="small"
                          className="delete-button"
                          disabled={index !== values.plans.length - 1 ||  values.noMaxValue}
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Box>
            <Button
              variant="contained"
              // className="submit-button"
              sx={{
                backgroundColor: '#06163A',
                borderRadius: '25px',
                '&:hover': { backgroundColor: '#06163A' },
                width: '200px',
              }}
              type="submit"
              disabled={!isValid || !dirty || values.plans.length < 3 || !values.title}
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
        </Form>
      )}
    </Formik>
  );
};

export default AddRevenuePlan;
