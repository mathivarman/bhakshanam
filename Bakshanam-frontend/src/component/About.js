import React, { useState, useEffect } from 'react'
import { FiArrowLeft, FiArrowRight, FiAward, FiUsers, FiTruck, FiHeart } from 'react-icons/fi'
import girlPhoto from '../img/_.jpeg'

const testimonialsData = [
  {
    text: "At Bhakshanam, we believe that food should be simple, delicious, and made with love. Our mission is to bring you homemade meals that are crafted from fresh, local ingredients, providing the comfort and warmth of home-cooked food.",
    id: 1,
  },
  {
    text: "We understand the struggle of finding healthy meal options in a busy world. That's why we connect you with talented homemakers who create tasty dishes that nourish both body and soul.",
    id: 2,
  },
  {
    text: "Every meal from Bhakshanam is a delightful experience, filled with flavors that remind me of home. I love the variety and quality of the dishes!",
    id: 3,
  },
  {
    text: "The convenience of having homemade meals delivered is amazing! I highly recommend Bhakshanam to anyone looking for delicious and healthy food.",
    id: 4,
  },
]

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setFade(true), 300)
    return () => clearTimeout(timeout)
  }, [currentIndex])

  const handleNext = () => {
    setFade(false)
    setTimeout(() => setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length), 300)
  }

  const handlePrevious = () => {
    setFade(false)
    setTimeout(() => setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length), 300)
  }

  const styles = {
    section: {
      padding: '80px 24px',
      background: 'linear-gradient(135deg, #FBFBFB 0%, #F8F8F8 100%)',
      position: 'relative',
      overflow: 'hidden',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
    },
    pattern: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: '200px',
      height: '200px',
      opacity: 0.1,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F56E5F' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    },
    content: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '64px',
      alignItems: 'center',
    },
    imageSection: {
      position: 'relative',
      padding: '20px',
    },
    mainImage: {
      width: '100%',
      height: '120vh',
      borderRadius: '24px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    },
    experienceBadge: {
      position: 'absolute',
      left: '-20px',
      bottom: '40px',
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      backgroundColor: '#F56E5F',
      color: '#FBFBFB',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      zIndex: 2,
    },
    badgeText: {
      fontSize: '24px',
      fontWeight: '700',
      marginBottom: '4px',
    },
    badgeSubtext: {
      fontSize: '14px',
      textAlign: 'center',
      lineHeight: 1.2,
    },
    textContent: {
      padding: '40px',
    },
    subtitle: {
      color: '#F56E5F',
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '16px',
      fontFamily: '"Faculty Glyphic", sans-serif',
    },
    title: {
      fontSize: '40px',
      fontWeight: '800',
      color: '#151419',
      marginBottom: '24px',
      lineHeight: 1.2,
      fontFamily: '"Faculty Glyphic", sans-serif',
    },
    testimonial: {
      fontSize: '18px',
      color: '#787878',
      lineHeight: 1.6,
      marginBottom: '40px',
      opacity: fade ? 1 : 0,
      transform: fade ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.3s ease',
       fontFamily: '"Faculty Glyphic", sans-serif',
    },
    features: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px',
      marginTop: '40px',
    },
    feature: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '16px',
    },
    featureIcon: {
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      backgroundColor: 'rgba(245, 110, 95, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#F56E5F',
    },
    featureText: {
      flex: 1,
       fontFamily: '"Faculty Glyphic", sans-serif',
    },
    featureTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#151419',
      marginBottom: '4px',
    },
    featureDescription: {
      fontSize: '14px',
      color: '#787878',
    },
    navigation: {
      display: 'flex',
      gap: '16px',
      marginTop: '32px',
    },
    navButton: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      backgroundColor: '#FBFBFB',
      border: '2px solid #F56E0f',
      color: '#F56E5F',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    navButtonHover: {
      backgroundColor: '#F56E0f',
      color: '#F56E0f',
    },
  }

  return (
    <section style={styles.section}>
      <div style={styles.pattern} />
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.imageSection}>
            <img src={girlPhoto} alt="Happy Customer" style={styles.mainImage} />
                     </div>

          <div style={styles.textContent}>
            <h3 style={styles.subtitle}>About Our Company</h3>
            <h2 style={styles.title}>We Provide Best Home-Made Food For Any Purpose</h2>
            <p style={styles.testimonial}>{testimonialsData[currentIndex].text}</p>

            <div style={styles.features}>
              <div style={styles.feature}>
                <div style={styles.featureIcon}>
                  <FiUsers size={24} />
                </div>
                <div style={styles.featureText}>
                  <h4 style={styles.featureTitle}>Expert Chefs</h4>
                  <p style={styles.featureDescription}>Skilled home chefs with years of experience</p>
                </div>
              </div>
              <div style={styles.feature}>
                <div style={styles.featureIcon}>
                  <FiAward size={24} />
                </div>
                <div style={styles.featureText}>
                  <h4 style={styles.featureTitle}>Award-Winning Service</h4>
                  <p style={styles.featureDescription}>Recognized for our quality and service</p>
                </div>
              </div>
              <div style={styles.feature}>
                <div style={styles.featureIcon}>
                  <FiTruck size={24} />
                </div>
                <div style={styles.featureText}>
                  <h4 style={styles.featureTitle}>Fast Delivery</h4>
                  <p style={styles.featureDescription}>Get fresh food delivered quickly to your door</p>
                </div>
              </div>
              <div style={styles.feature}>
                <div style={styles.featureIcon}>
                  <FiHeart size={24} />
                </div>
                <div style={styles.featureText}>
                  <h4 style={styles.featureTitle}>Made With Love</h4>
                  <p style={styles.featureDescription}>Every meal prepared with love and care</p>
                </div>
              </div>
            </div>

            <div style={styles.navigation}>
              <div style={{ ...styles.navButton }} onClick={handlePrevious}>
                <FiArrowLeft size={24} />
              </div>
              <div style={{ ...styles.navButton }} onClick={handleNext}>
                <FiArrowRight size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
