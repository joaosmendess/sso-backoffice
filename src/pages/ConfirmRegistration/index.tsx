import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Typography, Button } from "@mui/material";
import { FormContainer } from "./styles";
import { confirmRegistration } from '../../services/registerService';
import { getPublicCompanyId } from '../../services/companyService'; // Adjust the path as necessary
import {jwtDecode} from 'jwt-decode'; // Don't forget to install this package

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

      // Decode the token to get company_id
      const decodedToken: any = jwtDecode(token);
      if (!decodedToken || !decodedToken.company_id) {
        setError('Token inválido.');
        return;
      }

      const companyId = decodedToken.company_id;
      const companyData = await getPublicCompanyId(companyId);
      const companyTag = companyData.tag;

      alert('Registro realizado. Por favor, aguarde a confirmação da empresa.');

      navigate(`/login/${companyTag}`);
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
        id='button-registration-confirm'
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
