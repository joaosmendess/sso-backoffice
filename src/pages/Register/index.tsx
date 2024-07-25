import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LinearProgress, Alert, useMediaQuery, useTheme, Box, IconButton, InputAdornment, Typography, Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {jwtDecode} from 'jwt-decode';
import { confirmRegistration } from '../../services/registerService';

import LoginHeader from '../../components/LoginHeader';
import animated from '../../assets/olShi6AW2pQj75e9EX (1).mp4';

import { 
  FormContainer,
  HeaderContainer,
  ButtonContainer,
  LoginButton,
  InputField,
  Form,
  ImageContainer,
  LeftContainer,
  RightContainer,
  Divider,
} from './styles';

interface DecodedToken {
  invitationEmail: string;
  companyId: string;
  tagCompany: string;
}

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [invitationEmail, setInvitationEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [tagCompany, setTagCompany] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenParam = searchParams.get('token');

    if (tokenParam) {
      try {
        const decoded: DecodedToken = jwtDecode<DecodedToken>(tokenParam);
        console.log('Decoded Token:', decoded); // Adicionando console.log para verificar os valores decodificados
        setInvitationEmail(decoded.invitationEmail);
        setCompanyId(decoded.companyId);
        setToken(tokenParam);
        setTagCompany(decoded.tagCompany);
      } catch (error) {
        console.error('Token decoding error:', error); // Adicionando console.log para erros de decodificação
        setError('Token inválido ou expirado.');
      }
    }
  }, [location.search]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyId) {
      setError('Empresa não encontrada.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      if (!token) {
        throw new Error('Token não encontrado.');
      }

      const response = await confirmRegistration(username, name, password, token);
      if (response) {
        setSuccessMessage('Registro bem-sucedido!');
        setTimeout(() => {
          if (tagCompany) {
            navigate(`/login/${tagCompany}`);
          } else {
            navigate(`/login`);
          }
        }, 3000); // Redireciona após 3 segundos
      }
    } catch (err: any) {
      let errorMessage = 'Não foi possível completar o registro. Verifique suas informações e tente novamente.';
      if (err.response && err.response.status) {
        // Mapear mensagens de erro específicas para mensagens amigáveis
        switch (err.response.status) {
          case 400:
            errorMessage = 'Token inválido';
            break;
          case 500:
            errorMessage = 'Erro interno do servidor. Por favor, tente novamente mais tarde.';
            break;
          default:
            errorMessage = 'Ocorreu um erro inesperado. Por favor, tente novamente.';
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
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
                Seu navegador não suporta tag de vídeo
              </video>
            </ImageContainer>
          </LeftContainer>
        )}

        {!isMobile && !isTablet && <Divider />}

        <RightContainer>
          <HeaderContainer>
            <LoginHeader />
          </HeaderContainer>
          <Form onSubmit={handleRegister}>
            <InputField
              label="Nome"
              id="input-name"
              variant="outlined"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              margin="normal"
            />
            <InputField
              label="Usuário"
              id="input-username"
              variant="outlined"
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
              margin="normal"
            />
            <InputField
              label="Email"
              id="input-email"
              variant="outlined"
              type="email"
              value={invitationEmail}
              onChange={(e) => setInvitationEmail(e.target.value)}
              required
              margin="normal"
              disabled // Campo de email desabilitado
            />
            <InputField
              label="Senha"
              id="input-password"
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
              <Alert severity="error" className='error-message' sx={{ marginBottom: '1rem', opacity: error ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
                {error}
              </Alert>
            )}
            {successMessage && (
              <Alert severity="success" className='success-message' sx={{ marginBottom: '1rem', opacity: successMessage ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
                {successMessage}
              </Alert>
            )}
            <ButtonContainer>
              <LoginButton
                type="submit"
                id="button-register"
                variant="contained"
                color="primary"
                sx={{ textTransform: "none" }} 
                disabled={!name || !username || !password || loading}
              >
                Registrar-se
              </LoginButton>
              <Typography variant="body2" color="textSecondary" align="center" sx={{ marginY: 0.5 }}>
                Já tem uma conta?
              </Typography>
              <Button
                variant='text'
                color='primary'
                sx={{ textTransform: "none" }}
                onClick={() => {
                  if (tagCompany) {
                    navigate(`/login/${tagCompany}`);
                  } else {
                    navigate(`/login`);
                  }
                }}
              >
                Entrar
              </Button>
            </ButtonContainer>
          </Form>
        </RightContainer>
      </FormContainer>
    </Box>
  );
};

export default Register;
