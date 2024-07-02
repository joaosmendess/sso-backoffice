import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Typography, LinearProgress, Alert } from '@mui/material';
import { login, getUser } from '../../services/auth';
import LoginHeader from '../../components/LoginHeader';
import SessionExpiredDialog from '../../components/SessionExpiredDialog';
import logo from '../../assets/sso-logo.png';

// Importando estilos de styles.ts
import {
  FormContainer,
  HeaderContainer,
  ButtonContainer,
  LoginButton,
  SSOButton,
  InputField,
  Form,
} from './styles';

const Login: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [debouncedUserName, setDebouncedUserName] = useState(userName);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirect_to');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedUserName(userName);
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [userName]);

  useEffect(() => {
    if (debouncedUserName) {
      const verifyUserName = async () => {
        setLoading(true);
        setError(null);
        try {
          const user = await getUser(debouncedUserName);
          if (user) {
            if (user.empresa.sso_name === null) {
              setLoading(false);
            } else {
              setLoading(false);
            }
          } else {
            setError('Usuário não encontrado. Verifique suas credenciais.');
          }
        } catch (err) {
          setError('Falha ao verificar o usuário. Insira um usuário válido.');
        } finally {
          setLoading(false);
        }
      };
      verifyUserName();
    }
  }, [debouncedUserName]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login(userName, password);
      if (response && response.token) {
        localStorage.setItem('token', response.token);
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

  const handleSSOPageNavigation = () => {
    navigate('/verify-sso');
  };

  return (
    <FormContainer>
      {loading && <LinearProgress sx={{ width: '100%', position: 'absolute', top: 0 }} />}
      <HeaderContainer>
        <LoginHeader />
      <Typography variant="h5" component="h1" align="left" gutterBottom>
        Área de Autenticação
      </Typography>
      <Typography variant="body2" align="left" gutterBottom>
        Utilize usuário e senha para identificação ou entre com SSO da sua empresa
      </Typography>
      </HeaderContainer>
      {location.search.includes('expired=true') && <SessionExpiredDialog />}
      <Form onSubmit={handleLogin}>
        <InputField
          label="Usuário"
          variant="outlined"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          margin="normal"
        />
        <InputField
          label="Senha"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          margin="normal"
        />
        {error && (
          <Alert severity="error" sx={{ marginBottom: '1rem', opacity: error ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
            {error}
          </Alert>
        )}
        <ButtonContainer>
          <LoginButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={!userName || !password || loading}
          >
            Entrar com Conta OFM
          </LoginButton>
          <SSOButton
            variant="contained"
            color="primary"
            startIcon={<img src={logo} alt="SSO Logo" style={{ height: 30 }} />}
            onClick={handleSSOPageNavigation}
          >
            Entrar com SSO da minha empresa
          </SSOButton>
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

export default Login;
