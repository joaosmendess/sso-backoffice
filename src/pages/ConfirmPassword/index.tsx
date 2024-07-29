import React, { useState } from 'react';
import { 
  LinearProgress, 
  Alert, 
  useMediaQuery, 
  useTheme, 
  Box, 
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

const ConfirmPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      setLoading(false);
      return;
    }

    try {
      // Adicione aqui a lógica para confirmar a nova senha
      setSubmitted(true);
      setError(null);
    } catch (err) {
      setError('Falha ao redefinir a senha. Verifique suas informações.');
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
  label="Nova Senha"
  id="input-new-password"
  variant="outlined"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
  margin="normal"
/>
<InputField
  label="Confirmar Nova Senha"
  id="input-confirm-password"
  variant="outlined"
  type="password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  required
  margin="normal"
/>
            {error && (
              <Alert severity="error" sx={{ marginBottom: '1rem', opacity: error ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
                {error}
              </Alert>
            )}
            {submitted && (
              <Alert severity="success">Sua senha foi redefinida com sucesso.</Alert>
            )}
            <ButtonContainer>
            <Button
  id="button-reset-password"
  sx={{textTransform: 'none' }}
  type="submit"
  variant="contained"
  color="primary"
  disabled={loading || !password || !confirmPassword}
>
  Redefinir senha
</Button>
           
            </ButtonContainer>
          </Form>
        </RightContainer>
      </FormContainer>
    </Box>
  );
};

export default ConfirmPassword;
