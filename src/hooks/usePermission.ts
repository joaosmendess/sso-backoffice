import { useState, useEffect } from 'react';
import {
  createPermissionGroup,
  updatePermissionGroup,
  deletePermissionGroup,
  fetchPermissionGroups,
  fetchModules,
  fetchUsers
} from '../services/auth';
import { SelectChangeEvent } from '@mui/material';
import { PermissionGroup, Permission, Module, User } from '../types';

export const usePermissions = () => {
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroup[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [users, setUsers] = useState<User[]>([]);
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
    permissions_groups_id: 0,
    created_at: '',
    updated_at: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedPermissionGroups, fetchedModules, fetchedUsers] = await Promise.all([
          fetchPermissionGroups(),
          fetchModules(),
          fetchUsers()
        ]);
        setPermissionGroups(fetchedPermissionGroups);
        setModules(fetchedModules);
        setUsers(fetchedUsers);
      } catch (error) {
        setError('Erro ao carregar dados');
        console.error('Erro ao carregar dados', error);
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
      const newGroup = await createPermissionGroup({ name: groupName, permissions: currentPermissions }, currentPermissions.modules_id, currentPermissions.permissions_groups_id);
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
        await updatePermissionGroup(selectedGroup.toString(), currentPermissions, groupName);
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

  const updatePermission = async (id: string, permissions: Permission, name: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await updatePermissionGroup(id, permissions, name);
      const updatedPermissionGroups = await fetchPermissionGroups();
      setPermissionGroups(updatedPermissionGroups);
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
      permissions_groups_id: 0,
      created_at: '',
      updated_at: ''
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
    const group = permissionGroups.find((g) => g.id === groupId);
    if (group) {
      setSelectedGroup(group.id);
      setGroupName(group.name);
      setCurrentPermissions({
        ...currentPermissions,
        permissions_groups_id: group.id
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
      setPermissionGroups(permissionGroups.filter(permission => permission.id !== permissionId));
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
    users,
    permissionGroups,
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
