import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { LinearProgress, Alert, useMediaQuery, useTheme, Box, IconButton, InputAdornment, Typography, Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { register, getPublicCompany } from '../../services/auth';
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

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [invitationEmail, setInvitationEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);

  const navigate = useNavigate();
  const { companyName } = useParams<{ companyName: string }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (companyName) {
      getPublicCompany(companyName)
        .then(response => {
          setCompanyId(response.id);
        })
        .catch(error => {
          console.error('Error fetching company:', error);
          setError('Erro ao buscar dados da empresa.');
        });
    }
  }, [companyName]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyId) {
      setError('ID da empresa não encontrado.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await register(name, userName, invitationEmail, password, companyId);
      if (response) {
        navigate(`/login/${companyName}`);
      } else {
        setError('Falha no registro. Verifique suas informações.');
      }
    } catch (err) {
      setError('Falha no registro. Verifique suas informações.');
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
              id="nameInput"
              label="Nome"
              variant="outlined"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              margin="normal"
            />
            <InputField
              id="userNameInput"
              label="Usuário"
              variant="outlined"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              margin="normal"
            />
            <InputField
              id="emailInput"
              label="Email"
              variant="outlined"
              type="email"
              value={invitationEmail}
              onChange={(e) => setInvitationEmail(e.target.value)}
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
            <ButtonContainer>
              <LoginButton
                id="registerButton"
                type="submit"
                variant="contained"
                color="primary"
                disabled={!name || !userName || !invitationEmail || !password || loading}
              >
                Registrar-se
              </LoginButton>
              <Typography variant="body2" color="textSecondary" align="center" sx={{ marginY: 0.5 }}>
                Já tem uma conta?
              </Typography>
              <Button variant='text' color='primary' onClick={() => navigate(`/login/${companyName}`)}>
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
