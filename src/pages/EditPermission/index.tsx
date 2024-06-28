import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { usePermissions } from '../../hooks/usePermission';
import Header from '../../components/Header';
import PermissionForm from '../../components/PermissionForm';
import LoadingDialog from '../../components/LoadingDialog';

const EditPermission = () => {
  const { id } = useParams<{ id: string }>();
  
  const {
    permissionGroups,
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

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsEditing(true);
    const perm = permissionGroups.find((p) => p.id === Number(id));
    if (perm) {
      setSelectedGroup(Number(id));
      setGroupName(perm.name);
      setCurrentPermissions({
        id: perm.id,
        name: perm.name,
        get: 1, // Default value, assuming "Ler" is always enabled
        post: 0, // Default values, adjust if necessary
        put: 0, // Default values, adjust if necessary
        delete: 0, // Default values, adjust if necessary
        modules_id: 0, // Default values, adjust if necessary
        permissions_groups_id: perm.id,
        created_at: perm.created_at,
        updated_at: perm.updated_at
      });
      setTabValue(1); // Define a aba "Módulos" como a aba inicial
    }
    setIsEditing(false);
  }, [id, permissionGroups, setGroupName, setCurrentPermissions, setSelectedGroup, setTabValue]);

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
        permissionGroups={permissionGroups}
        modules={modules}
        loading={loading}
        handleSaveGroupName={handleSaveGroupName}
        handleSavePermissions={handleSavePermissions}
        handlePermissionChange={handlePermissionChange}
        handleGroupChange={handleGroupChange}
        handleModuleChange={handleModuleChange}
        error={error}
        success={success}
        isEditMode={true}
      />
      <LoadingDialog open={isEditing} message="Carregando dados, por favor aguarde..." />
    </>
  );
};

export default EditPermission;
