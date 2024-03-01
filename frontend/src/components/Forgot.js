import { Box, Button, Container, TextField, Typography, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
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
      padding: "25px",
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



 
const Forgot = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [Error, setError] = useState(null);

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
        }),
      })





  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Box className={classes.formContainer}>
        <Typography variant="h4" align='center'>Reset your Password</Typography>
        <Typography variant='body1' style={ {marginTop: '16px'}}>Please enter the email address you'd like your password reset information sent to</Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            label="Enter email address"
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
          
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            className={classes.submitButton}
          >
           Reset Password
          </Button>
        </form>
        <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
  <Link to="/login" style={{ color: "#2196f3" }}>
    Back to Login
  </Link>
</Typography>
       
      </Box>
    </Container>
  )
}

export default Forgot
