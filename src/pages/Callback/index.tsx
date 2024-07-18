import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const tokenThresholdLength = 1245; // Defina o valor apropriado para o comprimento do token

const CallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    console.log('Captured token:', token); // Log para depuração

    const decodeToken = (token:string) => {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
      } catch (error) {
        console.error('Erro ao decodificar token:', error);
        return null;
      }
    };

    const handleTokenValidation = async (token:string) => {
      try {
        console.log('Validating token with server:', token);
        const response = await fetch('http://10.1.151:8000/api/auth/validate-jwt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Server response data:', data);

          if (data && data.token && data.customerData) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('customerData', JSON.stringify(data.customerData));

            console.log('Token validado e armazenado:', data.token);
            window.location.href = '/select-product/';
          } else {
            console.error('Token ou customerData não retornado na resposta:', data);
            navigate('/', { replace: true });
          }
        } else {
          console.error('Erro HTTP ao validar token:', response.status);
          navigate('/login/:companyName', { replace: true });
        }
      } catch (error) {
        console.error('Erro ao validar token:', error);
        navigate('/login:companyName', { replace: true });
      }
    };

    if (token) {
      if (token.length > tokenThresholdLength) {
        console.log('Token length is above threshold, proceeding with server validation');
        handleTokenValidation(token);
      } else {
        console.log('Token length is within threshold, decoding token locally');
        const decodedToken = decodeToken(token);
        console.log('Decoded token:', decodedToken); // Log para depuração

        if (decodedToken && decodedToken.name && decodedToken.username) {
          const { name, username } = decodedToken;

          console.log('Token já validado, redirecionando para /select-product');
          localStorage.setItem('token', token);
          localStorage.setItem('customerData', JSON.stringify({ name, username }));

          window.location.href = '/select-product/';
        } else {
          console.error('Dados necessários não encontrados no token decodificado');
          navigate('/login/:companyName', { replace: true });
        }
      }
    } else {
      console.log('Nenhum token encontrado na URL');
      navigate('/login/:companyName', { replace: true });
    }
  }, [location.search, navigate]);

  return null; // Este componente não precisa renderizar nada
};

export default CallbackPage;
