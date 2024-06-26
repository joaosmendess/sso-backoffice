import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box,  Typography, CircularProgress } from '@mui/material';
import Header from '../../components/Header';


const Dashboard = () => {
 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    } else {
      setLoading(false);
    }
  }, [navigate]);

  

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
    <Header/>
      <Box p={3}>
        <Typography variant="h4">Dashboard</Typography>
        <Typography variant="subtitle1">Subtítulo conveniente aqui</Typography>
        {/* Gráfico e outros componentes do Dashboard */}
      </Box>
    </Box>
  );
};

export default Dashboard;
