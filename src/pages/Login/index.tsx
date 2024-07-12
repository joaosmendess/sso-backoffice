// src/pages/Login.tsx
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { LinearProgress, Alert, useMediaQuery, useTheme, Box, IconButton, InputAdornment, Typography, Button } from '@mui/material';
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

const Login: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login(userName, password);
      if (response && response.token) {
        // Armazena o token e o customerData no localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('customerData', JSON.stringify(response.customerData));
        // Redireciona para a página de seleção de produtos
        navigate('/select-product');
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
  const handleRegisterNavigation = () => {
    navigate('/register');
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
              id="userName"
              label="Usuário"
              variant="outlined"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              margin="normal"
            />
            <InputField
              id="password"
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
            <ButtonContainer>
              <LoginButton
                id="loginButton"
                type="submit"
                variant="contained"
                color="primary"
                disabled={!userName || !password || loading}
              >
                Entrar
              </LoginButton>

              <SSOButton
                variant="contained"
                color="primary"
                startIcon={<img src={logo} alt="SSO Logo" style={{ height: 30 , marginLeft:10}} />}
                onClick={handleSSOPageNavigation}
                >
                  entrar com SSO externo
                </SSOButton>
              <Typography variant="body2" color="textSecondary" align="center" sx={{ marginY: 0.5 }}>
            Ainda não possue conta?
          </Typography>
          <Button variant='text' color='primary'  onClick={handleRegisterNavigation}>
                Registrar-se
              </Button>
                
              
            </ButtonContainer>
          </Form>
        </RightContainer>
      </FormContainer>
    </Box>
  );
};

export default Login;
