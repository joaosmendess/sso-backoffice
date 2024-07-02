import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const CallbackPage = () => {
  const location = useLocation();
  const [userData, setUserData] = useState({ name: '', userName: '', token: '' });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get('name') || '';
    const userName = queryParams.get('userName') || '';
    const token = queryParams.get('token') || '';

    setUserData({ name, userName, token });
  }, [location]);

  return (
    <div>
      <h1>Autenticação realizada com sucesso</h1>
      <p>Name: {userData.name}</p>
      <p>UserName: {userData.userName}</p>
      <p>Token: {userData.token}</p>
    </div>
  );
};

export default CallbackPage;
