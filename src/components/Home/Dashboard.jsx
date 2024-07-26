// import React from 'react';
// import { CssBaseline, Box, Drawer, AppBar, Toolbar, Typography, IconButton, Container, List, ListItem, ListItemIcon, ListItemText, Grid } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import LogoutIcon from '@mui/icons-material/Logout';
// import logo from "../../assets/logo.png";
// import { Outlet } from 'react-router-dom';

// const drawerWidth = 240;
// const Dashboard = () => {
//   const [currentView, setCurrentView] = useState('Modules');

//   const renderContent = () => {
//     switch (currentView) {
//       case 'Customers':
//         return <UserForm handleClose={() => setCurrentView('Modules')} />;
//       case 'Revenue Plan':
//         return <RevenuePlan />;
//       case 'Add User':
//         return <Users />;
//       case 'Modules':
//       default:
//         return <Modules />;
//     }
//   };

//   return (
//     <div currentView={currentView} setCurrentView={setCurrentView}>
//       {renderContent()}
//     </div>
//   );
// };

// export default Dashboard;

