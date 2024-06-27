
import { styled } from '../../stitches.config';
import logo from '../../assets/logo 1.png'
import { useNavigate } from 'react-router-dom';
import DrawerMenu from '../../components/DrawerMenu';
import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const HeaderContainer = styled('header', {
  backgroundColor: 'white',
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #ddd',
});

const Logo = styled('img', {
  height: '50px',
});

const Header = () => {
    const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <HeaderContainer >
      <Logo src={logo} alt="Logo"  onClick={()=> navigate('/')} />
      <Box>
      <IconButton onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <DrawerMenu open={drawerOpen} onClose={toggleDrawer} />
      </Box>
    </HeaderContainer>
  );
};

export default Header;
