import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiClock, FiStar, FiTruck } from 'react-icons/fi';
import backgroundImg from '../img/dax.png';
import Menu from "../component/Menu";
import About from "../component/About";
import Feature from "../component/FeatureSection";
import ExploreMenu from './ExploreMenu';

const HeroSection = () => {
  const styles = {
    section: {
      position: 'relative',
      minHeight: '50vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 24px',
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      color: '#ffffff',
      overflow: 'hidden',
      borderRadius: '50px',
      fontFamily: 'Poppins, sans-serif',
      margin: '20px',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      zIndex: 1,
      borderRadius: '20px',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 3,
      textAlign: 'center',
    },
    content: {
      marginBottom: '64px',
    },
    title: {
      fontSize: '56px',
      fontWeight: '800',
      color: '#FBFBFB',
      marginBottom: '24px',
      lineHeight: 1.2,
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
      fontFamily: '"Faculty Glyphic", sans-serif', // Updated font family
    },
    highlight: {
      color: '#F56E0f',
      display: 'inline-block',
    },
    subtitle: {
      fontSize: '20px',
      color: 'white',
      maxWidth: '700px',
      margin: '0 auto 40px',
      lineHeight: 1.6,
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
      fontFamily: 'Arial, sans-serif',
    },
    cta: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      backgroundColor: '#F56E0f',
      color: '#FBFBFB',
      padding: '18px 36px',
      borderRadius: '50px',
      fontSize: '20px',
      fontWeight: '600',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
    },
    features: {
      display: 'grid',
      gridTemplateColumns: 'repeat(1, 1fr)',
      gap: '32px',
      marginTop: '80px',
    },
    feature: {
      backgroundColor: 'rgba(251, 251, 251, 0.1)',
      padding: '40px',
      borderRadius: '24px',
      textAlign: 'center',
      transition: 'all 0.3s ease',
    },
    featureIcon: {
      backgroundColor: '#F56E0f',
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 24px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    featureTitle: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#FBFBFB',
      marginBottom: '16px',
    },
    featureText: {
      fontSize: '18px',
      color: '#FBFBFB',
      lineHeight: 1.6,
      fontFamily: 'Poppins, sans-serif',
    },
  };

  return (
    <>
      <section style={styles.section}>
        <div style={styles.overlay}></div>
        <div style={styles.container}>
          <div style={styles.content}>
            <h1 style={styles.title}>
              Savor the Flavor, <span style={styles.highlight}>Delivered Fast</span>
            </h1>
            <p style={styles.subtitle}>
              Indulge in a culinary journey with our lightning-fast delivery. From kitchen to your doorstep, experience the perfect blend of taste and convenience.
            </p>
            <Link to="/menu" style={styles.cta}>
              Explore 
              <FiArrowRight size={24} />
            </Link>
          </div>
        </div>
      </section>
      <ExploreMenu />
      <About />
      <Feature />
    </>
  );
};

export default HeroSection;
