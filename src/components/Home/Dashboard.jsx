import React, { useState } from 'react';
import { CssBaseline, Box, Drawer, AppBar, Toolbar, Typography, IconButton, Container, List, ListItem, ListItemIcon, ListItemText, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import UserForm from './UserForm';
import Modules from './Modules';
import logo from "../../assets/logo.png"
import RevenuePlan from './RevenuePlan';

const drawerWidth = 240;

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('Modules');

  const renderContent = () => {
    switch (currentView) {
      case 'Customer':
        return (
          <>
            <Typography variant="h5" component="div">
            {/* Customer */}
            </Typography>
            <UserForm handleClose={() => setCurrentView('Modules')} />
          </>
        );
      case 'Revenue Plan':
        return (
          <Container>
            <RevenuePlan />
          </Container>
        );
      case 'Modules':
      default:
        return <Modules />;
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#44AEF5', color: 'black' },
        }}
      >
        <Toolbar />
        <Box sx={{  }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              <img src={logo} alt="Logo" style={{ width: '80%' ,marginTop:'-26%' , }} />
            </Box>
            <List>
      <ListItem button onClick={() => setCurrentView('Modules')}>
        <ListItemIcon sx={{ minWidth: '30px', mr: 1 }}>
          <DashboardIcon sx={{ color: '#fff' }} />
        </ListItemIcon>
        <ListItemText primary="Modules" />
      </ListItem>
      <ListItem button onClick={() => setCurrentView('Customer')}>
        <ListItemIcon sx={{ minWidth: '30px', mr: 1 }}>
          <AccountCircleIcon sx={{ color: '#fff' }} />
        </ListItemIcon>
        <ListItemText primary="Customer" />
      </ListItem>
      <ListItem button onClick={() => setCurrentView('Revenue Plan')}>
        <ListItemIcon sx={{ minWidth: '30px', mr: 1 }}>
          <NotificationsIcon sx={{ color: '#fff' }} />
        </ListItemIcon>
        <ListItemText primary="Revenue Plan" />
      </ListItem>
    </List>
        </Box>
      </Drawer>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100vh', overflow: 'auto' }}>
        <AppBar position="relative" sx={{ backgroundColor: '#fff', color: '#000' }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, marginRight: 70 }}>
              {currentView}
            </Typography>
            <IconButton color="inherit">
              <LogoutIcon />
              <Typography sx={{ marginLeft: 2 }}>
                Logout
              </Typography>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Grid container sx={{ flexGrow: 1, p: 3 }}>
          <Grid item xs={12}>
            <Container>
              {renderContent()}
            </Container>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
