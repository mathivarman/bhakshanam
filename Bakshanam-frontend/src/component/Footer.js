import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from 'react-icons/fa';

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: '#E6E6E6',
      color: 'black',
      padding: '3rem 0',
      fontFamily: 'Arial, sans-serif',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
    },
    section: {
      animation: 'fadeIn 0.5s ease-in-out',
    },
    heading: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: 'black',
    },
    text: {
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      color: 'black',
    },
    icon: {
      marginRight: '0.5rem',
      color: '#F56E0F',
    },
    list: {
      listStyle: 'none',
      padding: 0,
    },
    listItem: {
      marginBottom: '0.5rem',
    },
    link: {
      color: 'black',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
    },
    linkHover: {
      color: '#F56E0F',
    },
    bottom: {
      borderTop: '1px solid #FFA500',
      marginTop: '2rem',
      paddingTop: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    socialLinks: {
      display: 'flex',
      gap: '1rem',
    },
    socialIcon: {
      backgroundColor: '#F56E0F',
      color: 'black',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.2rem',
      transition: 'all 0.3s ease',
    },
    socialIconHover: {
      backgroundColor: 'black',
      color: '#F56E0F',
    },
    formInput: {
      width: '100%',
      padding: '1rem',
      marginBottom: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    formButton: {
      backgroundColor: '#E6E6E6',
      color: '#F56E0F',
      border: '2px solid #F56E0F',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.grid}>
          {/* Company Info Section */}
          <div style={styles.section}>
            <h4 style={styles.heading}></h4>
            <p style={styles.text}>
              <FaMapMarkerAlt style={styles.icon} /> Jaffna
            </p>
            <p style={styles.text}>
              <FaPhone style={styles.icon} />  0754389795
            </p>
            <p style={styles.text}>
              <FaEnvelope style={styles.icon} />  daxd0524@gmail.com
            </p>
          </div>

          {/* Useful Links Section */}
          <div style={styles.section}>
            <h4 style={styles.heading}>Useful Links</h4>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <Link to="/" style={styles.link}>Home</Link>
              </li>
              <li style={styles.listItem}>
                <Link to="/about" style={styles.link}>About Us</Link>
              </li>
              <li style={styles.listItem}>
                <Link to="/menu" style={styles.link}>Products</Link>
              </li>
              <li style={styles.listItem}>
                <Link to="/contactus" style={styles.link}>Contact</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div style={styles.section}>
            <h4 style={styles.heading}>Newsletter</h4>
            <p>Stay updated with our latest news and offers!</p>
            <form onSubmit={handleNewsletterSubmit} style={{ marginTop: '1rem' }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={styles.formInput}
                required
              />
              <button type="submit" style={styles.formButton}>
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={styles.bottom}>
          <p>&copy; 2024 Bhakshanam. Shop responsibly!</p>
          <div style={styles.socialLinks}>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialIcon}
            >
              <FaTwitter />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialIcon}
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialIcon}
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialIcon}
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
