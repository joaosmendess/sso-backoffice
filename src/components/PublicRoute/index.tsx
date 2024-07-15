import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getPublicCompany } from '../../services/auth'; // Ajuste o caminho conforme necessário

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isValidCompany, setIsValidCompany] = useState(false);
  const { companyName } = useParams<{ companyName: string }>();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const company = await getPublicCompany(companyName || '');
        setIsValidCompany(!!company);
      } catch (error) {
        console.error('Error fetching company:', error);
        setIsValidCompany(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompany();
  }, [companyName]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isValidCompany ? (token ? <Navigate to={`/select-product/${companyName}`} /> : children) : <Navigate to="/" />;
};

export default PublicRoute;
