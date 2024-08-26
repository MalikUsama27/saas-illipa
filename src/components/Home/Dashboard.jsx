import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

const availablePermissions = [
  { label: 'View Users', key: 'view_users' },
  { label: 'View Customers', key: 'view_payments' },
  { label: 'View Modules', key: 'view_modules' },
  { label: 'View Plans', key: 'view_plans' },
  { label: 'all', key: 'view_all' }
];

const Dashboard = ({ handleNavigation }) => {
  const [title, setTitle] = useState('Dashboard');
  const [permissions, setPermissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPermissions = localStorage.getItem('permissions');
    if (storedPermissions) {
      const permissionsArray = storedPermissions
        .split(',')
        .map(label => label.trim())
        .map(label => availablePermissions.find(p => p.label === label)?.key)
        .filter(Boolean);

      setPermissions(permissionsArray);
    }
  }, []);

  const handleClick = (view, title) => {
    setTitle(title);
    handleNavigation(view);
    navigate(`/${view.toLowerCase().replace(' ', '-')}`);
  };

  const hasViewAll = permissions.includes('view_all');

  return (
    <div>
      <Helmet>
        <title>Ilipa - {title}</title>
      </Helmet>
      <List>
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
                <AttachMoneyIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Revenue Plan" />
            </ListItem>
            <ListItem button onClick={() => handleClick('users', 'Users')}>
              <ListItemIcon sx={{ minWidth: '30px', mr: 1 }}>
                <PeopleIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
          </>
        ) : (
          <>
            {permissions.includes('view_modules') && (
              <ListItem button onClick={() => handleClick('modules', 'Modules')}>
                <ListItemIcon sx={{ minWidth: '30px', mr: 1 }}>
                  <DashboardIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText primary="Modules" />
              </ListItem>
            )}
             {permissions.includes('view_plans') && (
              <ListItem button onClick={() => handleClick('revenue-plan', 'Revenue Plan')}>
                <ListItemIcon sx={{ minWidth: '30px', mr: 1 }}>
                  <AttachMoneyIcon sx={{ color: '#fff' }} />      
                          </ListItemIcon>
                <ListItemText primary="Revenue Plan" />
              </ListItem>
            )}
            {permissions.includes('view_payments') && (
              <ListItem button onClick={() => handleClick('customers', 'Customers')}>
                <ListItemIcon sx={{ minWidth: '30px', mr: 1 }}>
                  <AccountCircleIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText primary="Customers" />
              </ListItem>
            )}
            {permissions.includes('view_users') && (
              <ListItem button onClick={() => handleClick('users', 'Users')}>
                <ListItemIcon sx={{ minWidth: '30px', mr: 1 }}>
                  <AccountCircleIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
            )}
          </>
        )}
      </List>
    </div>
  );
};

export default Dashboard;
