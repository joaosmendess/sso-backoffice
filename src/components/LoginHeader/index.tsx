
import { styled } from '../../stitches.config';
import logo from '../../assets/logo 1.png'



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

const LoginHeader = () => {


  return (
    <HeaderContainer >
      <Logo src={logo} alt="Logo"   />
      
    </HeaderContainer>
  );
};

export default LoginHeader;
