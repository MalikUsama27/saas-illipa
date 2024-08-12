import React from 'react';
import { CssBaseline, Box, Drawer, AppBar, Toolbar, Typography, IconButton, Container, List, ListItem, ListItemIcon, ListItemText, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from "../../assets/logo.svg";
import { Outlet } from 'react-router-dom';
import Dashboard from '../Home/Dashboard'; 

const drawerWidth = 240;

const Layout = ({ title }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  const handleNavigation = (view) => {
    navigate(`/dashboard/${view.toLowerCase().replace(' ', '-')}`);
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
             backgroundColor: '#06163A ', 
             color: '#fff' ,borderRightColor:'#fff'},
        }}
      >
        <Toolbar />
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 ,minHeight:'25px' ,}}>
            <img className='img-fluid' src={logo} alt="Logo" style={{ width: '100%', marginTop: '-37%', backgroundColor:'#fff',height:'64px' ,padding:'7px',borderRightColor:'#fff' }} />
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
        zIndex: (theme) => theme.zIndex.drawer + 1, 
      }}
    >
          <Toolbar>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              {/* {title} */}
            </Typography>
            <IconButton onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
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
    </Box>
  );
};

export default Layout;
