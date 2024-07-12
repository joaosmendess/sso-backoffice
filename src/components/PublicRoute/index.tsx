import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/select-product" /> : children;
};

export default PublicRoute;
