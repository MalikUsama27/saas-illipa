import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

const InputComponent = ({ label, name, type = 'text', ...props }) => {
  const [field, meta] = useField(name);

  return (
    <TextField
      label={label}
      name={name}
      type={type}
      fullWidth
      variant="outlined"
      size="small"
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};

export default InputComponent;
