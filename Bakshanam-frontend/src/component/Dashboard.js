import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './Sidebar';
import Orders from '../component/Ordermanagement';
import Users from '../component/User';
import Homemaker from '../component/Homemaker Admin';
import ContactUs from '../component/ContactAdmin';
import Payment from '../component/Payment admin';
import Overview from "../component/Ordermanagement";
const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '' }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: 'margin-left 0.3s',
          marginLeft: '240px',
          bgcolor: 'white',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '20px',
          m: 2,
        }}
      >
        <Routes>
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<Users />} />
          <Route path="/Homemaker" element={<Homemaker />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/Overview" element={<Overview />} />

          
        </Routes>
      </Box>
    </Box>
  );
};

export default Dashboard;
