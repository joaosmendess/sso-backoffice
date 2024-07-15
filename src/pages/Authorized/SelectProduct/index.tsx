import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardActionArea, CardContent, Button } from '@mui/material';
import { containerStyle, headingStyle, cardStyle, imageStyle, productNameStyle, containerLogoStyle } from './styles';
import { useNavigate } from 'react-router-dom';
import ofm from '../../../assets/logo-white.png';

interface Product {
  name: string;
  description: string;
  productionUrl: string;
  logo: string;
}

const SelectProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [userName, setUserName] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const customerData = localStorage.getItem('customerData');
    if (customerData) {
      const parsedData = JSON.parse(customerData);
      const permissions = parsedData.permissions;
      const fetchedProducts = permissions.map((perm: any) => ({
        name: perm.application.name,
        description: perm.application.description,
        productionUrl: perm.application.productionUrl,
        logo: perm.application.logo,
      }));
      setProducts(fetchedProducts);
      setUserName(parsedData.userName); // Assumindo que o userName está em customerData
      setName(parsedData.name); // Assumindo que o name está em customerData
    }
  }, []);

  const handleProductSelect = (product: Product) => {
    const token = localStorage.getItem('token');
    if (token && userName && name) {
      window.location.href = `${product.productionUrl}/callback?token=${token}&name=${encodeURIComponent(name)}&userName=${encodeURIComponent(userName)}`;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('customerData');
    navigate('/login/:companyName');
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
                  <CardContent sx={{ padding: 0 }}> {/* Remove padding to make the image occupy the entire card */}
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
      </Grid> <br />
      <Button onClick={handleLogout} variant="contained" color="error" sx={{ marginBottom: 4 }}>
        Sair
      </Button>
    </Box>
  );
};

export default SelectProduct;
