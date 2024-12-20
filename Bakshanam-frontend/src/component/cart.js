import React, { useEffect } from 'react';
import { useCart } from '../component/CartContexrprovider';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/cart.css';

const CustomCheckoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#F56E0f',
  color: 'white',
  '&:hover': {
    backgroundColor: '#F56E0f',
  },
}));

const CartPage = () => {
  const { cart, updateCartItemQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure every item has a default quantity of 1 if no quantity is set
    cart.forEach((item) => {
      if (!item.quantity || item.quantity === 0) {
        updateCartItemQuantity(item._id, () => ({
          ...item,
          quantity: 1,
        }));
      }
    });
  }, [cart, updateCartItemQuantity]);

  const handleCheckout = () => {
    navigate('/order', { state: { cart, totalPrice: getTotalCartAmount() } });
    toast.success("Proceeding to checkout");
  };

  const getTotalCartAmount = () => {
    return cart.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);
  };

  const increaseQuantity = (id, maxQuantity) => {
    const item = cart.find((item) => item._id === id);
    if (item.quantity >= maxQuantity) {
      toast.error("No more stock available for this item.");
      return;
    }
    updateCartItemQuantity(id, (item) => ({
      ...item,
      quantity: (item.quantity || 0) + 1,
    }));
    toast.success("Quantity increased!");
  };

  const decreaseQuantity = (id) => {
    updateCartItemQuantity(id, (item) => {
      const newQuantity = (item.quantity || 0) - 1;
      return { ...item, quantity: Math.max(newQuantity, 1) }; // Prevent going below 1
    });
    toast.info("Quantity decreased!");
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
    toast.warn("Item removed from cart.");
  };

  return (
    <div className="cart-page">
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Menu Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Total Price</TableCell>
              <TableCell align="right">Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">Rs {item.price.toFixed(2)}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => decreaseQuantity(item._id)}
                    disabled={item.quantity <= 1}
                    variant="outlined"
                  >
                    -
                  </Button>
                  <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                  <Button
                    onClick={() => increaseQuantity(item._id, item.Quantity)}
                    variant="outlined"
                  >
                    +
                  </Button>
                </TableCell>
                <TableCell align="right">Rs {(item.price * item.quantity).toFixed(2)}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => handleRemoveItem(item._id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Subtotal: Rs {getTotalCartAmount().toFixed(2)}
      </Typography>
      <Typography variant="h6">
        Total (including fee): Rs {(getTotalCartAmount() + 2).toFixed(2)}
      </Typography>

      <CustomCheckoutButton
        variant="contained"
        onClick={handleCheckout}
        style={{ marginTop: '20px' }}
      >
        PROCEED TO CHECKOUT
      </CustomCheckoutButton>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CartPage;
