import React from 'react';
import { TextField, InputAdornment, IconButton, MenuItem } from '@mui/material';
import { useField } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const InputComponent = ({ label, name, type = 'text', options = [], isPassword = false, showPassword, setShowPassword, ...props }) => {
  const [field, meta] = useField(name);

  // Handle password visibility toggle
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
      InputProps={isPassword ? {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      } : {}}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '25px',
          fontSize: '12px',
          fontFamily: 'Open Sans',
          height: '40px',
          '& input': {
            padding: '10px',
          },
        },
        '& .MuiInputLabel-root': {
          fontSize: '12px',
          fontFamily: 'Open Sans',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderRadius: '25px',
        },
      }}
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
