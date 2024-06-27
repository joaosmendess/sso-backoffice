import React from 'react';
import { styled } from '../../../stitches.config';
import { Box, Typography } from '@mui/material';
import Header from '../../../components/Header';
import PermissionForm from '../../../components/PermissionForm';
import Error from '../../../components/Messages/ErrorMessage';
import Success from '../../../components/Messages/SuccessMessage';
import { usePermissions } from '../../../hooks/usePermission';

const FormContainer = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  backgroundColor: 'white',
  borderRadius: '8px',
  maxWidth: '800px',
  margin: '0 auto',
});

const ManagePermissions: React.FC = () => {
  const {
    tabValue,
    groupName,
    setGroupName,
    selectedGroup,
    setSelectedGroup,
    currentPermissions: permissions,
    setCurrentPermissions: setPermissions,
    permissions: permissionGroups,
    modules,
    loading,
    error,
    success,
    handleTabChange,
    handleSaveGroupName,
    handleSavePermissions,
    handlePermissionChange,
    handleGroupChange,
    handleModuleChange,
  } = usePermissions();

  return (
    <>
      <Header />
      <FormContainer>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Gerenciar Permissões
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Subtítulo conveniente aqui
        </Typography>
        {error && <Error message={error} />}
        {success && <Success message={success} />}
        <PermissionForm
          tabValue={tabValue}
          handleTabChange={handleTabChange}
          groupName={groupName}
          setGroupName={setGroupName}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
          currentPermissions={permissions}
          setCurrentPermissions={setPermissions}
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
        />
      </FormContainer>
    </>
  );
};

export default ManagePermissions;
