import { useState, useEffect } from 'react';
import { fetchPermissionGroups, createPermissionGroup, updatePermissionGroup } from '../services/auth';
import { SelectChangeEvent } from '@mui/material';

export const useManagePermissions = () => {
  const [tabValue, setTabValue] = useState(0);
  const [groupName, setGroupName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | ''>('');
  const [permissions, setPermissions] = useState({
    get: 0,
    post: 0,
    put: 0,
    delete: 0,
  });
  const [moduleId, setModuleId] = useState(1);
  const [empresaId, setEmpresaId] = useState(1);
  const [permissionGroups, setPermissionGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPermissionGroups();
        setPermissionGroups(data);
      } catch (error) {
        console.error('Erro ao buscar grupos de permissões', error);
        setError('Erro ao buscar grupos de permissões');
      }
    };
    fetchData();
  }, []);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSaveGroupName = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInfo(null);
    setSuccess(null);
    try {
      const newGroup = await createPermissionGroup(groupName, permissions, moduleId, empresaId);
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
    setInfo(null);
    setSuccess(null);
    try {
      if (selectedGroup) {
        await updatePermissionGroup(selectedGroup, groupName, permissions);
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

  const resetForm = () => {
    setGroupName('');
    setPermissions({
      get: 0,
      post: 0,
      put: 0,
      delete: 0,
    });
    setSelectedGroup('');
    setTabValue(0);
  };

  const handlePermissionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPermissions({
      ...permissions,
      [event.target.name]: event.target.checked ? 1 : 0,
    });
  };

  const handleGroupChange = (event: SelectChangeEvent<string>) => {
    const group = permissionGroups.find((g: any) => g.id === event.target.value);
    if (group) {
      setSelectedGroup(group.id);
      setGroupName(group.name);
      setPermissions({
        get: group.get || 0,
        post: group.post || 0,
        put: group.put || 0,
        delete: group.delete || 0,
      });
    }
  };

  return {
    tabValue,
    groupName,
    setGroupName,
    selectedGroup,
    setSelectedGroup,
    permissions,
    setPermissions,
    permissionGroups,
    loading,
    error,
    info,
    success,
    handleTabChange,
    handleSaveGroupName,
    handleSavePermissions,
    handlePermissionChange,
    handleGroupChange,
  };
};
