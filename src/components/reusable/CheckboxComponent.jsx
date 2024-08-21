import React from 'react';
import { Field } from 'formik';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

const CheckboxComponent = ({ label, name, ...props }) => (
  <Field name={name}>
    {({ field, form }) => (
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={field.value}
              onChange={(e) => form.setFieldValue(name, e.target.checked)}
              {...props}
            />
          }
          label={label}
        />
      </FormGroup>
    )}
  </Field>
);

export default CheckboxComponent;
