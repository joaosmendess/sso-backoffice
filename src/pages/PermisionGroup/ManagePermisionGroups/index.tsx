import React from 'react';
import { styled } from '../../../stitches.config';
import { Box, Typography } from '@mui/material';
import Header from '../../../components/Header';
import PermissionForm from '../../../components/PermissionForm';
import PermissionTabs from '../../../components/PermissionTab';
import Error from '../../../components/Messages/ErrorMessage';
import Info from '../../../components/Messages/InfoMessage';
import Success from '../../../components/Messages/SuccessMessage';
import { useManagePermissions } from '../../../hooks/useManagePermissions';

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

const ManagePermissions = () => {
  const {
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
  } = useManagePermissions();

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
        {info && <Info message={info} />}
        {success && <Success message={success} />}
        <PermissionTabs tabValue={tabValue} handleTabChange={handleTabChange} />
        <PermissionForm
          tabValue={tabValue}
          groupName={groupName}
          setGroupName={setGroupName}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
          permissions={permissions}
          setPermissions={setPermissions}
          permissionGroups={permissionGroups}
          loading={loading}
          moduleId={1}
          empresaId={1}
          handleSaveGroupName={handleSaveGroupName}
          handleSavePermissions={handleSavePermissions}
          handlePermissionChange={handlePermissionChange}
          handleGroupChange={handleGroupChange}
        />
      </FormContainer>
    </>
  );
};

export default ManagePermissions;
