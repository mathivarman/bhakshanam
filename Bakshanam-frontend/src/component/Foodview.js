import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "./CartContexrprovider"; // Adjust the path if necessary
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  Star,
  ShoppingCart,
} from "@mui/icons-material";

const Foodview = () => {
  const location = useLocation();
  const { name } = location.state || {};
  const { homeMakerId } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    axios
      .get(`http://localhost:5004/api/products?homeMakerId=${homeMakerId}`)
      .then((response) => {
        console.log(response.data);
        console.log(name);
        setMenuItems(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [homeMakerId, name]);

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

  const toggleFavorite = (itemId) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId);
      } else {
        newFavorites.add(itemId);
      }
      return newFavorites;
    });
  };

  const filteredMenuItems = menuItems.filter(
    (item) => item.customerName === name
  );

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Menu Items
      </Typography>
      <Grid container spacing={4}>
        {filteredMenuItems.map((item) => (
          <Grid item key={item._id} xs={12} sm={6} md={3}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: 200,
                  objectFit: "cover",
                }}
                image={
                  item.imageUrl
                    ? `http://localhost:5004${item.imageUrl}`
                    : "/placeholder.svg?height=200&width=200"
                }
                alt={item.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.name}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Rs {item.price}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between" }}>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<ShoppingCart />}
                  onClick={() => handleAddToCart(item)}
                  sx={{
                    backgroundColor: "#F56E0f", // Updated color
                    color: "white", // Text color
                    "&:hover": {
                      backgroundColor: "#F56E0f", // Keep the same color on hover
                      color: "white", // Maintain text color on hover
                    },
                  }}
                >
                  Add to Cart
                </Button>

                <Box>
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() => toggleFavorite(item._id)}
                  >
                    {favorites.has(item._id) ? (
                      <Favorite color="error" />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </IconButton>
                  <IconButton aria-label="rating" disabled>
                    <Star sx={{ color: "#F56E0f" }} /> {/* Updated star color */}
                  </IconButton>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleViewCart}
          startIcon={<ShoppingCart />}
          sx={{
            backgroundColor: "#F56E0f", // Updated color
            color: "white", // Text color
            "&:hover": {
              backgroundColor: "#F56E0f", // Keep the same color on hover
              color: "white", // Maintain text color on hover
            },
          }}
        >
          View Cart
        </Button>
      </Box>
    </Container>
  );
};

export default Foodview;
