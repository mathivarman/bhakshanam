import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, CircularProgress, Alert, Paper } from '@mui/material';

const UserDetails = () => {
    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch user ID from localStorage on component mount
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
            fetchUser(storedUserId); // Automatically fetch user data if userId exists in localStorage
        }
    }, []);

    const fetchUser = async (userId) => {
        setLoading(true);
        setError('');
        setUserData(null);

        try {
            const response = await axios.get(`http://localhost:5004/api/auth/user/${userId}`);
            setUserData(response.data.data);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError('Something went wrong. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    // const handleFetch = () => {
    //     if (userId.trim()) {
    //         fetchUser(userId);
    //     } else {
    //         setError('Please provide a valid user ID.');
    //     }
    // };

    return (
        <Box sx={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom>
                Fetch User Details
            </Typography>

            {/* Input Field */}
            {/* <TextField
                label="User ID"
                variant="outlined"
                fullWidth
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                margin="normal"
            /> */}

            {/* Fetch Button */}
            {/* <Button
                variant="contained"
                color="primary"
                onClick={handleFetch}
                sx={{ marginBottom: '20px' }}
            >
                Fetch User
            </Button> */}

            {/* Loading Spinner */}
            {loading && <CircularProgress />}

            {/* Error Message */}
            {error && (
                <Alert severity="error" sx={{ marginBottom: '20px' }}>
                    {error}
                </Alert>
            )}

            {/* User Data */}
            {userData && (
                <Paper sx={{ padding: '20px', marginTop: '20px' }}>
                    <Typography variant="h6">User Details</Typography>
                    <Typography><strong>ID:</strong> {userData._id}</Typography>
                    <Typography><strong>Name:</strong> {userData.name}</Typography>
                    <Typography><strong>Email:</strong> {userData.email}</Typography>
                    <Typography><strong>Role:</strong> {userData.role}</Typography>
                    <Typography>
                        <strong>Blocked:</strong> {userData.isBlocked ? 'Yes' : 'No'}
                    </Typography>
                </Paper>
            )}
        </Box>
    );
};

export default UserDetails;
