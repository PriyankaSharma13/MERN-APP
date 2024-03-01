import { Box, Container } from '@material-ui/core'
import React from 'react'
import NavBar from '../common/Navigation'
import { Outlet } from 'react-router-dom'

const Homepage = () => {
  return (
    <Container>
      <NavBar />
      <Box mt={3}>
        <Outlet/>
      </Box>
    </Container>
  )
}

export default Homepage
