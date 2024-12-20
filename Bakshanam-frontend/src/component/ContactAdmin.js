// AdminDashboard.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 10;

  useEffect(() => {
    fetch("http://localhost:5004/api/contact-submissions")
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error("Error fetching contact submissions:", error));
  }, []);

  // Calculate the number of pages
  const totalPages = Math.ceil(contacts.length / usersPerPage);
  
  // Slice the contacts to display only those for the current page
  const displayedContacts = contacts.slice(currentPage * usersPerPage, (currentPage + 1) * usersPerPage);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Contact Submissions
      </Typography>
      <Typography variant="h4" gutterBottom>
        Contact list
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <Box sx={{ marginTop: 2, display: "flex", justifyContent: "space-between" }}>
        <Button 
          disabled={currentPage === 0} 
          onClick={() => setCurrentPage(currentPage - 1)}
          sx={{
            '&:hover': {
              backgroundColor: '#F56E0F',
              color: 'white',
            },
            color: 'orange',
            borderColor: 'orange',
            '&:disabled': {
              color: 'gray',
            },
          }}
        >
          Previous
        </Button>
        <Typography>{`Page ${currentPage + 1} of ${totalPages}`}</Typography>
        <Button 
          disabled={currentPage + 1 >= totalPages} 
          onClick={() => setCurrentPage(currentPage + 1)}
          sx={{
            '&:hover': {
              backgroundColor: '#F56E0F',
              color: 'white',
            },
            color: 'orange',
            borderColor: 'orange',
            '&:disabled': {
              color: 'gray',
            },
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
