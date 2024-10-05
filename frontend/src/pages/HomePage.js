import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import '../styles/Home.css';

const HomePage = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            textAlign="center"
        >
            <Typography variant="h2" gutterBottom>
                Tic Tac Toe
            </Typography>
            <Typography variant="h5" paragraph>
                Welcome to the ultimate Tic Tac Toe experience!
            </Typography>
            <Box display="flex" gap={2}>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary">
                        Login
                    </Button>
                </Link>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary">
                        Register
                    </Button>
                </Link>
            </Box>
        </Box>
    );
};

export default HomePage;