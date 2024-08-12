import React, {  useState } from 'react';
// import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import { Helmet } from 'react-helmet';
// import { useNavigate } from 'react-router-dom';

// Define the permissions and their corresponding keys
// const availablePermissions = [
//   { label: 'Add Users', key: 'add_users' },
//   { label: 'View Payments', key: 'view_payments' },
//   { label: 'Make Premium Modules', key: 'make_premium_modules' },
//   { label: 'all', key: 'view_all' }
// ];

const Dashboard = ({ handleNavigation }) => {
  const [title] = useState('Dashboard');
  // const [ setPermissions] = useState([]);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // Retrieve permissions from localStorage
  //   const storedPermissions = localStorage.getItem('permissions');
  //   if (storedPermissions) {
  //     const permissionsArray = storedPermissions
  //       .split(',')
  //       .map(label => label.trim()) 
  //       .map(label => availablePermissions.find(p => p.label === label)?.key)
  //       .filter(Boolean);

  //     console.log('Permissions:', permissionsArray); 
  //     setPermissions(permissionsArray);
  //     if (!permissionsArray.includes('view_all')) {
  //       navigate('/dashboard/users');
  //     }
  //   }
  // }, [navigate]);


  // const handleClick = (view, title) => {
  //   setTitle(title);
  //   handleNavigation(view);
  // };


  // const hasViewAll = permissions.includes('view_all');

  return (
    <div>
      <Helmet>
        <title>Ilipa - {title}</title>
      </Helmet>
      {/* <List>
        {hasViewAll ? (
          <>
           
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
          </>
        ) : (
          <>
        
            {permissions.includes('view_payments') && (
              <ListItem button onClick={() => handleClick('customers', 'Customers')}>
                <ListItemIcon sx={{ minWidth: '30px', mr: 1 }}>
                  <AccountCircleIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText primary="Customers" />
              </ListItem>
            )}
            {permissions.includes('add_users') && (
              <ListItem button onClick={() => handleClick('users', 'Users')}>
                <ListItemIcon sx={{ minWidth: '30px', mr: 1 }}>
                  <AccountCircleIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
            )}
          </>
        )}
      </List> */}
    </div>
  );
};

export default Dashboard;
