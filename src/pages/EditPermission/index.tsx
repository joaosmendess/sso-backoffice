import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { usePermissions } from '../../hooks/usePermission';
import Header from '../../components/Header';
import PermissionForm from '../../components/PermissionForm';

const EditPermission = () => {
  const { id } = useParams<{ id: string }>();
  
  const {
    permissions,
    loading,
    setGroupName,
    setCurrentPermissions,
    setSelectedGroup,
    setTabValue,
    tabValue,
    groupName,
    currentPermissions,
    
    modules,
    error,
    success,
    handleTabChange,
    handleSaveGroupName,
    handleSavePermissions,
    handlePermissionChange,
    handleGroupChange,
    handleModuleChange,
  } = usePermissions();

  useEffect(() => {
    const perm = permissions.find((p) => p.id === Number(id));
    if (perm) {
      setSelectedGroup(Number(id));
      setGroupName(perm.name);
      setCurrentPermissions({
        ...perm,
        modules_id: perm.modules_id,
      });
      setTabValue(1); // Define a aba "Módulos" como a aba inicial
    }
  }, [id, permissions, setGroupName, setCurrentPermissions, setSelectedGroup, setTabValue]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Header />
      <PermissionForm
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        groupName={groupName}
        setGroupName={setGroupName}
        selectedGroup={Number(id)}
        setSelectedGroup={setSelectedGroup}
        currentPermissions={currentPermissions}
        setCurrentPermissions={setCurrentPermissions}
        permissionGroups={permissions}
        modules={modules}
        loading={loading}
        handleSaveGroupName={handleSaveGroupName}
        handleSavePermissions={handleSavePermissions}
        handlePermissionChange={handlePermissionChange}
        handleGroupChange={handleGroupChange}
        handleModuleChange={handleModuleChange}
        error={error}
        success={success}
      />
    </>
  );
};

export default EditPermission;
