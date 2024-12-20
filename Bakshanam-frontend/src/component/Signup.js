import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
    Box,
    CircularProgress,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import backgroundImage from "../img/image_480.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!isLogin && password !== confirmPassword) {
            setError('Passwords do not match');
            toast.error('Passwords do not match');
            return;
        }

        if (!email || !password || (!isLogin && !name)) {
            setError('Please fill in all fields');
            toast.error('Please fill in all fields');
            return;
        }

        try {
            setLoading(true);
            const url = isLogin
                ? 'http://localhost:5004/api/auth/login'
                : 'http://localhost:5004/api/auth/register';

            const response = await axios.post(url, {
                name: isLogin ? undefined : name,
                email,
                password,
            });

            if (response.data.success) {
                toast.success(isLogin ? 'Login successful!' : 'Registration successful!');
                const { userId,token, role } = response.data;

                // Store token and role in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);
                localStorage.setItem('userId', userId);

                if (isLogin && role === 'Admin') {
                    navigate('/dashboard/*'); // Admin dashboard route
                } else if (isLogin) {
                    navigate('/'); // Regular user route
                } else {
                    setName('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    setIsLogin(true);
                }
            } else {
                setError(response.data.message || 'Operation failed. Please try again.');
                toast.error(response.data.message || 'Operation failed. Please try again.');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Server error. Please try again later.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh', // Prevent scrolling by setting full viewport height
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden', // Prevent scrolling
    };

    const paperStyle = {
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '20px',
        boxShadow: isHovered
            ? '0 0 20px rgba(76, 175, 80, 0.5), 0 0 40px rgba(33, 150, 243, 0.3)'
            : '0 10px 30px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
    };

    const iconStyle = {
        fontSize: '48px',
        color: '#f56e0f',
        marginBottom: '20px',
    };

    const headingStyle = {
        color: 'black',
        marginBottom: '20px',
        fontWeight: 'bold',
    };

    const inputStyle = {
        marginBottom: '16px',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'black', // Default border color
            },
            '&:hover fieldset': {
                borderColor: '#f56e0f', // Border color on hover
            },
            '&.Mui-focused fieldset': {
                borderColor: '#f56e0f', // Focused border color
            },
        },
    };

    const buttonStyle = {
        marginTop: '24px',
        backgroundColor: '#f56e0f', // Button background color
        '&:hover': {
            backgroundColor: '#f56e0f', // Button hover color
        },
    };

    const switchModeStyle = {
        marginTop: '16px',
        color: 'black',
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
        },
    };

    return (
        <Container component="main" maxWidth={false} disableGutters sx={containerStyle}>
            <Paper
                elevation={4}
                sx={paperStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Box display="flex" flexDirection="column" alignItems="center">
                    <LockIcon sx={iconStyle} />
                    <Typography variant="h4" sx={headingStyle}>
                        {isLogin ? 'Welcome Back' : 'Join Us'}
                    </Typography>
                    {error && <Alert severity="error" sx={{ marginBottom: '16px', width: '100%' }}>{error}</Alert>}
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        {!isLogin && (
                            <TextField
                                label="Name"
                                variant="outlined"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                sx={inputStyle}
                            />
                        )}
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            sx={inputStyle}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            sx={inputStyle}
                        />
                        {!isLogin && (
                            <TextField
                                label="Confirm Password"
                                variant="outlined"
                                fullWidth
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                sx={inputStyle}
                            />
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={loading}
                            sx={buttonStyle}
                        >
                            {loading ? <CircularProgress size={24} /> : (isLogin ? 'Login' : 'Register')}
                        </Button>
                    </form>
                    <Typography
                        onClick={() => setIsLogin(!isLogin)}
                        sx={switchModeStyle}
                    >
                        {isLogin ? 'Don\'t have an account? Register' : 'Already have an account? Login'}
                    </Typography>
                </Box>
            </Paper>
            <ToastContainer />
        </Container>
    );
};

export default Auth;
