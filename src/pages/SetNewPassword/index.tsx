import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LinearProgress, Alert, useMediaQuery, useTheme, Box, Typography, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { setNewPassword } from '../../services/authService';
import animated from '../../assets/41q1lZI600kL6G91Wb.mp4';

import { FormContainer, HeaderContainer, ButtonContainer, Form, ImageContainer, LeftContainer, RightContainer, Divider } from './styles';

const SetNewPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Extrair o token da query string
  const token = new URLSearchParams(location.search).get('token');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      setLoading(false);
      return;
    }

    if (!token) {
      setError('Token de redefinição inválido.');
      setLoading(false);
      return;
    }

    try {
      const response = await setNewPassword({ token, password, password_confirmation: confirmPassword });
      setSubmitted(true);
      setError(null);
      navigate(`/login/${response.hashCompany}`);
    } catch (err) {
      setError('Falha ao redefinir a senha. Verifique suas informações.');
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box
      id="set-new-password-page"
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
            <Typography variant="h5" component="h1" gutterBottom color='InfoText'>
              Escolha sua nova senha
            </Typography>
          </HeaderContainer>
          <Form onSubmit={handleSubmit}>
            <TextField
              label="Nova Senha"
              id="input-new-password"
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
            <TextField
              label="Confirmar Nova Senha"
              id="input-confirm-password"
              variant="outlined"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            {submitted && (
              <Alert severity="success">Senha redefinida com sucesso. Você pode agora fazer login com sua nova senha.</Alert>
            )}
            <ButtonContainer>
              <Button
              sx={{textTransform:'none'}}
                type="submit"
                id="button-set-new-password"
                variant="contained"
                color="primary"
                disabled={!password || !confirmPassword || loading}
              >
                Redefinir Senha
              </Button>
           
            </ButtonContainer>
          </Form>
        </RightContainer>
      </FormContainer>
    </Box>
  );
};

export default SetNewPassword;
