import React, { useState } from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PermissionGroup } from '../../types';

interface PermissionItemProps {
  permissionGroup: PermissionGroup;
  onDelete: () => void;
  onEdit: () => void;
}

const PermissionItem: React.FC<PermissionItemProps> = ({ permissionGroup, onDelete, onEdit }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit();
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete();
    handleMenuClose();
  };

  return (
    <ListItem>
      <ListItemText primary={permissionGroup.name} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="menu" onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleEdit}>Editar</MenuItem>
          <MenuItem onClick={handleDelete}>Deletar</MenuItem>
        </Menu>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default PermissionItem;
