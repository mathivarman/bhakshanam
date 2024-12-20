import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton
} from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MenuIcon from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info';

const Sidebar = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
     { text: 'Orders', icon: ListAltIcon, path: 'orders' },
    { text: 'Users', icon: PeopleIcon, path: 'users' },
    { text: 'Homemaker', icon: FastfoodIcon, path: 'Homemaker' },
    { text: 'Contact Us', icon: ContactMailIcon, path: 'Contactus' },
    { text: 'Payment', icon: AccountBalanceWalletIcon, path: 'payment' },
  ];

  const handleItemClick = (itemText) => {
    setDialogContent(itemText);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ position: 'relative', height: '100vh', width: '20%' }}>
      {/* Toggle Sidebar Button (Only visible on small screens) */}
      <IconButton
        onClick={toggleSidebar}
        sx={{ position: 'absolute', top: '16px', left: '16px', zIndex: 1201 }}
      >
        <MenuIcon sx={{ color: 'black' }} />
      </IconButton>

      {/* Sidebar Drawer */}
      <Drawer
        variant="persistent"
        open={sidebarOpen}
        sx={{
          position: 'absolute',
          width: sidebarOpen ? 240 : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            position: 'absolute',
            width: sidebarOpen ? 240 : 0,
            color: 'white',
            height: '100vh',
            top: 0,
            left: 0,
            overflow: 'hidden',
            boxSizing: 'border-box',
            transition: 'width 0.3s', // Smooth transition for sliding
            backgroundColor: '#E6E6E6', // Set the sidebar background color here
            zIndex: 1200,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black', textAlign: 'center', mb: 2 }}><br></br>
            Admin Dashboard
          </Typography>
        </Box>

        <List>
          {menuItems.map((item, index) => {
            const isActive = location.pathname.includes(item.path);
            return (
              <ListItem
                button
                component={Link}
                to={item.path}
                key={item.text}
                sx={{
                  padding: '12px 16px',
                  bgcolor: isActive ? 'white' : 'transparent', // Active item background is white
                  '&:hover': {
                    bgcolor: '#F56E0f',
                    transform: hoveredItem === index ? 'scale(1.05)' : 'none',
                    boxShadow: hoveredItem === index ? '0 0 10px rgba(255, 255, 255, 0.5)' : 'none',
                  },
                  borderRadius: '10px',
                  mb: 1,
                  transition: 'all 0.3s',
                  color: 'black',
                  justifyContent: 'center',
                }}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <ListItemIcon sx={{ minWidth: '40px',display: 'flex', justifyContent: 'center' }}>
                  <item.icon sx={{ color: 'black', fontSize: '22px' }} />
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    display:"flex",
                    justifyContent:'start',
                    paddingLeft:'32px',
                    lineHeight: '1.2',
                    fontSize: '0.9rem',
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      {/* Dialog Pop-up */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Item Clicked</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            You clicked on the menu item: {dialogContent}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Sidebar;
