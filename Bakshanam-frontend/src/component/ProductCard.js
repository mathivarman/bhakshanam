import React from 'react';
import { useCart } from '../component/CartContexrprovider';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product._id, 1); // Adds one unit by default
  };

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} width={150} />
      <div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>{product.price} USD</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
