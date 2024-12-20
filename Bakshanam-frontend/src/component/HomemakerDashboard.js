import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../component/Hsidebar';
import Foodmanagement from"../component/Foodmanagement";
import Orders from '../component/Ordermanagement';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/Foodmanagement" element={<Foodmanagement/>} />
           <Route path="/orders" element={<Orders />} />
           </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
