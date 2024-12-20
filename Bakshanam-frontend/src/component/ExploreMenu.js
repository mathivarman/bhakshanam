import React, { useEffect, useState } from 'react';
import { FiMapPin, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from '../img/home 1.jpg';
import image2 from '../img/Home2.jpg';
import image3 from '../img/home4.jpg';
import image4 from '../img/home 5.jpg';

const ExploreMenu = () => {
  const [homeMakers, setHomeMakers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setHomeMakers([
        {
          _id: '1',
          name: 'Dax',
          location: 'Local Area',
          description: 'A chef is a professional cook.',
          imageUrls: [image1],
        },
        {
          _id: '2',
          name: 'Thangom',
          location: 'Local Area',
          description: 'A chef is a professional cook.',
          imageUrls: [image2],
        },
        {
          _id: '3',
          name: 'Mala',
          location: 'Local Area',
          description: 'A chef is a professional cook.',
          imageUrls: [image3],
        },
        {
          _id: '4',
          name: 'Sarmi',
          location: 'Local Area',
          description: 'A chef is a professional cook.',
          imageUrls: [image4],
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '64px 24px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '48px',
    },
    title: {
      fontSize: '40px',
      fontWeight: '800',
      color: '#151419',
      marginBottom: '16px',
      fontFamily: '"Faculty Glyphic", sans-serif',
    },
    subtitle: {
      fontSize: '18px',
      color: '#787878',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: 1.6,
      fontFamily: '"Faculty Glyphic", sans-serif',
    },
    card: {
      backgroundColor: '#FBFBFB',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
      padding: '16px',
    },
    cardImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '16px',
    },
    homeMakerName: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#151419',
      margin: '16px 0 8px',
    },
    location: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      color: '#787878',
      fontSize: '14px',
      marginBottom: '8px',
    },
    description: {
      color: '#787878',
      fontSize: '15px',
      lineHeight: 1.6,
      marginBottom: '16px',
    },
    button: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: '#F56E0F',
      color: '#FBFBFB',
      padding: '12px 24px',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      justifyContent: 'center',
      textDecoration: 'none',
      marginTop: '8px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Featured Home Makers</h1>
        <p style={styles.subtitle}>
          Discover talented home chefs in your area and enjoy authentic, homemade delicacies.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px 0' }}>
          <p>Loading...</p>
        </div>
      ) : (
        <Slider {...sliderSettings}>
          {homeMakers.map((homeMaker) => (
            <div key={homeMaker._id}>
              <div style={styles.card}>
                <img
                  src={homeMaker.imageUrls[0] || image1}
                  alt={homeMaker.name}
                  style={styles.cardImage}
                />
                <h3 style={styles.homeMakerName}>{homeMaker.name}</h3>
                <div style={styles.location}>
                  <FiMapPin />
                  <span>{homeMaker.location || 'Local Area'}</span>
                </div>
                <p style={styles.description}>
                  {homeMaker.description || 'Specializing in authentic homemade dishes.'}
                </p>
                <Link to="/Menu" style={styles.button}>
                  <span>Explore Menu</span>
                  <FiArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ExploreMenu;
