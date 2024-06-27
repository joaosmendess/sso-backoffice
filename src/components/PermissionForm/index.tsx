import React from 'react';
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Typography,
  Tabs,
  Tab,
  SelectChangeEvent,
} from '@mui/material';
import { styled } from '../../stitches.config';
import TabPanel from '../PermissionTab';

const SaveButton = styled(Button, {
  marginTop: '1rem',
});

interface Permission {
  id: number;
  name: string;
  get: number;
  post: number;
  put: number;
  delete: number;
  modules_id: number;
  empresa_id: number;
  created_at: string;
  updated_at: string;
}

interface Module {
  id: number;
  name: string;
  empresa_id: number;
  created_at: string;
  updated_at: string;
}

interface PermissionFormProps {
  tabValue: number;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  groupName: string;
  setGroupName: (name: string) => void;
  selectedGroup: number | null;
  setSelectedGroup: (id: number | null) => void;
  currentPermissions: Permission;
  setCurrentPermissions: (permissions: Permission) => void;
  permissionGroups: Permission[];
  modules: Module[];
  loading: boolean;
  handleSaveGroupName: (event: React.FormEvent) => void;
  handleSavePermissions: (event: React.FormEvent) => void;
  handlePermissionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleGroupChange: (event: SelectChangeEvent<number | string>) => void;
  handleModuleChange: (event: SelectChangeEvent<number | string>) => void;
  error: string | null;
  success: string | null;
}

const PermissionForm: React.FC<PermissionFormProps> = ({
  tabValue,
  handleTabChange,
  groupName,
  setGroupName,
  currentPermissions,
  modules,
  loading,
  handleSaveGroupName,
  handleSavePermissions,
  handlePermissionChange,
  handleModuleChange,
  error,
  success,
}) => {
  return (
    <Box sx={{ maxWidth: '600px', margin: 'auto', mt: 4 }}>
      {error && <Typography color="error" variant="body1">{error}</Typography>}
      {success && <Typography color="primary" variant="body1">{success}</Typography>}

      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Principais" />
        <Tab label="Módulos" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <form onSubmit={handleSaveGroupName}>
          <TextField
            label="Nome do grupo"
            variant="outlined"
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <SaveButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : '+ Salvar'}
          </SaveButton>
        </form>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <form onSubmit={handleSavePermissions}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Módulo</InputLabel>
            {loading ? (
              <CircularProgress />
            ) : (
              <Select
                label="Módulo"
                value={currentPermissions.modules_id || ''}
                onChange={handleModuleChange}
                required
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {modules.map((module) => (
                  <MenuItem key={module.id} value={module.id}>
                    {module.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FormControl>
          <Box display="flex" flexDirection="column" alignItems="start" width="100%">
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(currentPermissions.get)}
                  onChange={handlePermissionChange}
                  name="get"
                />
              }
              label="Ler"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(currentPermissions.post)}
                  onChange={handlePermissionChange}
                  name="post"
                />
              }
              label="Criar"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(currentPermissions.put)}
                  onChange={handlePermissionChange}
                  name="put"
                />
              }
              label="Editar"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(currentPermissions.delete)}
                  onChange={handlePermissionChange}
                  name="delete"
                />
              }
              label="Apagar"
            />
          </Box>
          <SaveButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : '+ Salvar'}
          </SaveButton>
        </form>
      </TabPanel>
    </Box>
  );
};

export default PermissionForm;
