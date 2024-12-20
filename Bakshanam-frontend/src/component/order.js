import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../css/order.css";

const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#F56E0f',
    color: 'white',
    '&:hover': {
        backgroundColor: '#F56E0f',
    },
}));

const OrderForm = () => {
    const [customerName, setCustomerName] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const { cart, totalPrice } = location.state || { cart: [], totalPrice: 0 };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderData = { 
            customerName, 
            address,
            items: cart.map(item => ({
                itemName: item.name,
                quantity: item.quantity,
                price: item.price,
            })),
            totalAmount: totalPrice 
        };

        try {
            await axios.post('http://localhost:5004/api/orders', orderData);
            setCustomerName('');
            setAddress('');
            toast.success("Order placed successfully!");
            navigate('/payment', { state: { totalPrice } });
        } catch (err) {
            console.error('Error placing order:', err.response ? err.response.data : err.message);
            setError('Could not place order.');
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: '20px auto', backgroundColor: '#f8f8f8' }}>
            <Typography variant="h4" gutterBottom>
                Place Order
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Customer Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                />
                
                <TextField
                    label="Address"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                
                <CustomButton 
                    type="submit" 
                    variant="contained" 
                    fullWidth 
                    style={{ marginTop: '20px' }}
                >
                    Submit Order
                </CustomButton>
            </form>

            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </Paper>
    );
};

export default OrderForm;

