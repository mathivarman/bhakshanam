
import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Alert,
  Paper,
} from "@mui/material";

const HomeMakerList = ({ homeMakers, onEditHomeMaker, onDeleteHomeMaker }) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Home Makers
      </Typography>
      {homeMakers.length === 0 ? (
        <Alert severity="info">No home makers found.</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell> {/* New Column for Image */}
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {homeMakers.map((homeMaker) => (
                <TableRow key={homeMaker._id}>
                  <TableCell>
                    {homeMaker.imageUrls && homeMaker.imageUrls.length > 0 ? (
                      homeMaker.imageUrls.map((image, index) => (
                        <img
                          key={index}
                          src={`http://localhost:5004/${image}`} // Replace with your image server path
                          alt={`Image ${index}`}
                          width="50"
                          style={{ marginRight: 5, borderRadius: "4px" }}
                        />
                      ))
                    ) : (
                      <span>No image available</span> // Placeholder text if no images
                    )}
                  </TableCell>
                  <TableCell>{homeMaker.name}</TableCell>
                  <TableCell>{homeMaker.description}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        console.log("Edit button clicked for:", homeMaker);
                        onEditHomeMaker(homeMaker);
                      }}
                      sx={{
                        borderColor: '#F56E0F', // Border color
                        color: '#F56E0F', // Text color
                        '&:hover': {
                          bgcolor: '#F56E0F', // Background color on hover
                          color: 'white', // Text color on hover
                          borderColor: '#F56E0F', // Border color on hover
                        },
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => onDeleteHomeMaker(homeMaker._id)}
                      style={{ marginLeft: "10px" }}
                      sx={{
                        borderColor: '#F56E0F', // Border color
                        color: '#F56E0F', // Text color
                        '&:hover': {
                          bgcolor: '#F56E0F', // Background color on hover
                          color: 'white', // Text color on hover
                          borderColor: '#F56E0F', // Border color on hover
                        },
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
      )}
    </div>
  );
};

export default HomeMakerList;
