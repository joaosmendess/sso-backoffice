import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getPublicCompany } from '../../services/auth'; // Ajuste o caminho conforme necessário

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isValidCompany, setIsValidCompany] = useState(false);
  const { companyName } = useParams<{ companyName: string }>();

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

  return isValidCompany ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;
