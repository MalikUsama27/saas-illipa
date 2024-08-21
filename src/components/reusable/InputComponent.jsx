import React from 'react';
import { TextField, InputAdornment, IconButton, MenuItem } from '@mui/material';
import { useField } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../../css/InputComponent.css';

const InputComponent = ({ label, name, type = 'text', options = [], isPassword = false, showPassword, setShowPassword, ...props }) => {
  const [field, meta] = useField(name);

  const handleClickShowPassword = () => {
    if (setShowPassword) {
      setShowPassword(prev => !prev);
    }
  };

  return (
    <TextField
      label={label}
      name={name}
      type={isPassword ? (showPassword ? 'text' : 'password') : type}
      fullWidth
      variant="outlined"
      size="small"
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      select={options.length > 0}
      InputProps={{
        endAdornment: isPassword ? (
          <InputAdornment position="end" className="end-adornment">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ) : null,
        classes: {
          root: 'input-field',
          notchedOutline: 'input-outline',
        }
      }}
      InputLabelProps={{ className: 'input-label' }}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default InputComponent;
