import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import image1 from "../img/why_choose_480.png";
import image2 from "../img/da1.jpg";
import image3 from "../img/da2.jpg"; 
import image4 from "../img/da3.jpg";
import image5 from "../img/da4.jpg";
import image6 from "../img/bdground.gif";  
import image7 from "../img/_.jpeg";
import image8 from "../img/efd506a80a3bb869e6bdeb04147b305b.gif";
import image9 from "../img/why_choose_480.png";
import image10 from "../img/why_choose_480.png";

const HeroSection = () => {
  const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000); // Change the image every 8 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  // Styles for the section
  const sectionStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '2rem',
    backgroundColor: '#f8f4f1',
    gap: '2rem',
    flexDirection: 'row',
    position: 'relative',
  };

  const textContainerStyle = {
    flex: 1,
    color: '#000',
    textAlign: 'left',
  };

  const imageContainerStyle = {
    position: 'relative',
    flex: 1,
    height: '400px',
    overflow: 'hidden',
    borderRadius: '15px',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  };

  const titleStyle = {
    fontSize: '2.5rem',
    color: '#000',
    marginBottom: '1rem',
    fontWeight: 'bold',
    textShadow: 'none',
    fontFamily: '"Faculty Glyphic", sans-serif',
  };

  const paragraphStyle = {
    fontSize: '1rem',
    lineHeight: '1.5',
    color: '#555',
    textShadow: 'none',
  };

  const buttonStyle = {
    marginTop: '1rem',
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#F56E0f',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'background-color 0.3s ease',
    textDecoration: 'none',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#e87a2d',
  };

  return (
    <section style={sectionStyle}>
      <div style={textContainerStyle}>
        <h3 style={titleStyle}>Tradition & Family Recipes</h3>
        <p style={paragraphStyle}>
          Discover the authentic homemade flavors that bring warmth and comfort
          to every meal. Our recipes are passed down through generations,
          capturing the essence of family traditions.
        </p>
        <Link to="/menu" style={buttonStyle}>
          Explore Our Menu <FiArrowRight size={24} />
        </Link>
      </div>

      <div style={imageContainerStyle}>
        <img
          src={images[currentImageIndex]}
          alt="Carousel"
          style={imageStyle}
        />
      </div>
    </section>
  );
};

export default HeroSection;
