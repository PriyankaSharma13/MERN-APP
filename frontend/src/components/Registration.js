import React from 'react';
import { TextField, Button,Box, Container, Typography, Grid, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(10),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "#2196f3", 
    color: "#fff",
    '&:hover': {
      background: "#1565c0", 
    },
  },
  input: {
    display: 'none',
  },

}));

const Registration = () => {
  const classes = useStyles();
  const history = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      zipcode: '',
      profilepic: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
      phone: Yup.string().matches(/^[0-9]+$/, 'Phone number must contain only numbers').required('Phone is required'),
      zipcode: Yup.string().matches(/^[0-9]+$/, 'Zip Code must contain only numbers').required('Zip Code is required'),
      profilepic: Yup.mixed(),
    }),
    onSubmit: async (values) => {
      const apiUrl = 'http://localhost:8000/register';

      try {
        const formDatas = new FormData();
        formDatas.append('name', values.name);
        formDatas.append('email', values.email);
        formDatas.append('password', values.password);
        formDatas.append('phone', values.phone);
        formDatas.append('zipcode', values.zipcode);
        formDatas.append('profilepic', values.profilepic);
        const response = await fetch(apiUrl, {
          method: 'POST',
          body: formDatas,
        });

        if (response.ok) {
          formik.resetForm();
          formik.setSubmitting(false);
          history('/');
        } else {
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error occurred during registration:', error);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Box className={classes.formContainer}>
      <Typography variant="h4" align="center">
        Registration
      </Typography>
      
      <form className={classes.form} onSubmit={formik.handleSubmit}> 
      <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
                label="Name"
                fullWidth
                variant="outlined"
                required
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
          <Grid item xs={12}>
          <TextField
                label="Email"
                fullWidth
                variant="outlined"
                required
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
          </Grid>
          <Grid item xs={12}>
          <TextField
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                required
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
          </Grid>
          <Grid item xs={12}>
          <TextField
                label="Phone"
                fullWidth
                variant="outlined"
                required
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
          </Grid>
          <Grid item xs={12}>
          <TextField
                label="Zip Code"
                fullWidth
                variant="outlined"
                required
                name="zipcode"
                value={formik.values.zipcode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
                helperText={formik.touched.zipcode && formik.errors.zipcode}
              />
            
          </Grid>
          <Grid item xs={12}>
            <input
                accept="image/*"
                id="profile-pic-upload"
                type="file"
                className={classes.input}
                onChange={(e) => formik.setFieldValue('profilepic', e.target.files[0])}
                name="profilepic"
              />
            <label htmlFor="profile-pic-upload">
              <Button
                variant="contained"
                component="span"
                className={classes.submit}
              >
                Upload Profile Picture
              </Button>
            </label>
            {formik.values.profilepic && (
                <div style={{ marginTop: '10px' }}>
                  <img
                    src={URL.createObjectURL(formik.values.profilepic)}
                    alt="Profile Preview"
                    style={{ maxWidth: '100%', maxHeight: '100px', marginTop: '10px' }}
                  />
                </div>
              )}
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
           style={{ background: "#2196f3", color: "#fff", marginTop: '20px' }}
        >
          Register
        </Button>
      </form>
      
      </Box>
    </Container>
  );
};

export default Registration;
