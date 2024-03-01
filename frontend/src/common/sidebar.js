import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Box } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const sidebarContent = [
  { path: 'Account', label: 'Account', icon: <AccountCircleIcon style={{ color: 'white' }} /> },
  { path: 'Dashboard', label: 'Dashboard', icon: <DashboardIcon style={{ color: 'white' }} /> },
//   { path: '/login', label: 'Logout', icon: <ExitToAppIcon style={{ color: 'white' }} /> },
];

const Sidebar = ({onToggleTopbar}) => {

   
  return (
    <aside style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '250px',
        backgroundColor: '#2196f3',
        color: 'white',
        paddingTop: '20px',
        paddingLeft: '20px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* <Box mb={2}>
        <FontAwesomeIcon icon={faBars} style={{ color: 'white', fontSize: "25px" }} onClick={handleMenuIconClick} />
      </Box> */}
  
        <List>
          {sidebarContent.map((sidebarItem, index) => (
            <ListItem button component={Link} to={sidebarItem.path} key={index} style={{ marginBottom: '15px', borderRadius: '8px', transition: 'background 0.3s' }}>
              <ListItemIcon>{sidebarItem.icon}</ListItemIcon>
              <ListItemText primary={sidebarItem.label} style={{ color: 'white' }} />
            </ListItem>
          ))}
        </List>
  
        <Box flexGrow={1} />
        <List>
          <ListItem button component={Link} to="/logout" style={{ marginBottom: '20px', borderRadius: '8px', transition: 'background 0.3s' }}>
            <ListItemIcon><ExitToAppIcon style={{ color: 'white' }} /></ListItemIcon>
            <ListItemText primary="Logout" style={{ color: 'white' }} />
          </ListItem>
        </List>
      </aside>
  );
};

export default Sidebar;