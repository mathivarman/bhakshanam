import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' });
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(0);
    const usersPerPage = 10;

    // Get token from localStorage (assuming the token is stored there)
    const token = localStorage.getItem('token'); // Adjust based on where your token is stored

    // Fetch users (with authentication token)
    const fetchUsers = async () => {
        try {
            setError(null); // Clear any previous errors

            // Fetch users with the authentication token in headers
            const response = await axios.get('http://localhost:5004/api/users/get', {
                headers: {
                    Authorization: `Bearer ${token}`, // Send the token in Authorization header
                },
            });
            setUsers(response.data);
        } catch (error) {
            if (error.response) {
                const status = error.response.status;

                if (status === 401) {
                    setError('Unauthorized: Please check your permissions.');
                } else {
                    setError('An unexpected error occurred.');
                }
                console.error("Error Response:", error.response.data);
            } else {
                console.error('Error Message:', error.message);
                setError('Network error, please try again.');
            }
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRemove = async (userId) => {
        try {
            await axios.delete(`http://localhost:5004/api/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Send the token when removing a user
                },
            });
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            setError('Error removing user: ' + error.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5004/api/users', newUser, {
                headers: {
                    Authorization: `Bearer ${token}`, // Send the token when registering a user
                },
            });
            setUsers([...users, response.data]);
            setNewUser({ name: '', email: '', role: 'user' });
        } catch (error) {
            setError('Error registering user: ' + error.message);
        }
    };

    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleBlockUnblock = async (userId) => {
        try {
            await axios.put(`http://localhost:5004/api/users/${userId}/block`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`, // Send the token when blocking/unblocking a user
                },
            });
            fetchUsers();
        } catch (error) {
            setError('Error blocking/unblocking user: ' + error.message);
        }
    };

    const startIndex = currentPage * usersPerPage;
    const selectedUsers = users.slice(startIndex, startIndex + usersPerPage);
    const totalPages = Math.ceil(users.length / usersPerPage);

    return (
        <Box sx={{ bgcolor: '#f5f5f5', p: 3, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>Admin Dashboard - Users</Typography>
            {error && <Typography color="error">{error}</Typography>}

            <Typography variant="h4" gutterBottom>User List</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectedUsers.map(user => (
                            <TableRow key={user._id}>
                                <TableCell>{user._id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.isBlocked ? 'Blocked' : 'Active'}</TableCell>
                                <TableCell>
                                    <Box display="flex" gap={1}>
                                        <Button 
                                            variant="contained" 
                                            onClick={() => handleBlockUnblock(user._id)}
                                            sx={{
                                                bgcolor: 'transparent', // Default color transparent
                                                color: '#F56E0F', // Text color
                                                border: '2px solid #F56E0F', // Border color
                                                '&:hover': {
                                                    bgcolor: '#F56E0F', // Background color on hover
                                                    color: 'white', // Text color on hover
                                                    border: '2px solid #F56E0F', // Border color on hover
                                                },
                                            }}
                                        >
                                            {user.isBlocked ? 'Unblock' : 'Block'}
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            onClick={() => handleRemove(user._id)} 
                                            sx={{
                                                borderColor: '#F56E0F', // Border color
                                                color: '#F56E0F', // Text color
                                                '&:hover': {
                                                    borderColor: '#F56E0F', // Border color on hover
                                                    color: '#F56E0F', // Text color on hover
                                                    backgroundColor: 'transparent', // Transparent background on hover
                                                },
                                            }}
                                        >
                                            Remove
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ mt: 2 }}>
                <Button 
                    disabled={currentPage === 0} 
                    onClick={() => setCurrentPage(currentPage - 1)}
                    sx={{
                        bgcolor: 'transparent', // Default color transparent
                        color: '#F56E0F', // Text color
                        border: '2px solid #F56E0F', // Border color
                        '&:hover': {
                            bgcolor: '#F56E0F', // Background color on hover
                            color: 'white', // Text color on hover
                            border: '2px solid #F56E0F', // Border color on hover
                        },
                    }}
                >
                    Previous
                </Button>
                <Typography component="span">{` Page ${currentPage + 1} of ${totalPages} `}</Typography>
                <Button 
                    disabled={currentPage + 1 >= totalPages} 
                    onClick={() => setCurrentPage(currentPage + 1)}
                    sx={{
                        bgcolor: 'transparent', // Default color transparent
                        color: '#F56E0F', // Text color
                        border: '2px solid #F56E0F', // Border color
                        '&:hover': {
                            bgcolor: '#F56E0F', // Background color on hover
                            color: 'white', // Text color on hover
                            border: '2px solid #F56E0F', // Border color on hover
                        },
                    }}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default AdminDashboard;
