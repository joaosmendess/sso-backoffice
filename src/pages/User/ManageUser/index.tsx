import React, { useState, useEffect } from 'react';
import { styled } from '../../../stitches.config';
import { TextField, Button, Typography, Box, Select, MenuItem, InputLabel, FormControl, CircularProgress } from '@mui/material';
import { fetchPermissionGroups, createUser } from '../../../services/auth';
import Header from '../../../components/Header';

const FormContainer = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  backgroundColor: 'white',
  borderRadius: '8px',
  maxWidth: '400px',
  margin: '0 auto',
});

const SaveButton = styled(Button, {
  marginTop: '1rem',
});

const ManageUser = () => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [permissionGroup, setPermissionGroup] = useState('');
  const [permissionGroups, setPermissionGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createUser(name, userName, permissionGroup);
      alert('Usuário criado com sucesso!');
      // Limpar o formulário após a criação do usuário
      setName('');
      setUserName('');
      setPermissionGroup('');
    } catch (error) {
      console.error('Erro ao criar usuário', error);
      setError('Erro ao criar usuário');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header/>
    <FormContainer>
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        Gerenciar Usuário
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Subtítulo conveniente aqui
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSave}>
        <TextField
          label="Nome"
          variant="outlined"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          margin="normal"
          />
        <TextField
          label="Usuário"
          variant="outlined"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          fullWidth
          margin="normal"
          />
        <FormControl fullWidth margin="normal">
          <InputLabel>Grupo de permissão</InputLabel>
          <Select
            value={permissionGroup}
            onChange={(e) => setPermissionGroup(e.target.value as string)}
            required
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {permissionGroups.map((group: any) => (
              <MenuItem key={group.id} value={group.name}>{group.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <SaveButton type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? <CircularProgress size={24} /> : '+ Salvar'}
        </SaveButton>
      </form>
    </FormContainer>
            </>
  );
};

export default ManageUser;
