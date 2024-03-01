import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Container, Typography, makeStyles, Grid } from '@material-ui/core';
import NavBar from '../common/Navigation';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { date } from 'yup';

const useStyles = makeStyles((theme) => ({
    formContainer: {
        marginTop: theme.spacing(10),
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
        marginTop: "10px"
    },
    textField: {
        marginBottom: theme.spacing(2),
    },
    submitButton: {
        marginTop: theme.spacing(2),
        background: "#2196f3",
        color: "#fff",
        '&:hover': {
            background: "#1565c0",
        },
    },
    successMessage: {
        color: '#50C878',
        marginTop: theme.spacing(2),
    },
    circularImage: {
        width: "100px",
        height: "100px",
        borderRadius: "50%",


    },
    submit: {
        margin: theme.spacing(1, 0, 3),
        background: "#2196f3",
        color: "#fff",
        '&:hover': {
            background: "#1565c0",
        },
    },
}));


const UserProfile = () => {
    const classes = useStyles();
    const [state, setState] = useState(false)
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        password: '',
        zipcode: '',
        image: null,
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
                const { user } = await response.json();
                if (user) {
                    setProfileData(user);
                } else {
                    console.error('User not found');
                }
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

        const formData = new FormData();

        formData.append('name', profileData.name);
        formData.append('phone', profileData.phone);
        formData.append('zipcode', profileData.zipcode);

        if (profileData.image) {
            formData.append('image', profileData.image);
        }

        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                console.log('Profile updated successfully')
                fetchUserProfile(localStorage.getItem('email'));
            } else {
                
                console.error('Profile update failed');
            }
        } catch (error) {
            console.error('Error occurred during profile update:', error);
        }
    };
    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setState(true);
            setProfileData({ ...profileData, image: e.target.files[0] });
        } else {
            setProfileData({ ...profileData, [e.target.name]: e.target.value });
        }
    };

    const showToastMessage = () => {
        toast.success(" Profile updated successfully !")
    };

    return (
        <Container maxWidth="sm" >
            <NavBar />
            <Box className={classes.formContainer}>
                <Typography variant="h4" align='center' style={{
                   fontSize: "30px",
                   fontWeight: "800",
                }}>User Profile</Typography>

                <form className={classes.form} onSubmit={handleUpdateProfile}>

                    {/* <div>
                        <img
                            src={state ? URL.createObjectURL(profileData?.image) : `http://localhost:8000/uploads/` + profileData.image}
                            alt="Profile Picture"
                            className={classes.circularImage}
                        />
                    </div> */}

                    <div>
                        <img
                            src={
                                profileData.image instanceof File
                                    ? URL.createObjectURL(profileData.image)
                                    : `http://localhost:8000/uploads/` + profileData.image
                            }
                            alt="Profile Picture"
                            className={classes.circularImage}
                        />
                    </div>

                    <Grid item xs={12}>
                        <label htmlFor="profile-pic-upload">
                            <input
                                id="profile-pic-upload"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleChange}
                                name="image"
                            />
                            <Button
                                variant="contained"
                                component="span"
                                className={classes.submit}
                            >
                                Upload Profile Picture
                            </Button>
                        </label>
                    </Grid>


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
                        label="Phone"
                        fullWidth
                        variant="outlined"
                        className={classes.textField}
                        value={profileData.phone || ''}
                        onChange={handleChange}
                        name="phone"

                    />
                    <TextField
                        label="Zip Code"
                        fullWidth
                        variant="outlined"
                        className={classes.textField}
                        value={profileData.zipcode || ''}
                        onChange={handleChange}
                        name="zipcode"
                    />

                    <Box>
                        <Button variant="contained" className={classes.submitButton} type="submit" onClick={showToastMessage}>
                            Update Profile
                        </Button>
                        <ToastContainer />
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default UserProfile;
