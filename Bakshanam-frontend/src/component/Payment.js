import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../css/Paypalbutton.css";

const PayPalButton = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
  const { totalPrice } = location.state || { totalPrice: 0 };

  // Define handleCreateOrder function
  const handleCreateOrder = (data, actions) => {
    if (totalPrice && !isNaN(totalPrice)) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: totalPrice.toFixed(2),
            currency_code: "USD",
          },
        }],
      });
    } else {
      console.error("Total price is undefined or not a valid number.");
      toast.error("Invalid total price.");
      throw new Error("Invalid total price");
    }
  };

  // Define handleOnApprove function
  const handleOnApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      console.log('Payment successful!', details);
      toast.success('Payment successful! Thank you for your purchase.');
      
      // Send payment details to backend here if needed
      fetch('http://localhost:5004/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: details.id,
          payerId: details.payer.payer_id,
          amount: details.purchase_units[0].amount.value,
          currency: details.purchase_units[0].amount.currency_code,
          status: details.status,
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log("Payment saved to database:", data);

        // Navigate to menu page after successful payment
        navigate('/menu');
      })
      .catch(error => {
        console.error("Error saving payment to database:", error);
        toast.error("Payment was successful, but an error occurred while saving it.");
      });
    });
  };

  // Define handleOnError function
  const handleOnError = (err) => {
    console.error('PayPal Checkout Error:', err);
    toast.error('An error occurred during the payment process. Please try again.');
  };

  return (
    <div>
      <PayPalScriptProvider options={{ "client-id": "AekNtOqaue-rDWKqAJj9no35ecpAsuWzdvMpHsB33EMm9FAZuK-knv4DHfNl0va1GMKxs_avJiXfN850", currency: "USD" }}>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <PayPalButtons
          createOrder={handleCreateOrder}
          onApprove={handleOnApprove}
          onError={handleOnError}
          style={{ layout: 'vertical' }}
        />
      </PayPalScriptProvider>

      {/* Add ToastContainer here for global toast notifications */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default PayPalButton;
