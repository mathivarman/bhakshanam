import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const EditButton = styled(Button)(({ theme }) => ({
  marginRight: "10px",
  color: '#F56E0F', // Button text color
  borderColor: '#F56E0F', // Border color
  '&:hover': {
    backgroundColor: '#F56E0F', // Button background on hover
    color: 'white', // Text color on hover
  },
}));

const DeleteButton = styled(Button)(({ theme }) => ({
  color: '#F56E0F', // Button text color
  borderColor: '#F56E0F', // Border color
  '&:hover': {
    backgroundColor: '#F56E0F', // Button background on hover
    color: 'white', // Text color on hover
  },
}));

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [customertName, setCustomerName] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [Quantity, setQuantity] = useState(""); // Capitalized Quantity
  const [image, setImage] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const location = useLocation();
  const { username } = location.state || {};

  useEffect(() => {
    setCustomerName(localStorage.getItem("username"));
    axios.get("http://localhost:5004/api/products")
      .then(response => 
        
        
        {setProducts(response.data)
          console.log(response.data)
        })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
        alert('Failed to fetch products. Please check the server or endpoint.');
      });
  }, []);

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:5004/api/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product._id !== id));

      })
      .catch(error => {
        console.error("Delete error:", error.response ? error.response.data : error.message);
        alert("Failed to delete the product. Please try again.");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("customerName", customertName);
    formData.append("name", productName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("Quantity", Quantity); // Capitalized Quantity in form data
    if (image) {
      formData.append("image", image);
    }

    try {
      if (editingProductId) {
        const response = await axios.put(`http://localhost:5004/api/products/${editingProductId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const updatedProduct = response.data;
        setProducts(products.map(product => (product._id === updatedProduct._id ? updatedProduct : product)));
      } else {
        const response = await axios.post('http://localhost:5004/api/products', formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const addedProduct = response.data;
        setProducts([...products, addedProduct]);
      }

      // Clear input fields after submission
      setProductName("");
      setPrice("");
      setDescription("");
      setQuantity(""); // Clear Quantity field
      setImage(null);
      setEditingProductId(null);
    } catch (error) {
      console.error("Error during handleSubmit:", error);
      alert("There was an error processing your request. Please try again.");
    }
  };

  const editProduct = (product) => {
    setProductName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setQuantity(product.Quantity); // Set Quantity when editing
    setEditingProductId(product._id);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Manage Products</Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Customer Name"
          value={customertName}
          fullWidth
          margin="normal"
          onChange={(e) => setCustomerName(e.target.value)}
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="Product Name"
          value={productName}
          fullWidth
          margin="normal"
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <TextField
          label="Price"
          type="number"
          value={price}
          fullWidth
          margin="normal"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <TextField
          label="Product Description"
          value={description}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      <TextField
  label="Quantity"
  type="number"
  value={Quantity} // Capitalized Quantity
  fullWidth
  margin="normal"
  onChange={(e) => {
    const value = Math.min(5, Math.max(0, Number(e.target.value))); // Restrict between 0 and 5
    setQuantity(value);
  }}
  inputProps={{
    max: 5, // Set maximum value to 5
    min: 1, // Set minimum value to 1
  }}
  required
/>

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required={!editingProductId}
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: "10px", backgroundColor: "#F56E0F", color: "white" }}>
          {editingProductId ? "Update Product" : "Add Product"}
        </Button>
      </form>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Quantity</TableCell> {/* Capitalized Quantity */}
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.filter(pro=>pro.customerName==customertName).map(product => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.Quantity}</TableCell> {/* Capitalized Quantity */}
                <TableCell>
                  {product.imageUrl && (
                    <Avatar src={`http://localhost:5004${product.imageUrl}`} alt={product.name} variant="rounded" style={{ width: "50px", height: "50px" }} />
                  )}
                </TableCell>
                <TableCell>
                  <EditButton onClick={() => editProduct(product)} variant="outlined">
                    Edit
                  </EditButton>
                  <DeleteButton onClick={() => deleteProduct(product._id)} variant="outlined">
                    Delete
                  </DeleteButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ManageProducts;
