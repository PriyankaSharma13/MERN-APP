import React, { useState } from 'react';
import { TextField, Button, Box, Container, Typography, makeStyles } from '@material-ui/core';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";

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
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(/^[^\s\t]+$/, 'Email must not contain spaces')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .matches(/^[^\s\t]+$/,'Password must not contain spaces')
        .required('Password is required'),
    }),

    onSubmit: async (values) => {
      const apiUrl = 'http://localhost:8000/login';

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Login successful', data);
          localStorage.setItem('token', data?.token);
          localStorage.setItem('email', data?.email);
          navigate('/homepage/profile');
        } else {
          const errorData = await response.json();
          setLoginError(errorData?.message);
          console.error('Login failed:', errorData?.message);
        }
      } catch (error) {
        console.error('Error occurred during login:', error);
        setLoginError('An unexpected error occurred. Please try again.');
      }
    }
  });

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Box className={classes.formContainer}>
        <Typography variant="h4" align='center'>Login</Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            margin="normal"
            required
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            margin="normal"
            required
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          {loginError && <Typography variant="body1" color="error">{loginError}</Typography>}
          <Link to="/forgotpassword" style={{ color: "#2196f3", marginTop: '8px', display: 'block', textAlign: 'right' }}>
      Forgot Password?
    </Link>
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
          <Link to="/register" style={{ color: "#2196f3" }}>
            Register
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
