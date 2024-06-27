import React, { useState } from 'react';
import { styled } from '../../../stitches.config';
import { TextField, Typography, Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Header from '../../../components/Header';

const UserListContainer = styled(Box, {
  width: '100%',
  maxWidth: '400px',
  margin: '0 auto',
  padding: '1rem',
});

const StatusLabel = styled('span', {
  marginLeft: 'auto',
  variants: {
    active: {
      true: { color: 'green' },
      false: { color: 'red' },
    },
  },
});

const ListUsers = () => {
  const [users] = useState([
    { name: 'Wesley Yann Gitoni de Oliveira', email: 'wesley.oliveira@ofm.com', status: 'Inativo' },
    { name: 'João Mendes da Silva', email: 'joao.silva@ofm.com.br', status: 'Ativo' },
    { name: 'Ryzzan Abbade Salman', email: 'ryzzan.salman@ofm.com', status: 'Ativo' }
  ]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<null | string>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, userEmail: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(userEmail);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  return (
    <>
    <Header/>
    <UserListContainer>
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        Listar usuários
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Subtítulo conveniente aqui
      </Typography>
      <TextField
        label="Pesquise por nome ou e-mail"
        variant="outlined"
        type="search"
        fullWidth
        margin="normal"
        />
      <List>
        {users.map((user) => (
          <ListItem key={user.email}>
            <ListItemAvatar>
              <Avatar>
                {user.name.charAt(0)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email} />
            <StatusLabel active={user.status === 'Ativo'}>
              {user.status}
            </StatusLabel>
            <IconButton onClick={(event) => handleMenuClick(event, user.email)}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && selectedUser === user.email}
              onClose={handleMenuClose}
              >
              <MenuItem onClick={handleMenuClose}>Editar</MenuItem>
              <MenuItem onClick={handleMenuClose}>Excluir</MenuItem>
            </Menu>
          </ListItem>
        ))}
      </List>
    </UserListContainer>
              </>
  );
};

export default ListUsers;
