import React, { useState } from "react";
import { Box, Grid, TextField, Button, Typography } from "@mui/material";
import emailjs from "emailjs-com";
import contactImage from "../img/4ZWOfZXuSzS8r5grD1yZ5FRiZdn6jzDCJGFJ9Xft_1024x1024_copy_a_1024x1024.jpg";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Attempt to send message using fetch
    fetch("http://localhost:5004/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setSuccessMessage("Thank you! Your message has been sent.");
          setErrorMessage("");
          setFormData({ name: "", email: "", phone: "", message: "" });
        } else {
          return response.json().then((data) => {
            throw new Error(data.message || "Failed to send message via backend.");
          });
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        const emailData = {
          subject: `Message from ${formData.name}`,
          message: formData.message,
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
        };

        emailjs
          .send("service_91cciuj", "template_svnvg0o", emailData, "28Z-nOl3vXj8RDA7e")
          .then(
            (response) => {
              console.log("Message sent successfully", response.status, response.text);
              setSuccessMessage("Thank you! Your message has been sent.");
              setErrorMessage("");
              setFormData({ name: "", email: "", phone: "", message: "" });
            },
            (error) => {
              console.error("Failed to send message", error);
              setErrorMessage("Failed to send message. Please try again later.");
              setSuccessMessage("");
            }
          );
      });
  };

  const containerStyle = {
    padding: '50px',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    maxWidth: '1600px',
    margin: '0 auto',
    transition: 'all 0.3s ease',
    transform: isHovered ? 'scale(1.02)' : 'scale(1)',
  };

  const imageStyle = {
    borderRadius: '50%',
    width: '100%',
    height: 'auto',
    boxShadow: '0 10px 30px rgba(33, 150, 243, 0.3)',
    transition: 'all 0.3s ease',
    transform: isHovered ? 'rotate(5deg)' : 'rotate(0)',
  };

  const formStyle = {
    padding: '30px',
    backgroundColor: '#f9f9f9',
    borderRadius: '15px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
  };

  const inputStyle = {
    marginBottom: '20px',
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#f1f1f1',
      '&:hover': {
        backgroundColor: '', // Light blue background on hover
      },
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: '#F56E0f',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#F56E0f',
      },
    },
  };

  const buttonStyle = {
    backgroundColor: '#F56E0f', // Blue button
    color: 'white',
    padding: '10px 30px',
    fontSize: '16px',
    borderRadius: '30px',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#F56E0f',
      boxShadow: '#F56E0f',
    },
  };

  return (
    <Box 
      sx={containerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <img
            src={contactImage}
            alt="Delicious Food"
            style={imageStyle}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box component="form" onSubmit={handleSubmit} sx={formStyle}>
            <Typography variant="h4" sx={{ color: 'black', marginBottom: '20px', textAlign: 'center' }}>
              Contact Us
            </Typography>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              sx={inputStyle}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              sx={inputStyle}
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              required
              sx={inputStyle}
            />
            <TextField
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={4}
              sx={inputStyle}
            />
            <Button variant="contained" type="submit" sx={buttonStyle}>
              Send Message
            </Button>
            {successMessage && <Typography color="#4CAF50" sx={{ mt: 2 }}>{successMessage}</Typography>}
            {errorMessage && <Typography color="error" sx={{ mt: 2 }}>{errorMessage}</Typography>}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactUsPage;
