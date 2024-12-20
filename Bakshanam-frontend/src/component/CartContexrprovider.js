import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    };

    const updateCartItemQuantity = (id, updateFunction) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item._id === id ? updateFunction(item) : item
            )
        );
    };

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter(item => item._id !== id));
    };

    // Add other functions as necessary...

    return (
        <CartContext.Provider value={{ cart, addToCart, updateCartItemQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
