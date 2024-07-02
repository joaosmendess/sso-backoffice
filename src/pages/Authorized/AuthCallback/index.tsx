import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const redirectTo = searchParams.get('redirect_to');

    if (token && redirectTo) {
      localStorage.setItem('token', token);
      window.location.href = `${redirectTo}?token=${token}`;
    } else {
      navigate('/');
    }
  }, [location, navigate]);

  return <div>Redirecionando...</div>;
};

export default AuthCallback;
