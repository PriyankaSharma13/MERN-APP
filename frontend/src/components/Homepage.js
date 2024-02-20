import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Typography, Box, Container } from '@material-ui/core';
import { Link, Outlet } from 'react-router-dom';

const Homepage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="User Profile" component={Link} to="/homepage/profile" />
          <Tab label="Nearest Users" component={Link} to="/homepage/nearest-users" />
        </Tabs>
      </AppBar>
      <Box mt={3}>
        <Outlet />
      </Box>
    </Container>
  );
};

export default Homepage;
