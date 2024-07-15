import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LinearProgress, 
  Alert, 
  useMediaQuery, 
  useTheme, 
  Box, 
  Typography, 
  Button 
} from '@mui/material';
import LoginHeader from '../../components/LoginHeader';
import animated from '../../assets/41q1lZI600kL6G91Wb.mp4';

import {
  FormContainer,
  HeaderContainer,
  ButtonContainer,
  InputField,
  Form,
  ImageContainer,
  LeftContainer,
  RightContainer,
  Divider,
} from './styles';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Adicione aqui a lógica para enviar o email de recuperação de senha
      setSubmitted(true);
      setError(null);
    } catch (err) {
      setError('Falha ao enviar o email de recuperação. Verifique suas informações.');
    } finally {
      setLoading(false);
    }
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
          <Form onSubmit={handleSubmit}>
            <InputField
              id="email"
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              margin="normal"
            />
            {error && (
              <Alert severity="error" sx={{ marginBottom: '1rem', opacity: error ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
                {error}
              </Alert>
            )}
            {submitted && (
              <Alert severity="success">Se um email correspondente for encontrado, você receberá instruções para redefinir sua senha.</Alert>
            )}
            <ButtonContainer>
              <Button
                id="resetButton"
                type="submit"
                variant="contained"
                color="primary"
                disabled={!email || loading}
              >
                Enviar
              </Button>
              <Typography variant="body2" color="textSecondary" align="center" sx={{ marginY: 0 }}>
                Lembrou sua senha?
              </Typography>
              <Button variant='text' color='primary' onClick={() => navigate('/')}>
                Entrar
              </Button>
            </ButtonContainer>
          </Form>
        </RightContainer>
      </FormContainer>
    </Box>
  );
};

export default ForgotPassword;
