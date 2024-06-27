import React, { useState } from 'react';
import { ListItem, ListItemText, ListItemAvatar, Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { styled } from '../../stitches.config';

const StatusLabel = styled('span', {
  marginLeft: 'auto',
  variants: {
    active: {
      true: { color: 'green' },
      false: { color: 'red' },
    },
  },
});

interface PermissionItemProps {
  permission: any;
  onDelete: (permissionId: string) => void;
}

const PermissionItem: React.FC<PermissionItemProps> = ({ permission, onDelete }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    navigate(`/gerenciar-permissoes/${permission.id}`);
  };

  const handleDelete = () => {
    onDelete(permission.id);
    handleMenuClose();
  };

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          {permission.name.charAt(0)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={permission.name} />
      <StatusLabel active={permission.status === 'Ativo'}>
        {permission.status}
      </StatusLabel>
      <IconButton onClick={handleMenuClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Editar</MenuItem>
        <MenuItem onClick={handleDelete}>Excluir</MenuItem>
      </Menu>
    </ListItem>
  );
};

export default PermissionItem;
