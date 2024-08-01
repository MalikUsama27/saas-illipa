import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useField } from 'formik';

const CheckboxComponent = ({ label, name, ...props }) => {
  const [field, meta, helpers] = useField({ name, type: 'checkbox' });

  return (
    <FormControlLabel
      control={<Checkbox {...field} {...props} />}
      label={<span style={{ fontSize: '12px', fontFamily: 'Open Sans' }}>{label}</span>}
      sx={{
        '& .MuiFormControlLabel-label': {
          fontSize: '12px',
          fontFamily: 'Open Sans',
        },
      }}
    />
  );
};

export default CheckboxComponent;
