import React, { useState } from 'react';
import { TextField, Button, Box, Container, Typography, makeStyles } from '@material-ui/core';
import { useNavigate, Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(20),
    padding: "20px",
    maxWidth: '580px'
  },
  formContainer: {
    border: "2px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    background: "#fff",
  },

  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submitButton: {
    marginTop: theme.spacing(2),
    background: "#2196f3",
    color: "#fff",
    '&:hover': {
      background: "#1565c0",
    },
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = 'http://localhost:8000/login';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful', data);
        localStorage.setItem('token', data?.token)
        localStorage.setItem('email', data?.email);
        history('/homepage/profile');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Box className={classes.formContainer}>
        <Typography variant="h4" align='center'>Login</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            className={classes.submitButton}
          >
            Login
          </Button>
        </form>
        <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
          Don't have an account?{' '}
          <Link to="/register" color="primary">
            Register
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
