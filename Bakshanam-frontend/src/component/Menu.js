// import React, { useEffect, useState } from 'react';
// import { 
//   Container, 
//   Typography, 
//   Grid, 
//   Card, 
//   CardMedia, 
//   CardContent, 
//   CardActions, 
//   Button, 
//   CircularProgress,
//   Box
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const HomeMakers = () => {
//   const [homeMakers, setHomeMakers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchHomeMakers = async () => {
//       try {
//         const response = await fetch('http://localhost:5004/api/home-makers/getHomeMakers');
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         console.log("Fetched home makers:", data);
//         setHomeMakers(data);
//       } catch (err) {
//         console.error('Error fetching home makers:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHomeMakers();
//   }, []);

//   const handleViewHomeMaker = (homeMakerId, homeMakerName) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('You need to log in to view this home maker.');
//       return;
//     }
//     navigate(`/Foodview/${homeMakerId}`, { state: { name: homeMakerName } });
//     console.log(homeMakerId);
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 8 }}>
//       <Typography variant="h2" component="h1" gutterBottom align="center">
//         Featured Home Makers
//       </Typography>
//       {loading ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <Grid container spacing={4}>
//           {homeMakers.length > 0 ? (
//             homeMakers.map((homeMaker) => (
//               <Grid item key={homeMaker._id} xs={12} sm={6} md={4}>
//                 <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//                   <CardMedia
//                     component="img"
//                     sx={{
//                       height: 200,
//                       objectFit: 'cover',
//                     }}
//                     image={homeMaker.imageUrls?.[0] ? `http://localhost:5004/${homeMaker.imageUrls[0]}` : '/placeholder.svg?height=200&width=200'}
//                     alt={homeMaker.name}
//                   />
//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Typography gutterBottom variant="h5" component="h2">
//                       {homeMaker.name}
//                     </Typography>
//                     <Typography>
//                       {homeMaker.description || 'Specializing in homemade products'}
//                     </Typography>
//                   </CardContent>
//                   <CardActions>
//                     <Button 
//                       size="small" 
//                       onClick={() => handleViewHomeMaker(homeMaker._id, homeMaker.name)}
//                       sx={{
//                         backgroundColor: 'orange',
//                         color: 'white',
//                         '&:hover': {
//                           backgroundColor: 'blue',
//                           color: 'white',
//                         },
//                       }}
//                     >
//                       View Home Maker
//                     </Button>
//                   </CardActions>
//                 </Card>
//               </Grid>
//             ))
//           ) : (
//             <Typography variant="h6" align="center" sx={{ width: '100%' }}>
//               No home makers found.
//             </Typography>
//           )}
//         </Grid>
//       )}
//     </Container>
//   );
// };

// export default HomeMakers;

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMapPin, FiArrowRight } from 'react-icons/fi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const HomeMakers = () => {
  const [homeMakers, setHomeMakers] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchHomeMakers = async () => {
      try {
        const response = await fetch('http://localhost:5004/api/home-makers/getHomeMakers')
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        console.log("Fetched home makers:", data)
        setHomeMakers(data)
      } catch (err) {
        console.error('Error fetching home makers:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchHomeMakers()
  }, [])

  const handleViewHomeMaker = (homeMakerId, homeMakerName) => {
    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('You need to log in to view this home maker.')
      navigate('/Signup')
      return
    }
    navigate(`/Foodview/${homeMakerId}`, { state: { name: homeMakerName } })
  }

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
      fontSize: '48px',
      fontWeight: '800',
      color: '#151419',
      marginBottom: '16px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
      fontFamily: '"Faculty Glyphic", sans-serif',
    },
    subtitle: {
      fontSize: '20px',
      color: '#787878',
      maxWidth: '700px',
      margin: '0 auto',
      lineHeight: 1.6,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)', // Sets a maximum of four columns
      gap: '40px',
      padding: '24px 0',
    },
    card: {
      backgroundColor: '#FBFBFB',
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      ':hover': {
        transform: 'translateY(-10px)',
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
      },
    },
    cardImageContainer: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '24px 24px 0 0',
    },
    cardImage: {
      width: '100%',
      height: '220px',
      objectFit: 'cover',
      transition: 'transform 0.3s ease',
    },
    cardHover: {
      ':hover img': {
        transform: 'scale(1.1)',
      },
    },
    badge: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      backgroundColor: '#F56E0f',
      color: '#FBFBFB',
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '600',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    },
    content: {
      padding: '24px',
    },
    homeMakerName: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#151419',
      marginBottom: '12px',
    },
    location: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#787878',
      fontSize: '16px',
      marginBottom: '16px',
    },
    description: {
      color: '#787878',
      fontSize: '16px',
      lineHeight: 1.6,
      marginBottom: '24px',
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      backgroundColor: '#F56E0f',
      color: '#FBFBFB',
      padding: '14px 28px',
      borderRadius: '50px',
      border: 'none',
      fontSize: '18px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: '100%',
      ':hover': {
        backgroundColor: '#151419',
        transform: 'translateY(-2px)',
        boxShadow: '0 5px 10px rgba(0,0,0,0.2)',
      },
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
    },
    spinner: {
      width: '50px',
      height: '50px',
      border: '5px solid #F56E5F',
      borderTop: '5px solid transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    loadingText: {
      marginTop: '24px',
      color: '#787878',
      fontSize: '18px',
      fontWeight: '600',
    },
    noResults: {
      textAlign: 'center',
      color: '#787878',
      fontSize: '20px',
      padding: '64px 0',
      fontWeight: '600',
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Featured Home Makers</h1>
        <p style={styles.subtitle}>
          Discover talented home chefs in your area and enjoy authentic, homemade delicacies delivered to your doorstep
        </p>
      </div>

      {loading ? (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner} />
          <p style={styles.loadingText}>Discovering local culinary talents...</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {homeMakers.length > 0 ? (
            homeMakers.map((homeMaker) => (
              <div key={homeMaker._id} style={{...styles.card, ...styles.cardHover}}>
                <div style={styles.cardImageContainer}>
                  <img
                    style={styles.cardImage}
                    src={homeMaker.imageUrls?.[0] ? 
                      `http://localhost:5004/${homeMaker.imageUrls[0]}` : 
                      '/placeholder.svg?height=220&width=300'
                    }
                    alt={homeMaker.name}
                  />
                      </div>
                <div style={styles.content}>
                  <h3 style={styles.homeMakerName}>{homeMaker.name}</h3>
                  <div style={styles.location}>
                    <FiMapPin size={18} />
                    <span>{homeMaker.location || 'Local Area'}</span>
                  </div>
                  <p style={styles.description}>
                    {homeMaker.description || 'Specializing in authentic homemade dishes prepared with love and care.'}
                  </p>
                  <button
                    onClick={() => handleViewHomeMaker(homeMaker._id, homeMaker.name)}
                    style={styles.button}
                  >
                    View Menu
                    <FiArrowRight size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={styles.noResults}>
              No home makers found in your area. Check back soon for new additions!
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default HomeMakers