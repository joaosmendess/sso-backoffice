import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '../../stitches.config';
import { TextField, Button, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { login, getUser } from '../../services/auth';
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


const Login: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirect_to');
  const isExternalSSO = searchParams.get('external_login') === 'true';

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setLoading(true);
      try {
        const user = await getUser(userName);
        if (user) {
          if (isExternalSSO) {
           // await handleExternalSsoLogin();
           window.location.href = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=828b37a8-9793-4e75-aae2-79f295efdf75&redirect_uri=http%3A%2F%2Flocalhost%3A8989%2Fauth%2Fcallback&scope=User.Read&response_type=code&state=i91hEpuPujpJIoa9B1EGjxdggagTjSDpn0qDNBiI`
          } else {
            setStep(2);
          }
        } else {
          setError('Usuário não encontrado. Verifique suas credenciais.');
        }
      } catch (error) {
        if (error instanceof Error) {
          setError('Erro ao verificar usuário. Tente novamente mais tarde.');
        } else {
          setError('Erro desconhecido ao verificar usuário.');
        }
      } finally {
        setLoading(false);
      }
    } else {
      handleLogin();
    }
  };

  //http://localhost:5173/auth/callback?code=0.Ab0ATcTiWs4BwE-WmJokKoueZKg3i4KTl3VOquJ58pXv33UDAQA.AgABBAIAAAApTwJmzXqdR4BN2miheQMYAgDs_wUA9P8lYUF959FjsENeEMILuhEzI4SgBFfX3KbHDRDQ-lEbUBVLzB9QH5Oai0FHQNJfcprhvNQ83ZNfYoFizJcKDPSesm2B1BkPP4zAc_b9BO1M-CvX1y-zZfOyvZfD_1DOLhx9HUNUyLcDgn4GXTOWf2F3DjGpHfes-PDSGZPiSgVyCEKqvPeH38SJPnCQ6HtDFTBSBN4dRWgEuE8ognJhzgnIx4Ij7cpMs8qe4iUKNMjqPrmgzZtL0CWu1SX5JfjYdo5Q3BgZqZbVdLyxSm178Ra-rIz8HrVEuuDZZF3LsVlhnpLbtYm3SI8cp4NddRdNm11KHjv09JY3CNISTbGjgV2dvQhpvZ5or-UFQU7lDXV_Mfzbuwm2nR-hxylFKmz9aOErXycGCDjMLxCNHoGcb7IE97ka4sioYlWJ911bJGB-02Roi5Os3e17s1kZaDj9T24AjbAvw1CQ5hoaY3klETFfxfKpe9iCP2SQSmzRzODqnQb63_G0Wdi6H7zkUqTfnsd_-hljgAACojHvkA5uNopi6tYhq57v67FDlwMCyQ5424TXzpseahdsu66-dZkHMwia0l2FvMVbibCNBEvM50S2sjQlMGqLzBm_C6_yi5yOvxVyC3msb5hcnSKdNOVlXEnl_KjoKOg4pMPQDXb-RQ&state=i91hEpuPujpJIoa9B1EGjxdggagTjSDpn0qDNBiI&session_state=2dc46148-923e-4237-8511-7b123182d828#

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await login(userName, password);
      if (response && response.token) {
        sessionStorage.setItem('token', response.token);
        window.location.href = `${redirectTo}?token=${response.token}`;
      } else {
        setError('Falha no login. Verifique suas credenciais.');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError('Falha no login. Verifique suas credenciais.');
      } else {
        setError('Erro desconhecido no login.');
      }
    } finally {
      setLoading(false);
    }
  };

  /* const handleExternalSsoLogin = async () => {
    try {
      const response = await fetch('http://10.1.1.151:8989/auth/redirect', {
        method: 'GET',
        credentials: 'include', // Adicionado para incluir cookies
        redirect: 'manual', // Impedir redirecionamento automático
      });

      // Verifique o status da resposta e o local do redirecionamento
      if (response.status === 302) {
        const locationHeader = response.headers.get('Location');
        if (locationHeader) {
          window.location.href = locationHeader; // Redireciona para a URL da Microsoft
        } else {
          setError('Não foi possível obter a URL de redirecionamento.');
        }
      } else {
        setError(`Erro ao redirecionar para o SSO. Status: ${response.status}`);
      }
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(`Erro ao redirecionar para o SSO. Detalhes: ${err.message}`);
      } else {
        setError('Erro desconhecido ao redirecionar para o SSO.');
      }
    }
  };
*/
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
