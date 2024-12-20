// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Box, Typography, Button, TextField, CircularProgress, Paper } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import backgroundImage from '../img/22320ae1812ec585b6304a5514d92a3f.gif';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Auth = () => {
//     const [isLogin, setIsLogin] = useState(true);
//     const [name, setName] = useState('');
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [isHovered, setIsHovered] = useState(false);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');

//         if (!isLogin && password !== confirmPassword) {
//             toast.error('Passwords do not match');
//             return;
//         }

//         if (!username || !password || (!isLogin && !name)) {
//             toast.error('Please fill in all fields');
//             return;
//         }

//         try {
//             setLoading(true);
//             const url = isLogin 
//                 ? 'http://localhost:5004/api/homemakeruser/login' 
//                 : 'http://localhost:5004/api/homemakeruser/register';

//             const response = await axios.post(url, { 
//                 name: isLogin ? undefined : name, 
//                 username, 
//                 password,
//                 role: isLogin ? undefined : 'Homemaker'
//             });

//             if (response.data.success) {
//                 toast.success(isLogin ? 'Login successful!' : 'Registration successful!');
//                 if (isLogin) {
//                     localStorage.setItem('token', response.data.token);
//                     localStorage.setItem('username', username);
//                     navigate('/homemakerdashboard/*', { state: { username } });
//                 } else {
//                     setName('');
//                     setUsername('');
//                     setPassword('');
//                     setConfirmPassword('');
//                     setIsLogin(true);
//                 }
//             } else {
//                 toast.error(response.data.message || 'Operation failed. Please try again.');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             toast.error(error.response?.data?.message || 'Server error. Please try again later.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const containerStyle = {
//         width: '100%',
//         height: '150vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         position: 'relative',
//         overflow: 'hidden',
//     };

//     const formStyle = {
//         background: 'rgba(255, 255, 255, 0.9)',
//         padding: '40px',
//         borderRadius: '20px',
//         maxWidth: 400,
//         width: '100%',
//         boxShadow: isHovered 
//             ? '0 0 20px rgba(76, 175, 80, 0.5), 0 0 40px rgba(33, 150, 243, 0.3)'
//             : '0 10px 30px rgba(0, 0, 0, 0.2)',
//         transition: 'all 0.3s ease-in-out',
//         transform: isHovered ? 'scale(1.02)' : 'scale(1)',
//     };

//     const inputStyle = {
//         marginBottom: '20px',
//         '& .MuiOutlinedInput-root': {
//             '& fieldset': {
//                 borderColor: '#4CAF50',
//             },
//             '&:hover fieldset': {
//                 borderColor: '#2196F3',
//             },
//             '&.Mui-focused fieldset': {
//                 borderColor: '#2196F3',
//             },
//         },
//     };

//     const buttonStyle = {
//         marginTop: '20px',
//         backgroundColor: '#4CAF50',
//         '&:hover': {
//             backgroundColor: '#2196F3',
//         },
//     };

//     const switchModeStyle = {
//         marginTop: '20px',
//         color: '#2196F3',
//         cursor: 'pointer',
//         '&:hover': {
//             textDecoration: 'underline',
//         },
//     };

