import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Helmet } from 'react-helmet';

const Dashboard = ({ handleNavigation }) => {
  const [title, setTitle] = React.useState('Dashboard');

  const handleClick = (view, title) => {
    setTitle(title); 
    handleNavigation(view);
  };

  return (
    <div>
      <Helmet>
        <title>Ilipa - {title}</title>
      </Helmet>
      <List>
        <ListItem button onClick={() => handleClick('modules', 'Modules')}>
          <ListItemIcon sx={{ minWidth: '30px', mr: 1 }}>
            <DashboardIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Modules" />
        </ListItem>
        <ListItem button onClick={() => handleClick('customers', 'Customers')}>
          <ListItemIcon sx={{ minWidth: '30px', mr: 1 }}>
            <AccountCircleIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItem>
        <ListItem button onClick={() => handleClick('revenue-plan', 'Revenue Plan')}>
          <ListItemIcon sx={{ minWidth: '30px', mr: 1 }}>
            <NotificationsIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Revenue Plan" />
        </ListItem>
        <ListItem button onClick={() => handleClick('users', 'Users')}>
          <ListItemIcon sx={{ minWidth: '30px', mr: 1 }}>
            <AccountCircleIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
      </List>
    </div>
  );
};

export default Dashboard;
