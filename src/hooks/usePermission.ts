import { useState, useEffect } from 'react';
import { fetchPermissionGroups, fetchModules, createPermissionGroup, updatePermissionGroup, deletePermissionGroup } from '../services/auth';
import { SelectChangeEvent } from '@mui/material';

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

export const usePermissions = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState(0);
  const [groupName, setGroupName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [currentPermissions, setCurrentPermissions] = useState<Permission>({
    id: 0,
    name: '',
    get: 1,
    post: 0,
    put: 0,
    delete: 0,
    modules_id: 1,
    empresa_id: 0,
    created_at: '',
    updated_at: '',
  });

  const [empresaId] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const permissionData = await fetchPermissionGroups();
        const moduleData = await fetchModules();
        setPermissions(permissionData);
        setModules(moduleData);
      } catch (error) {
        setError('Erro ao buscar dados');
        console.error('Erro ao buscar dados', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleTabChange = (_event: React.ChangeEvent<object>, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSaveGroupName = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const newGroup = await createPermissionGroup(groupName, currentPermissions, currentPermissions.modules_id, empresaId);
      setSelectedGroup(newGroup.id);
      setSuccess('Nome do grupo salvo com sucesso!');
      setTabValue(1);
    } catch (error) {
      console.error('Erro ao salvar nome do grupo', error);
      setError('Erro ao salvar nome do grupo');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePermissions = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      if (selectedGroup) {
        await updatePermissionGroup(selectedGroup.toString(), groupName, currentPermissions);
        setSuccess('Permissões atualizadas com sucesso!');
        resetForm();
      }
    } catch (error) {
      console.error('Erro ao salvar permissões', error);
      setError('Erro ao salvar permissões');
    } finally {
      setLoading(false);
    }
  };

  const updatePermission = async (id: string, name: string, permissions: Permission) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await updatePermissionGroup(id, name, permissions);
      const updatedPermissions = await fetchPermissionGroups();
      setPermissions(updatedPermissions);
      setSuccess('Permissão atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar permissão', error);
      setError('Erro ao atualizar permissão');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setGroupName('');
    setCurrentPermissions({
      id: 0,
      name: '',
      get: 1,
      post: 0,
      put: 0,
      delete: 0,
      modules_id: 1,
      empresa_id: 0,
      created_at: '',
      updated_at: '',
    });
    setSelectedGroup(null);
    setTabValue(0);
  };

  const handlePermissionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPermissions({
      ...currentPermissions,
      [event.target.name]: event.target.checked ? 1 : 0,
    });
  };

  const handleGroupChange = (event: SelectChangeEvent<number | string>) => {
    const groupId = event.target.value as number;
    const group = permissions.find((g) => g.id === groupId);
    if (group) {
      setSelectedGroup(group.id);
      setGroupName(group.name);
      setCurrentPermissions({
        id: group.id,
        name: group.name,
        get: group.get || 1,
        post: group.post || 0,
        put: group.put || 0,
        delete: group.delete || 0,
        modules_id: group.modules_id || 1,
        empresa_id: group.empresa_id,
        created_at: group.created_at,
        updated_at: group.updated_at,
      });
    }
  };

  const handleModuleChange = (event: SelectChangeEvent<number | string>) => {
    const moduleId = event.target.value as number;
    setCurrentPermissions({
      ...currentPermissions,
      modules_id: moduleId,
    });
  };

  const deletePermission = async (permissionId: number) => {
    setDeleteLoading(true);
    try {
      await deletePermissionGroup(permissionId.toString());
      setPermissions(permissions.filter(permission => permission.id !== permissionId));
      setSuccess('Permissão excluída com sucesso');
      setError(null);
    } catch (error) {
      setError('Erro ao excluir permissão');
      setSuccess(null);
      console.error('Erro ao excluir permissão', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return {
    permissions,
    modules,
    loading,
    error,
    success,
    deleteLoading,
    tabValue,
    setTabValue,
    groupName,
    setGroupName,
    selectedGroup,
    setSelectedGroup,
    currentPermissions,
    setCurrentPermissions,
    handleTabChange,
    handleSaveGroupName,
    handleSavePermissions,
    handlePermissionChange,
    handleGroupChange,
    handleModuleChange,
    deletePermission,
    updatePermission,
  };
};
