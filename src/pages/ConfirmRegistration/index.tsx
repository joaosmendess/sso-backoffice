import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Typography, Button } from "@mui/material";
import { FormContainer } from "./styles";
import { confirmRegistration } from '../../services/registerService';

// Função para extrair o token da URL
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

interface ConfirmRegistrationProps {
  companyName: string;
}

// Componente
const ConfirmRegistration: React.FC<ConfirmRegistrationProps> = ({ companyName }) => {
  const navigate = useNavigate();
  const query = useQuery();
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromUrl = query.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError('Token não encontrado na URL.');
    }
  }, [query]);

  const handleConfirm = async () => {
    if (!token) {
      setError('Token não encontrado.');
      return;
    }

    try {
      await confirmRegistration(token);

    } catch (err) {
      setError('Erro ao confirmar o registro. Por favor, tente novamente.');
    }
  };

  return (
    <FormContainer>
      <Typography variant='h5' color='success.main' gutterBottom>
         Para finalizar o registro
      </Typography>
      <Typography variant='body1' color='textSecondary' align='center' paragraph>
          Por favor! Clique no botão abaixo para finalizar o seu registro e começar a usar nossa plataforma.
      </Typography>
      {error && (
        <Typography variant='body2' color='error' align='center' paragraph>
          {error}
        </Typography>
      )}
      <Button 
        type="button" 
        variant="contained" 
        color="primary" 
        sx={{ mt: 2, textTransform:'none' }}
        onClick={handleConfirm}
      >
          Confirmar Registro
      </Button>
    </FormContainer>
  );
};

export default ConfirmRegistration;
