// Topbar.jsx
import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const Topbar = () => {
    return (
        <nav style={{
            backgroundColor: '#2196f3',
            color: 'white',
            padding: "20px",
            position: "absolute",
            top: 10,
            left: 307,
            width: "80%",


        }}>
            <Box className="container flex items-center justify-between">
                <Box className="text-white font-bold text-xl">Your Logo</Box>

                <Box className="user-nav flex flex-col items-end">
                    <Typography className="user-name font-bold">John Doe</Typography>

                </Box>

            </Box>
        </nav>
    );
};

export default Topbar;
