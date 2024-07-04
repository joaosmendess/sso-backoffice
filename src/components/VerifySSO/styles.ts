import { Box, Button, TextField, styled } from "@mui/material";

// Usando o styled do Material-UI para estilizar componentes do Material-UI
export const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  borderRadius: '8px',
  width: '100%',
  maxWidth: '400px',
  margin: '150px auto',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
  backgroundColor:"#FFFFFF",
  position: 'relative', // Adicionado para posicionamento do LinearProgress

  [theme.breakpoints.down('sm')]: {
    padding: '1rem',
    maxWidth: '90%',
  },
}));

export const HeaderContainer = styled(Box)({
  alignSelf: 'flex-start',
  marginBottom: '20px',
  marginTop: '20px',
});

export const ButtonContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  marginTop: '1rem',
  gap: '15px',
});

export const LoginButton = styled(Button)({
  width: '100%',
  '&:hover': {
      backgroundColor:'#388e3c',
  },
});

export const SSOButton = styled(Button)({
  whiteSpace: 'nowrap',
  width: '100%',
});

export const InputField = styled(TextField)({
  width: '100%',
});

export const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});
