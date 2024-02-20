import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Container, Typography, makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    formContainer: {
        marginTop: theme.spacing(8),
        padding: theme.spacing(4),
        border: "2px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        background: "#fff",
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop:"10px"
    },
    textField: {
        marginBottom: theme.spacing(2),
    },
    submitButton: {
        marginTop: theme.spacing(2),
    },
}));
const UserProfile = () => {
    const classes = useStyles();
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        password: '',
    });
    useEffect(() => {
        let email = localStorage.getItem('email');
        fetchUserProfile(email);
    }, []);
    const fetchUserProfile = async (email) => {
        try {
            const apiUrl = 'http://localhost:8000/users';
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('userData', data[0]?.zipcode);
                setProfileData(data[0] || {});
            } else {
                console.error('Failed to fetch user profile');
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        const apiUrl = `http://localhost:8000/update-profile/${profileData._id}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData),
            });

            if (response.ok) {
                console.log('Profile updated successfully');
                fetchUserProfile();
            } else {
                console.error('Profile update failed');
            }
        } catch (error) {
            console.error('Error occurred during profile update:', error);
        }
    };

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    return (
        <Container maxWidth="sm" >
            <Box className={classes.formContainer}>
                <Typography variant="h4" align='center'>User Profile</Typography>
                <form className={classes.form} onSubmit={handleUpdateProfile}>
                    <TextField
                        label="Name"
                        fullWidth
                        variant="outlined"
                        className={classes.textField}
                        value={profileData.name || ''}
                        onChange={handleChange}
                        name="name"
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        variant="outlined"
                        className={classes.textField}
                        value={profileData.email}
                        onChange={handleChange}
                        name="email"
                    />
                    {/* Add other input fields */}
                    <Button variant="contained" color="primary" type="submit">
                        Update Profile
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default UserProfile;
