import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardActionArea, CardContent, Button } from '@mui/material';
import { containerStyle, headingStyle, cardStyle, imageStyle, productNameStyle, containerLogoStyle } from './styles';
import { useNavigate, useParams } from 'react-router-dom';
import ofm from '../../../assets/logo-white.png';
import { logout } from '../../../services/authService';
import { getPublicCompany } from '../../../services/companyService';

interface Product {
  name: string;
  description: string;
  productionUrl: string;
  logo: string;
}

const SelectProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [username, setUserName] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [hashCompany, setHashCompany] = useState<string | null>(null);
  const navigate = useNavigate();
  const { companyName } = useParams<{ companyName: string }>();

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const company = await getPublicCompany(companyName || '');
        setHashCompany(company.tag);
      } catch (error) {
        console.error('Error fetching company:', error);
      }
    };

    const customerData = localStorage.getItem('customerData');
    console.log('Customer Data:', customerData);

    if (customerData) {
      const parsedData = JSON.parse(customerData);
      console.log('Parsed Data:', parsedData);

      const permissions = parsedData.permissions;
      const fetchedProducts = permissions.map((perm: any) => ({
        name: perm.application.name,
        description: perm.application.description,
        productionUrl: perm.application.productionUrl,
        logo: perm.application.logo,
      }));

      console.log('Fetched Products:', fetchedProducts);

      setProducts(fetchedProducts);
      setUserName(parsedData.username);
      setName(parsedData.name);
      setHashCompany(parsedData.hashCompany);

      fetchCompanyData();
    }
  }, [companyName]);

  const handleProductSelect = (product: Product) => {
    const token = localStorage.getItem('token');
    if (token && username && name) {
      window.location.href = `${product.productionUrl}/callback?token=${token}&name=${encodeURIComponent(name)}&username=${encodeURIComponent(username)}`;
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await logout(token);
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
    localStorage.removeItem('token');
    localStorage.removeItem('customerData');
    navigate(`/login/${hashCompany}`);
  };

  return (
    <Box sx={containerStyle}>
      <Box sx={containerLogoStyle}>
        <img src={ofm} alt="ofm logo" style={{ height: '40px' }} />
      </Box>
      <Typography variant="h4" gutterBottom sx={headingStyle}>
        {`Seja bem-vindo(a)${name ? `, ${name}` : ''}!`}
        <br />
        Selecione qual produto você deseja acessar.
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {products.map((product) => (
          <Grid item key={product.name} xs={5} sm={4} md={3} lg={2}>
            <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
              <Card sx={cardStyle}>
                <CardActionArea onClick={() => handleProductSelect(product)}>
                  <CardContent sx={{ padding: 0 }}>
                    <img src={product.logo} alt={product.name} style={imageStyle as React.CSSProperties} />
                  </CardContent>
                </CardActionArea>
              </Card>
              <Typography variant="h6" sx={productNameStyle}>
                {product.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Button onClick={handleLogout} variant="contained" color="error" sx={{ marginBottom: 4 }}>
        Sair
      </Button>
    </Box>
  );
};

export default SelectProduct;
