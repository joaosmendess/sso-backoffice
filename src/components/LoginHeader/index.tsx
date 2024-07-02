
import { styled } from '../../stitches.config';
import logo from '../../assets/logo 1.png'





const Logo = styled('img', {
  height: '50px',
});

const LoginHeader = () => {


  return (
    <>
      <Logo src={logo} alt="Logo"   />
      
    </>
  );
};

export default LoginHeader;
