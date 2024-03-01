import React  from 'react';
import { AppBar, Tabs, Tab, Box, Button } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <AppBar position="fixed" style={{ width: '100%', backgroundColor: "#2196f3",height:"60px" }}>
      <Tabs centered>
        <Tab label="User Profile" component={Link} to="/homepage/profile" />
        <Tab label="Nearest Users" component={Link} to="/homepage/nearest-users" />
        <Tab label="Dashboard" component={Link} to="/homepage/dashboard" />
        <Tab label="BasicEditor" component={Link} to="/homepage/BasicEditor" />
        <Box style={{ display: "flex", justifyContent: "flex-end", marginLeft: "50px" }}>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Box>
      </Tabs>
    </AppBar>
     

    
  );
};

export default NavBar;
