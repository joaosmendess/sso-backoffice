import { useState, useEffect } from 'react';
import { fetchPermissionGroups, deletePermissionGroup } from '../services/auth';

export const usePermissions = () => {
  const [permissions, setPermissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPermissionGroups();
        setPermissions(data);
      } catch (error) {
        setError('Erro ao buscar permissões');
        console.error('Erro ao buscar permissões', error);
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

  const deletePermission = async (permissionId: string) => {
    setDeleteLoading(true);
    try {
      await deletePermissionGroup(permissionId);
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

  return { permissions, loading, error, success, deleteLoading, deletePermission };
};
