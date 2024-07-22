import { Box, styled } from "@mui/material";

export const FormContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    borderRadius: '15px',
    width: '100%',
    maxWidth: '500px',
    margin: '150px auto',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
    backgroundColor: "#FFFFFF",
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      padding: '1rem',
      maxWidth: '90%',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0.5rem',
      maxWidth: '100%',
      margin: '100px auto',
    },
}));