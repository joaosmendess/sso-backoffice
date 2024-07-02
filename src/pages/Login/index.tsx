import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '../../stitches.config';
import { TextField, Button, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { login, getUser } from '../../services/auth';
import LoginHeader from '../../components/LoginHeader';
import SessionExpiredDialog from '../../components/SessionExpiredDialog';
import MicrosoftIcon from '@mui/icons-material/Microsoft'; // Importando o ícone do Microsoft

const FormContainer = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  backgroundColor: 'white',
  borderRadius: '8px',
});

const LoginButton = styled(Button, {
  marginTop: '1rem',
});

const Login: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [ssoName, setSsoName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirect_to');

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setLoading(true);
      setError(null);
      try {
        const user = await getUser(userName);
        if (user) {
          setSsoName(user.empresa.sso_name); // Certifique-se de que o campo está correto
          setStep(2);
        } else {
          setError('Usuário não encontrado. Verifique suas credenciais.');
        }
      } catch (error) {
        setError('Erro ao verificar usuário. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    } else {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      if (ssoName === 'microsoft') {
        // Fetch para a API da Microsoft com username e password
        const response = await fetch('http://localhost:8989/api/login-entra', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userName, password }),
        });
        const data = await response.json();
        if (data && data.token) {
          localStorage.setItem('token', data.token);
          window.location.href = `${redirectTo}?token=${data.token}`;
        } else {
          setError('Falha no login com Microsoft. Verifique suas credenciais.');
        }
      } else {
        const response = await login(userName, password);
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          window.location.href = `${redirectTo}?token=${response.token}`;
        } else {
          setError('Falha no login. Verifique suas credenciais.');
        }
      }
    } catch (err) {
      setError('Falha no login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoginHeader />
      <FormContainer>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Área de Autenticação
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Utilize usuário e senha para identificação
        </Typography>
        {location.search.includes('expired=true') && <SessionExpiredDialog />}
        <form onSubmit={handleNext}>
          {step === 1 && (
            <TextField
              label="Usuário"
              variant="outlined"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
          )}
          {step === 2 && (
            <>
              <TextField
                label="Senha"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
            </>
          )}
          {error && (
            <Alert severity="error" sx={{ marginBottom: '1rem' }}>
              {error}
            </Alert>
          )}
          <LoginButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            startIcon={ssoName === 'microsoft' ? <MicrosoftIcon /> : null}
            disabled={(step === 1 && !userName) || (step === 2 && !password) || loading}
          >
            {loading ? <CircularProgress size={24} /> : ssoName === 'microsoft' ? 'Entrar com Microsoft' : step === 1 ? 'Próximo' : 'Entrar com conta OFM'}
          </LoginButton>
        </form>
      </FormContainer>
    </>
  );
};

export default Login;
