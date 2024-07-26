import React from 'react';
import { CssBaseline, Box, Drawer, AppBar, Toolbar, Typography, IconButton, Container, List, ListItem, ListItemIcon, ListItemText, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from "../../assets/logo.png";
import { Outlet } from 'react-router-dom';


const drawerWidth = 240;

const Layout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/')
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
                    '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#434191', color: '#fff' },
                }}
            >
                <Toolbar />
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                    <img src={logo} alt="Logo" style={{ width: '80%' ,marginTop:'-26%' , }} />
                    </Box>
                    <List>
                        <ListItem button onClick={() => handleNavigation('modules')}>
                            <ListItemIcon sx={{ minWidth: '30px', mr: 1 }}>
                                <DashboardIcon sx={{ color: '#fff' }} />
                            </ListItemIcon>
                            <ListItemText primary="Modules" />
                        </ListItem>
                        <ListItem button onClick={() => handleNavigation('customers')}>
                            <ListItemIcon sx={{ minWidth: '30px', mr: 1 }}>
                                <AccountCircleIcon sx={{ color: '#fff' }} />
                            </ListItemIcon>
                            <ListItemText primary="Customers" />
                        </ListItem>
                        <ListItem button onClick={() => handleNavigation('revenue-plan')}>
                            <ListItemIcon sx={{ minWidth: '30px', mr: 1 }}>
                                <NotificationsIcon sx={{ color: '#fff' }} />
                            </ListItemIcon>
                            <ListItemText primary="Revenue Plan" />
                        </ListItem>
                        <ListItem button onClick={() => handleNavigation('users')}>
                            <ListItemIcon sx={{ minWidth: '30px', mr: 1 }}>
                                <AccountCircleIcon sx={{ color: '#fff' }} />
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100vh', overflow: 'auto' }}>
                <AppBar position="relative" sx={{ backgroundColor: '#fff', color: '#000' }}>
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
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
