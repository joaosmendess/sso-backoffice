import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LinearProgress, Alert, useMediaQuery, useTheme, Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { login } from '../../services/auth';
import LoginHeader from '../../components/LoginHeader';
import logo from '../../assets/sso-logo.png';
import background from '../../assets/background-login-transformed-fotor-2024070310319.webp';

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
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirect_to');

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
        // Redireciona para a aplicação principal com o token na URL
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
        backgroundColor: '#f5f5f5',
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
              <img src={background} alt="Chart and person" style={{ width: '100%', height: 'auto' }} loading='lazy'/>
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
                startIcon={<img src={logo} alt="SSO Logo" style={{ height: 30 }} />}
                onClick={handleSSOPageNavigation}
              >
                SSO Externo
              </SSOButton>
            </ButtonContainer>
          </Form>
        </RightContainer>
      </FormContainer>
    </Box>
  );
};

export default Login;
