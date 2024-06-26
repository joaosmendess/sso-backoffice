import { useState } from 'react';
import { styled } from '../../stitches.config';
import { TextField, Typography, Box, CircularProgress, List } from '@mui/material';
import Header from '../../components/Header';
import { usePermissions } from '../../hooks/usePermission';
import ErrorMessage from '../Messages/ErrorMessage';
import SuccessMessage from '../Messages/SuccessMessage';
import PermissionItem from '../PermissionItem';
import DeleteDialog from '../DeleteDialog';

const PermissionListContainer = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '400px',
  margin: '0 auto',
  padding: '1rem',
  '@media (max-width: 600px)': {
    padding: '0.5rem',
  },
});

const PermissionList = () => {
  const { permissions, loading, error, success, deleteLoading, deletePermission } = usePermissions();
  const [openDialog, setOpenDialog] = useState(false);
  const [permissionToDelete, setPermissionToDelete] = useState<null | string>(null);

  const handleDelete = (permissionId: string) => {
    setPermissionToDelete(permissionId);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setPermissionToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (permissionToDelete) {
      await deletePermission(permissionToDelete);
      handleDialogClose();
    }
  };

  return (
    <>
      <Header />
      <PermissionListContainer>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Listar permissões
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Subtítulo conveniente aqui
        </Typography>
        <TextField
          label="Pesquise por nome ou e-mail"
          variant="outlined"
          type="search"
          fullWidth
          margin="normal"
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {error && <ErrorMessage message={error} />}
            {success && <SuccessMessage message={success} />}
            <List style={{ width: '100%' }}>
              {permissions.map((permission: any) => (
                <PermissionItem
                  key={permission.id}
                  permission={permission}
                  onDelete={handleDelete}
                />
              ))}
            </List>
          </>
        )}
        <DeleteDialog
          open={openDialog}
          onClose={handleDialogClose}
          onConfirm={handleConfirmDelete}
          loading={deleteLoading}
        />
      </PermissionListContainer>
    </>
  );
};

export default PermissionList;
