import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const LoginExpired: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const expired = queryParams.get('expired') === 'true';

  return (
    <Box sx={{ maxWidth: '600px', margin: 'auto', mt: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {expired && (
        <Typography color="error" variant="body1" gutterBottom>
          Your session has expired. Please log in again.
        </Typography>
      )}
      <Button variant="contained" color="primary" href="/login">
        Go to Login
      </Button>
    </Box>
  );
};

export default LoginExpired;
