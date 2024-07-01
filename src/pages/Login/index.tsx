import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '../../stitches.config';
import { TextField, Button, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { login } from '../../services/auth';
import LoginHeader from '../../components/LoginHeader';
import SessionExpiredDialog from '../../components/SessionExpiredDialog';

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

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirect_to');

 

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null); // Limpar qualquer erro anterior
    try {
      const response = await login(userName, password);
      if (response && response.token && redirectTo)  {
      
        window.location.href = `${redirectTo}?token=${response.token}`;
      } else {
        setError('Falha no login. Verifique suas credenciais.');
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
            disabled={(step === 1 && !userName) || (step === 2 && !password) || loading}
          >
            {loading ? <CircularProgress size={24} /> : step === 1 ? 'Próximo' : 'Login'}
          </LoginButton>
        </form>
      </FormContainer>
    </>
  );
};

export default Login;
