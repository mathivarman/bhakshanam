import React, { createContext, useContext, useState } from 'react';
import foodImage1 from '../img/avathar1.jpg'; // Ensure this file exists, or replace it with an actual image path
import foodImage2 from '../img/idli1.jpg';
import foodImage3 from '../img/dosa1.jpg';
import foodImage4 from '../img/avathar1.jpg';

const FoodContext = createContext();

export const useFood = () => {
  return useContext(FoodContext);
};

export const FoodProvider = ({ children }) => {
  const [foodItems, setFoodItems] = useState([
    { id: 1, name: 'Kala', price: 100, image: foodImage1 },
    { id: 2, name: 'Mala', price: 80, image: foodImage2 },
    { id: 3, name: 'Dax', price: 90, image: foodImage3 },
    { id: 4, name: 'Rani', price: 120, image: foodImage4 },
  ]);

  const addFoodItem = (item) => {
    setFoodItems((prevItems) => [...prevItems, item]);
  };

  const editFoodItem = (updatedItem) => {
    setFoodItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const deleteFoodItem = (id) => {
    setFoodItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <FoodContext.Provider value={{ foodItems, addFoodItem, editFoodItem, deleteFoodItem }}>
      {children}
    </FoodContext.Provider>
  );
};
