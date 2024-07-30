import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Typography, LinearProgress, Alert, Button } from '@mui/material';
import { validateToken } from '../../services/authService'; 
import { checkUser } from '../../services/authService';
import LoginHeader from '../../components/LoginHeader';
import { FormContainer, HeaderContainer, ButtonContainer, InputField, Form } from './styles';
import { GetUserResponse } from '../../types';

const VerifySSO: React.FC = () => {
  const { companyName: tagCompany } = useParams<{ companyName: string }>(); // Obtendo a tag da URL
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirect_to');

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== 'http://localhost:8000') return;

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
    setUsername(e.target.value);
    setError(null);
  };

  const handleVerifyUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const response: GetUserResponse = await checkUser(username, tagCompany!);
      console.log('API response:', response); // Adicionando log para depuração

      if (response.message === 'Usuário e empresa encontrados') {
        const { company } = response;
        console.log('Company:', company); // Adicionando log para depuração

        if (response.company.hashCompany === tagCompany) {
          // Se a tag do usuário coincide com a tag da URL, segue o fluxo de SSO
          if (company && company.ssoName) {
            const ssoUrl = `http://localhost:8000/auth/redirect?clientId=${company.clientId}&clientSecret=${company.clientSecret}&tenantId=${company.tenantId}&redirectUrl=${encodeURIComponent(company.redirectUrl)}&redirectUri=${encodeURI(company.redirectUri)}`;
            console.log('Redirecionando para:', ssoUrl); // Log do URL de redirecionamento
            window.location.href = ssoUrl;
          } else {
            setError('O usuário não tem permissão de entrar com esse SSO. Volte para a tela anterior e faça login com usuário e senha.');
          }
        } else {
          setError('A tag do usuário não coincide com a tag da empresa. Verifique suas credenciais.');
        }
      } else {
        setError('Usuário não encontrado. Verifique suas credenciais.');
      }
    } catch (err) {
      console.error('Error verifying user:', err); // Adicionando log de erro
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
        <Typography variant="h5" component="h1" align="left" gutterBottom color='InfoText'>
          Verificação de SSO
        </Typography>
        <Typography variant="body2" align="left" gutterBottom color='InfoText' >
          Insira seu nome de usuário para verificar se você pode usar o SSO da sua empresa
        </Typography>
      </HeaderContainer>
      <Form>
        <InputField
          label="Usuário"
          id='input-username'
          variant="outlined"
          type="text"
          value={username}
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
            id='button-verify-username'
            color="primary"
            onClick={handleVerifyUser}
            disabled={!username || loading}
          >
            Verificar Usuário
          </Button>
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

export default VerifySSO;