//     return (
//         <Box sx={containerStyle}>
//             <ToastContainer position="top-center" autoClose={3000} />
//             <Paper 
//                 elevation={3}
//                 sx={formStyle}
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//             >
//                 <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                     <LockOutlinedIcon sx={{ fontSize: 40, color: '#4CAF50', marginBottom: 2 }} />
//                     <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#2196F3', fontWeight: 'bold' }}>
//                         {isLogin ? 'Login' : 'Register'}
//                     </Typography>
//                     <form onSubmit={handleSubmit} style={{ width: '100%' }}>
//                         {!isLogin && (
//                             <TextField
//                                 label="Name"
//                                 variant="outlined"
//                                 fullWidth
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                                 required
//                                 sx={inputStyle}
//                             />
//                         )}
//                         <TextField
//                             label="Username"
//                             variant="outlined"
//                             fullWidth
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             required
//                             sx={inputStyle}
//                         />
//                         <TextField
//                             label="Password"
//                             type="password"
//                             variant="outlined"
//                             fullWidth
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                             sx={inputStyle}
//                         />
//                         {!isLogin && (
//                             <TextField
//                                 label="Confirm Password"
//                                 type="password"
//                                 variant="outlined"
//                                 fullWidth
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                                 required
//                                 sx={inputStyle}
//                             />
//                         )}
//                         <Button 
//                             type="submit" 
//                             variant="contained" 
//                             fullWidth 
//                             disabled={loading}
//                             sx={buttonStyle}
//                         >
//                             {loading ? <CircularProgress size={24} /> : (isLogin ? 'Login' : 'Register')}
//                         </Button>
//                     </form>
//                     <Typography 
//                         variant="body2" 
//                         sx={switchModeStyle}
//                         onClick={() => setIsLogin(!isLogin)}
//                     >
//                         {isLogin ? 'Don\'t have an account? Register' : 'Already have an account? Login'}
//                     </Typography>
//                 </Box>
//             </Paper>
//         </Box>
//     );
// };

// export default Auth;



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField, CircularProgress, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import backgroundImage from '../img/home3.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
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
            toast.error('Passwords do not match');
            return;
        }

        if (!username || !password || (!isLogin && !name)) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            setLoading(true);
            const url = isLogin 
                ? 'http://localhost:5004/api/homemakeruser/login' 
                : 'http://localhost:5004/api/homemakeruser/register';

            const response = await axios.post(url, { 
                name: isLogin ? undefined : name, 
                username, 
                password,
                role: isLogin ? undefined : 'Homemaker'
            });

            if (response.data.success) {
                toast.success(isLogin ? 'Login successful!' : 'Registration successful!');
                if (isLogin) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('username', username);
                    navigate('/homemakerdashboard/*', { state: { username } });
                } else {
                    setName('');
                    setUsername('');
                    setPassword('');
                    setConfirmPassword('');
                    setIsLogin(true);
                }
            } else {
                toast.error(response.data.message || 'Operation failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.response?.data?.message || 'Server error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Container style for split layout
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '120vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        background: 'center',
        position: 'relative',
        overflow: 'hidden',
    };

    // Form style
    const formStyle = {
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '40px',
        borderRadius: '20px',
        maxWidth: 400,
        height: '800px',
        width: '100%',
        boxShadow: isHovered 
            ? '0 0 20px rgba(76, 175, 80, 0.5), 0 0 40px rgba(33, 150, 243, 0.3)'
            : '0 10px 30px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease-in-out',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
    };

    const inputStyle = {
        marginBottom: '20px',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'black',
            },
            '&:hover fieldset': {
                borderColor: '#f56e0f',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#f56e0f',
            },
        },
    };

    const buttonStyle = {
        marginTop: '20px',
        backgroundColor: '#f56e0f',
        '&:hover': {
            backgroundColor: '#f56e0f',
        },
    };

    const switchModeStyle = {
        marginTop: '20px',
        color: 'black',
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
        },
    };

    return (
        <Box sx={containerStyle}>
            <ToastContainer position="top-center" autoClose={3000} />
            {/* Left Side (Image) */}
            <Box sx={{ flex: 1, height: '100%', background: `url(${backgroundImage}) no-repeat center center`, backgroundSize: 'cover' }} />

            {/* Right Side (Form) */}
            <Paper 
                elevation={3}
                sx={formStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <LockOutlinedIcon sx={{ fontSize: 40, color: '#f56e0f', marginBottom: 2 }} />
                    <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
                        {isLogin ? 'Login' : 'Register'}
                    </Typography>
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
                            label="Username"
                            variant="outlined"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            sx={inputStyle}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            sx={inputStyle}
                        />
                        {!isLogin && (
                            <TextField
                                label="Confirm Password"
                                type="password"
                                variant="outlined"
                                fullWidth
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
                        variant="body2" 
                        sx={switchModeStyle}
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'Don\'t have an account? Register' : 'Already have an account? Login'}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default Auth;
