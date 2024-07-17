import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LinearProgress, Alert, useMediaQuery, useTheme, Box, IconButton, InputAdornment, Typography, Button, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { login } from '../../services/auth';
import LoginHeader from '../../components/LoginHeader';
import logo from '../../assets/key.png';
import animated from '../../assets/olShi6AW2pQj75e9EX (1).mp4';
import {
  FormContainer,
  HeaderContainer,
  ButtonContainer,
  LoginButton,
  SSOButton,
  InputField,
  Form,
  ImageContainer,
  LeftContainer,
  RightContainer,
  Divider,
} from './styles';

interface HttpError extends Error {
  response?: {
    status: number;
    data: unknown;
  };
}

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const { companyName } = useParams<{ companyName: string }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await login(username, password, companyName || '');
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('customerData', JSON.stringify(response.customerData));
        setSuccessMessage('Login bem-sucedido! Redirecionando...');
        setTimeout(() => navigate('/select-product'), 2000);
      } else {
        setError('Falha no login. Verifique suas credenciais.');
      }
    } catch (err) {
      const httpError = err as HttpError;
      if (httpError.response) {
        if (httpError.response.status === 400) {
          setError('Usuário não encontrado.');
        } else if (httpError.response.status === 401) {
          setError('Credenciais inválidas. Por favor, tente novamente.');
        } else if (httpError.response.status === 404) {
          setError('Empresa não encontrada.');
        } else if (httpError.response.status === 500) {
          setError('Erro interno do servidor. Por favor, tente novamente mais tarde.');
        } else {
          setError('Ocorreu um erro inesperado. Tente novamente mais tarde.');
        }
      } else {
        setError('Ocorreu um erro inesperado. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSSOPageNavigation = () => {
    navigate(`/verify-sso/${companyName}`);
  };

  const handleRegisterNavigation = () => {
    navigate(`/register/${companyName}`);
  };

  const handleForgotPasswordNavigation = () => {
    navigate(`/forgot-password/${companyName}`);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        opacity: 0,
        transform: 'translateY(50px)',
        animation: 'fadeIn 0.5s forwards',
        '@keyframes fadeIn': {
          'to': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      }}
    >
      <FormContainer>
        {loading && <LinearProgress sx={{ width: '100%', position: 'absolute', top: 0 }} />}
        
        {!isMobile && !isTablet && (
          <LeftContainer>
            <ImageContainer>
              <video width="100%" height="auto" autoPlay loop muted>
                <source src={animated} type="video/mp4" />
                Seu navegador nao suporta tag de video
              </video>
            </ImageContainer>
          </LeftContainer>
        )}

        {!isMobile && !isTablet && <Divider />}

        <RightContainer>
          <HeaderContainer>
            <LoginHeader />
          </HeaderContainer>
          <Form onSubmit={handleLogin}>
            <InputField
              id="userNameInput"
              label="Usuário"
              variant="outlined"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              margin="normal"
            />
            <InputField
              id="passwordInput"
              label="Senha"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {error && (
              <Alert severity="error" sx={{ marginBottom: '1rem', opacity: error ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
                {error}
              </Alert>
            )}
            {successMessage && (
              <Alert severity="success" sx={{ marginBottom: '1rem', opacity: successMessage ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
                {successMessage}
              </Alert>
            )}
            <ButtonContainer>
              <LoginButton
                id="loginButton"
                type="submit"
                variant="contained"
                color="primary"
                disabled={!username || !password || loading}
              >
                Entrar
              </LoginButton>

              <SSOButton
                variant="contained"
                color="primary"
                startIcon={<img src={logo} alt="SSO Logo" style={{ height: 30, marginLeft: 10 }} />}
                onClick={handleSSOPageNavigation}
              >
                entrar com SSO externo
              </SSOButton>
              <Typography variant="body2" color="textSecondary" align="center" sx={{ marginY: 0}}>
                Ainda não possui conta?
              </Typography>
              <Button variant='text' color='primary' onClick={handleRegisterNavigation}>
                Registrar-se
              </Button>
            </ButtonContainer>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <Link 
                component="button" 
                variant="body2" 
                onClick={handleForgotPasswordNavigation} 
                underline="none"
                sx={{ textAlign: 'right' }}
              >
                Esqueceu sua senha?
              </Link>
            </Box>
          </Form>
        </RightContainer>
      </FormContainer>
    </Box>
  );
};

export default Login;
