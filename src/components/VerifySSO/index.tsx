// VerifySSO.tsx

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, LinearProgress, Alert, Button } from '@mui/material';
import { validateToken, getUser } from '../../services/auth';
import LoginHeader from '../../components/LoginHeader';
import { FormContainer, HeaderContainer, ButtonContainer, InputField, Form } from './styles';

const VerifySSO: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirect_to');

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== 'http://localhost:8989') return;

      const { token, customerData } = event.data;
      console.log('Received token and customerData:', token, customerData);

      if (token && customerData) {
        try {
          const validationResponse = await validateToken(token);
          if (validationResponse.message === 'Usuário está registrado em nossa base de dados') {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(customerData));
            
            window.opener.postMessage({ token, customerData }, '*');
            window.location.href = redirectTo || '/';
          } else {
            setError('Falha na validação do token. Verifique suas credenciais.');
          }
        } catch (err) {
          setError('Falha na validação do token. Verifique suas credenciais.');
        }
      } else {
        setError('Falha no login. Verifique suas credenciais.');
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [redirectTo]);

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    setError(null);
  };

  const handleVerifyUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const user = await getUser(userName);
      if (user) {
        if (user.empresa.sso_name) {
          const ssoUrl = `http://localhost:8989/auth/redirect?redirect_to=${encodeURIComponent(window.location.origin + redirectTo)}`;
          window.location.href = ssoUrl;
        } else {
          setError('O usuário não tem permissão de entrar com esse SSO. Volte para a tela anterior e faça login com usuário e senha.');
        }
      } else {
        setError('Usuário não encontrado. Verifique suas credenciais.');
      }
    } catch (err) {
      setError('Falha ao verificar o usuário. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      {loading && <LinearProgress sx={{ width: '100%', position: 'absolute', top: 0 }} />}
      <LoginHeader />
      <HeaderContainer>
        <Typography variant="h5" component="h1" align="left" gutterBottom>
          Verificação de SSO
        </Typography>
        <Typography variant="body2" align="left" gutterBottom>
          Insira seu nome de usuário para verificar se você pode usar o SSO da sua empresa
        </Typography>
      </HeaderContainer>
      <Form>
        <InputField
          label="Usuário"
          variant="outlined"
          type="text"
          value={userName}
          onChange={handleUserNameChange}
          required
          margin="normal"
        />
        {error && (
          <Alert severity="error" sx={{ marginBottom: '1rem' }}>
            {error}
          </Alert>
        )}
        <ButtonContainer>
          <Button
            variant="contained"
            color="primary"
            onClick={handleVerifyUser}
            disabled={!userName || loading}
          >
            Verificar Usuário
          </Button>
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

export default VerifySSO;
