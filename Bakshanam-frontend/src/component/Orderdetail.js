import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Alert,
} from '@mui/material';

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            const userId = localStorage.getItem('userId');
            try {
                const response = await axios.get(`http://localhost:5004/api/orders/user/${userId}`);
                if (response.data.length === 0) {
                    console.log('No orders found for this user');
                    // Optionally, display a message to the user
                } else {
                    console.log('Orders fetched:', response.data);
                    // Render the orders here
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.error('No orders found for this user:', error.response.data.message);
                } else {
                    console.error('Error fetching orders:', error.message);
                }
            }
        };
        

        fetchOrders();
    }, []);

    // Show a loading spinner while fetching orders
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <CircularProgress />
            </Box>
        );
    }

    // Display error message if there is an issue
    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    // Display the orders if they exist
    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Your Orders
            </Typography>
            {orders.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Customer Name</TableCell>
                                <TableCell>Items</TableCell>
                                <TableCell>Total Amount</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order._id}>
                                    <TableCell>{order._id}</TableCell>
                                    <TableCell>{order.customerName}</TableCell>
                                    <TableCell>{order.items.join(', ')}</TableCell>
                                    <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography>No orders found.</Typography>
            )}
        </Box>
    );
};

export default UserOrders;
