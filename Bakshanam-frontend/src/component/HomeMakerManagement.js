import React, { useState, useEffect } from 'react';
import { Button, TextField, Alert, Box, Typography } from '@mui/material';

const AddHomeMaker = ({ onAddHomeMaker, onUpdateHomeMaker, initialData, isEditing }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (isEditing && initialData) {
            setName(initialData.name);
            setDescription(initialData.description);
            setImages(initialData.images || []);
        } else {
            setName('');
            setDescription('');
            setImages([]);
        }
    }, [initialData, isEditing]);

    const handleAddHomeMaker = async (e) => {
        e.preventDefault();
        setSuccessMessage(''); // Reset success message on submit
        setErrorMessage('');   // Reset error message on submit

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);

        if (images.length === 0) {
            setErrorMessage('Please upload at least one image.');
            return;
        }

        Array.from(images).forEach((image) => {
            formData.append('images', image);
        });

        try {
            const url = isEditing
                ? `http://localhost:5004/api/home-makers/updateHomeMaker/${initialData._id}`
                : 'http://localhost:5004/api/home-makers/addHomeMaker';

            const response = await fetch(url, {
                method: isEditing ? 'PUT' : 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                if (isEditing) {
                    onUpdateHomeMaker(initialData._id, result);
                } else {
                    onAddHomeMaker(result);
                }
                setSuccessMessage(isEditing ? 'Home maker updated successfully!' : 'Home maker added successfully!');
                // Clear fields after successful submission
                setName('');
                setDescription('');
                setImages([]);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to process request.');
            }
        } catch (error) {
            setErrorMessage(error.message || 'Failed to process request. Please try again.');
        }
    };

    return (
        <form onSubmit={handleAddHomeMaker}>
            <Box mb={2}>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </Box>
            <Box mb={2}>
                <TextField
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={3}
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </Box>
            <Box mb={2}>
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    multiple
                    onChange={(e) => setImages([...e.target.files])}
                    required={!isEditing}
                />
                <label htmlFor="raised-button-file">
                    <Button 
                        variant="outlined" 
                        component="span" 
                        sx={{ 
                            color: '#F56E0F', 
                            borderColor: '#F56E0F', 
                            '&:hover': { 
                                backgroundColor: '#F56E0F', 
                                color: 'white' 
                            } 
                        }}
                    >
                        Upload Images
                    </Button>
                </label>
            </Box>

            {/* Preview images */}
            <Box mb={2}>
                {images.length > 0 && (
                    <div>
                        <Typography variant="subtitle1">Uploaded Images:</Typography>
                        <div style={{ display: 'flex', marginTop: '8px' }}>
                            {Array.from(images).map((image, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(image)}
                                    alt={`Uploaded preview ${index}`}
                                    style={{ width: '50px', height: '50px', marginRight: '5px', borderRadius: '4px' }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </Box>

            <Button 
                variant="contained" 
                sx={{ 
                    backgroundColor: '#F56E0F', 
                    color: 'white', 
                    '&:hover': { 
                        backgroundColor: '#F56E0F', 
                        color: 'white' 
                    } 
                }} 
                type="submit">
                {isEditing ? 'Update Home Maker' : 'Add Home Maker'}
            </Button>
            {successMessage && <Alert severity="success" sx={{ mt: 2 }}>{successMessage}</Alert>}
            {errorMessage && <Alert severity="error" sx={{ mt: 2 }}>{errorMessage}</Alert>}
        </form>
    );
};

export default AddHomeMaker;
