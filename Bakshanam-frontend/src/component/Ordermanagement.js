import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    Paper,
    Snackbar,
    Alert
} from '@mui/material';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const ordersPerPage = 10;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5004/api/orders');
                setOrders(response.data);
            } catch (err) {
                console.error('Error fetching orders:', err.response ? err.response.data : err.message);
                setError('Could not fetch orders.');
            }
        };
        fetchOrders();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5004/api/orders/${id}`);
            setOrders(orders.filter(order => order._id !== id));
            setSuccessMessage('Order deleted successfully');
        } catch (err) {
            console.error('Error deleting order:', err.response ? err.response.data : err.message);
            setError('Could not delete order.');
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await axios.patch(`http://localhost:5004/api/orders/${id}/status`, { status: newStatus });
            setOrders(orders.map(order => 
                order._id === id ? { ...order, status: response.data.status } : order
            ));
            setSuccessMessage('Order status updated successfully');
        } catch (err) {
            console.error('Error updating order status:', err.response ? err.response.data : err.message);
            setError('Could not update order status.');
        }
    };

    // Calculate the current orders based on the current page
    const startIndex = currentPage * ordersPerPage;
    const currentOrders = orders.slice(startIndex, startIndex + ordersPerPage);
    const totalPages = Math.ceil(orders.length / ordersPerPage);

    return (
        <Paper style={{ padding: '16px' }}>
            <Typography variant="h4" gutterBottom>
                Admin Dashboard
            </Typography>
            <Typography variant="h4" gutterBottom>Order List</Typography>
    
            {error && <Alert severity="error">{error}</Alert>}
            {successMessage && <Snackbar open={true} autoHideDuration={6000} onClose={() => setSuccessMessage(null)}>
                <Alert onClose={() => setSuccessMessage(null)} severity="success">{successMessage}</Alert>
            </Snackbar>}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Orders</TableCell>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Items</TableCell>
                            <TableCell>Total Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentOrders.map((order,index) => (
                            <TableRow key={order._id}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{order.customerName}</TableCell>
                                <TableCell>
                                    {order.items.map((item, index) => (
                                        <div key={index}>{item.itemName} (x{item.quantity})</div>
                                    ))}
                                </TableCell>
                                <TableCell>{order.totalAmount}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="contained" 
                                        color="secondary" 
                                        onClick={() => handleDelete(order._id)}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#F56E0F', // Hover color for delete button
                                                color: 'white',
                                            },
                                            backgroundColor: '#F56E0F', // Default color for delete button
                                            color: 'white', // Default text color
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
                <Button 
                    variant="outlined" 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))} 
                    disabled={currentPage === 0}
                    sx={{
                        '&:hover': {
                            backgroundColor: '#F56E0F', // Hover color for Previous button
                        },
                        borderColor: '#F56E0F', // Default border color for Previous button
                        color: '#F56E0F', // Default text color for Previous button
                    }}
                >
                    Previous
                </Button>
                <Button 
                    variant="outlined" 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))} 
                    disabled={currentPage === totalPages - 1}
                    sx={{
                        '&:hover': {
                            backgroundColor: '#F56E0F', // Hover color for Next button
                        },
                        borderColor: '#F56E0F', // Default border color for Next button
                        color: '#F56E0F', // Default text color for Next button
                    }}
                >
                    Next
                </Button>
            </div>
        </Paper>
    );
};

export default AdminDashboard;
