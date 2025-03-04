import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, makeStyles,Box } from '@material-ui/core';
import NavBar from '../common/Navigation';


const useStyles = makeStyles((theme) => ({
  formContainer: {
      marginTop: theme.spacing(10),
      padding: theme.spacing(4),
      border: "2px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      background: "#fff",
  },
})
)
const FindNearestUsers = () => {
  const classes = useStyles();
  const [nearestUsers, setNearestUsers] = useState([]);
  useEffect(() => {
    const fetchNearestUsers = async () => {
      try {
        const userZipCode = localStorage.getItem('userData')
        const email = localStorage.getItem('email')
        const apiUrl = 'http://localhost:8000/find-nearest-users';
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ zipcode: userZipCode }),
        });

        if (response.ok) {
          const data = await response.json();
          const nearData = data?.filter(item => item?.email !== email)
          setNearestUsers(nearData);
        } else {
          console.error('Failed to fetch nearest users');
        }
      } catch (error) {
        console.error('Error fetching nearest users:', error);
      }
    };

    fetchNearestUsers();
  }, []);
  return (
    <Container maxWidth="sm">
      <NavBar/>
       <Box className={classes.formContainer}>
      <Typography variant="h4">Nearest Users</Typography>
      <List>
        {nearestUsers.map((user, index) => (
          <ListItem key={index}>
            <ListItemText primary={user.name} secondary={`Email: ${user.email}, Phone: ${user.phone}`} />
          </ListItem>
        ))}
      </List>
      </Box>
    </Container>
  );
};

export default FindNearestUsers;
