import React, { useState, useEffect } from 'react';
import AddHomeMaker from '../component/HomeMakerManagement'; // Ensure this points to the correct file
import HomeMakerList from './HomeMakerList';
import { Alert, Typography, Container, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const HomeMakerManagement = () => {
    const [homeMakers, setHomeMakers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentHomeMaker, setCurrentHomeMaker] = useState(null);
  
    // Fetch the list of homemakers
    const fetchHomeMakers = async () => {
        try {
            const response = await axios.get('http://localhost:5004/api/home-makers/getHomeMakers');
            setHomeMakers(response.data); // Assuming the API returns an array of homemakers
        } catch (error) {
            console.error('Failed to fetch home makers:', error);
            setErrorMessage('Failed to load homemakers. Please try again later.');
        }
    };

    // Handle updating a homemaker
    const handleUpdateHomeMaker = (id, updatedHomeMaker) => {
        setHomeMakers(homeMakers.map(hm => (hm._id === id ? updatedHomeMaker : hm))); // Update the list with the updated homemaker
        setCurrentHomeMaker(null); // Reset the current homemaker
        setIsEditing(false); // Reset editing state
    };

    // Handle adding a new homemaker
    const handleAddHomeMaker = (newHomeMaker) => {
        setHomeMakers([...homeMakers, newHomeMaker]); // Update the list with the newly added homemaker
    };

    // Handle editing a homemaker
    const handleEditHomeMaker = (homeMaker) => {
        setIsEditing(true);
        setCurrentHomeMaker(homeMaker); // Set the homemaker to edit
    };

    // Handle deleting a homemaker
    const handleDeleteHomeMaker = async (id) => {
        try {
            await axios.delete(`http://localhost:5004/api/home-makers/deleteHomeMaker/${id}`);
            fetchHomeMakers(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting homemaker:", error);
            setErrorMessage('Failed to delete homemaker. Please try again later.');
        }
    };

    useEffect(() => {
        fetchHomeMakers(); // Fetch the list of homemakers when the component mounts
    }, []);

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Homemakers Management
            </Typography>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <AddHomeMaker 
                onAddHomeMaker={handleAddHomeMaker} 
                onUpdateHomeMaker={handleUpdateHomeMaker} 
                initialData={currentHomeMaker} 
                isEditing={isEditing} 
            />
            <Button 
                variant="outlined" 
                color="primary" 
                startIcon={<AddIcon />} 
                onClick={() => handleEditHomeMaker(null)} 
                sx={{ mb: 2, backgroundColor: '#E0F7FA', color: '#00796B', '&:hover': { backgroundColor: '#B2EBF2' } }}
            >
                Add HomeMaker
            </Button>
            <HomeMakerList 
                homeMakers={homeMakers} 
                onEditHomeMaker={handleEditHomeMaker} 
                onDeleteHomeMaker={handleDeleteHomeMaker}
            />
        </Container>
    );
};

export default HomeMakerManagement;
