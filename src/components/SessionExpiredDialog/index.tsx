import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SessionExpiredDialog: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/'); // Redirecionar para a página de login
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>Sessão Expirada</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Sua sessão expirou. Por favor, entre novamente.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SessionExpiredDialog;
