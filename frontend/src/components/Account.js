import React from 'react'
import Layout from './Layout/Layout'
import { Box, Typography } from '@material-ui/core'

const CardDashboard = () => {
  return (
    <Layout>
    <Box style={{ padding: '30px', margin: '25px' }}>
      <Typography variant="h3" component="h2" gutterBottom>Welcome to the Account!</Typography>
      
    </Box>
  </Layout>
  )
}

export default CardDashboard
