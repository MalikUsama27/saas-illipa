import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Grid, Box, Typography } from '@mui/material';

const AddUser = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    permissions: {
      viewPayments: false,
      addUsers: false,
      makePremiumModules: false,
    },
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setUser((prev) => ({
        ...prev,
        permissions: { ...prev.permissions, [name]: checked },
      }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    console.log('User Data:', user);
    // Add logic to submit the form data
  };

  return (
    <Box p={3} border={1} borderColor="grey.400" borderRadius={4} width={1}>
      {/* <Typography variant="h6">Add User</Typography> */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={user.name}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" size="small" required>
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                name="role"
                value={user.role}
                onChange={handleChange}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Permissions</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={user.permissions.viewPayments}
                  onChange={handleChange}
                  name="viewPayments"
                />
              }
              label="View Payments"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={user.permissions.addUsers}
                  onChange={handleChange}
                  name="addUsers"
                />
              }
              label="Add Users"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={user.permissions.makePremiumModules}
                  onChange={handleChange}
                  name="makePremiumModules"
                />
              }
              label="Make Premium Modules"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Password"
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={user.confirmPassword}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add User
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddUser;