import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItemText, ListItemIcon, ListItemButton, Collapse } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const DrawerMenu = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [groupMenuOpen, setGroupMenuOpen] = useState(false);

  const handleUserMenuClick = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleGroupMenuClick = () => {
    setGroupMenuOpen(!groupMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href= '/';
    onClose();
  };

  const handleDashboardNavigation = () => {
    navigate('/dashboard');
    onClose();
  };
  const handleManageUser = () => {
    navigate('/gerenciar-usuario');
    onClose();
  };
  const handleListUsers = () => {
    navigate('/listar-usuario');
    onClose();
  };

  const handleManagePermissions = () => {
    navigate('/gerenciar-permissoes');
    onClose();
  };

  const handleListPermissions = () => {
    navigate('/listar-permissoes');
    onClose();
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        <ListItemButton onClick={handleDashboardNavigation}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Início" />
        </ListItemButton>
        <ListItemButton onClick={handleUserMenuClick}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Usuário" />
          {userMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={userMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          <ListItemButton onClick={handleManageUser} style={{ paddingLeft: 32 }}>
              <ListItemText primary="Gerenciar usuário" />
            </ListItemButton>
            <ListItemButton onClick={handleListUsers} style={{ paddingLeft: 32 }}>
              <ListItemText primary="Listar usuários" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={handleGroupMenuClick}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Grupo de permissão" />
          {groupMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={groupMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton onClick={handleManagePermissions}  style={{ paddingLeft: 32 }}>
              <ListItemText primary="Gerenciar grupo de permissão" />
            </ListItemButton>
            <ListItemButton onClick={handleListPermissions} style={{ paddingLeft: 32 }}>
              <ListItemText primary="Listar grupos de permissões" />
            </ListItemButton>
          </List>
        </Collapse>
      
       
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Sair" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default DrawerMenu;
