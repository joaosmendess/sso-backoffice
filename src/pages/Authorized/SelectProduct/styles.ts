import { SxProps, Theme } from '@mui/system';

export const containerStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  flexDirection: 'column',
  color: '#fff', // Texto branco
  padding: '20px',
};

export const headingStyle: SxProps<Theme> = {
  marginBottom: 4,
  color: '#f5f5f5', // Cor do texto
  textShadow: '2px 2px 4px rgba(0,0,0,0.5)', // Sombra do texto
  textAlign:'center'
};

export const cardStyle: SxProps<Theme> = {
  width: '100%',
  maxWidth: '250px',
  aspectRatio: '1 / 1', // Para manter a proporção quadrada
  backgroundColor: '#f5f5f5', // Fundo do card
  color: '#fff', // Texto do card
  borderRadius: '15px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.6)',
  overflow: 'hidden', // Garantir que o conteúdo do card não saia dos limites
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)', // Efeito de zoom ao passar o mouse
  },
  '@media (max-width: 600px)': {
    maxWidth: '150px',
  },
};

export const imageStyle: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  objectFit: 'cover', 
};

export const productNameStyle: SxProps<Theme> = {
  marginTop: 2,
  color: '#f5f5f5', // Cor do texto
  textShadow: '1px 1px 2px rgba(0,0,0,0.3)', // Sombra do texto
  
  textAlign:'center'
};
