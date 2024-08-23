import React, { useState } from 'react';
import { CssBaseline, Box, Drawer, AppBar, Toolbar, Typography, IconButton, Container, Grid, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import logo from "../../assets/logo.svg";
import { Outlet } from 'react-router-dom';
import Dashboard from '../Home/Dashboard';
import LogoutDialog from '../auth/LogoutDialoge';
import UpdatePassword from '../auth/UpdatePassword'; 

const drawerWidth = 190;

const Layout = () => {
  const navigate = useNavigate();
  const [logoutDialogVisible, setLogoutDialogVisible] = useState(false);
  const [updatePasswordDialogVisible, setUpdatePasswordDialogVisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    setLogoutDialogVisible(true);
  };

  const confirmLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
    setLogoutDialogVisible(false);
  };

  const cancelLogout = () => {
    setLogoutDialogVisible(false);
  };

  const handleChangePassword = () => {
    setUpdatePasswordDialogVisible(true);
    handleMenuClose(); 
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoClick = () => {
    navigate('/dashboard'); // Ensure correct path here
  };
  const handleNavigation = (view) => {
    navigate(`/${view.toLowerCase().replace(' ', '-')}`);
  };
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <Drawer 
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box',
             backgroundColor: '#06163A', 
             color: '#fff',
             borderRightColor: '#fff' },
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 3, minHeight: '25px' }}>
            <img 
              src={logo} 
              alt="Logo" 
              style={{ 
                width: '100%', 
                height: '64px', marginTop: '-13%',
                paddingLeft: '5px',
                cursor: 'pointer', backgroundColor: '#fff'
              }} 
              onClick={handleLogoClick} 
            />
          </Box>
          <Dashboard handleNavigation={handleNavigation} />
        </Box>
      </Drawer>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100vh', overflow: 'auto' }}>
        <AppBar
          position="sticky" 
          sx={{
            backgroundColor: '#fff', 
            color: '#000',
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              {/* Title or additional elements here */}
            </Typography>
            <IconButton onClick={handleMenuClick}>
              <PersonSharpIcon style={{width:'110%'}}/>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                style: {
                  maxHeight: 48 * 4.5,
                  width: '20ch',
                },
              }}
            ><MenuItem onClick={handleChangePassword} style={{fontSize:'12px'}}>
                Change Password
              </MenuItem>
              <MenuItem onClick={handleLogout} style={{fontSize:'12px'}}>
                Logout
              </MenuItem>
              
            </Menu>
          </Toolbar>
        </AppBar>
        <Grid container sx={{ flexGrow: 1, p: 3 }}>
          <Grid item xs={12}>
            <Container>
              <Outlet />
            </Container>
          </Grid>
        </Grid>
      </Box>

      <LogoutDialog 
        visible={logoutDialogVisible} 
        onConfirm={confirmLogout} 
        onCancel={cancelLogout} 
      />
      <UpdatePassword
        visible={updatePasswordDialogVisible}
        onHide={() => setUpdatePasswordDialogVisible(false)}
      />
    </Box>
  );
};

export default Layout;
