// Dashboard.js
import React from 'react';
import Layout from './Layout/Layout';
import { Box, Typography } from '@material-ui/core';

const Dashboard = () => {
  return (
    <Layout>
      <Box style={{  }}>
      
        <Typography variant="h3" component="h2" gutterBottom>Welcome to the dashboard!</Typography>
        <Typography variant="body1" gutterBottom>
          Dashboard content goes here.
        </Typography>
      </Box>
    </Layout>
  );
};

export default Dashboard;
