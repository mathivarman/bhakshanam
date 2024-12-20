import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import FastfoodIcon from '@mui/icons-material/Fastfood'; // Icon for food management
import ListAltIcon from '@mui/icons-material/ListAlt'; // Icon for orders
import { styled } from '@mui/material/styles';

const SidebarContainer = styled('div')({
  width: 240,
  backgroundColor: '#E6E6E6', // Set sidebar background color to #E6E6E6
  height: '95vh',
  color: 'black', // Text color for sidebar
  padding: '20px',
});

const CustomListItem = styled(ListItem)(({ theme, isActive }) => ({
  '&:hover': {
    backgroundColor: '#F56E0f', // Change background color on hover
    color: 'black', // Text color on hover (black)
  },
  '&.active, &.active:hover': {
    backgroundColor: 'white', // Change background color when active (clicked)
    color: 'black', // Text color when active (black)
  },
  borderRadius: '5px', // Smooth border radius for the items
  marginBottom: '10px', // Spacing between items
}));

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname.includes(path); // Check if the route matches

  return (
    <SidebarContainer>
      <h2>Homemaker Dashboard</h2>
      <List>
        <Tooltip title="Food Management" arrow>
          <CustomListItem 
            button 
            component={Link} 
            to="Foodmanagement" 
            className={isActive('Foodmanagement') ? 'active' : ''}
          >
            <ListItemIcon>
              <FastfoodIcon style={{ color: 'black' }} /> {/* Food management icon */}
            </ListItemIcon>
            <ListItemText primary="Food Management" 
            sx={{ color: 'black' }} />
          </CustomListItem>
        </Tooltip>

        <Tooltip title="Orders" arrow>
          <CustomListItem 
            button 
            component={Link} 
            to="orders" 
            className={isActive('orders') ? 'active' : ''}
          >
            <ListItemIcon>
              <ListAltIcon style={{ color: 'black' }} /> {/* Orders icon */}
            </ListItemIcon>
            <ListItemText primary="Orders" sx={{ color: 'black' }} />
          </CustomListItem>
        </Tooltip>
      </List>
    </SidebarContainer>
  );
};

export default Sidebar;
