
    import {
    TextField,
    Button,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Checkbox,
    FormControlLabel,
    } from "@mui/material";
    import { styled } from "../../stitches.config";

    const SaveButton = styled(Button, {
    marginTop: "1rem",
    });

    const PermissionForm = ({
    tabValue,
    groupName,
    setGroupName,
    selectedGroup,

    permissions,

    permissionGroups,
    loading,

    handleSaveGroupName,
    handleSavePermissions,
    handlePermissionChange,
    handleGroupChange,
    }: any) => {
    return (
        <form
        onSubmit={tabValue === 0 ? handleSaveGroupName : handleSavePermissions}
        >
        {tabValue === 0 && (
            <>
            <TextField
                label="Nome do grupo"
                variant="outlined"
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
                fullWidth
                margin="normal"
            />
            <SaveButton
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : "+ Salvar"}
            </SaveButton>
            </>
        )}
        {tabValue === 1 && (
            <>
            <FormControl fullWidth margin="normal">
                <InputLabel>Módulo</InputLabel>
                <Select label='Módulo' value={selectedGroup} onChange={handleGroupChange} required>
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {permissionGroups.map((group: any) => (
                    <MenuItem key={group.id} value={group.id}>
                    {group.name}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="start"
                width="100%"
            >
                <FormControlLabel
                control={
                    <Checkbox
                    checked={permissions.get === 1}
                    onChange={handlePermissionChange}
                    name="get"
                    />
                }
                label="Ler"
                />
                <FormControlLabel
                control={
                    <Checkbox
                    checked={permissions.post === 1}
                    onChange={handlePermissionChange}
                    name="post"
                    />
                }
                label="Criar"
                />
                <FormControlLabel
                control={
                    <Checkbox
                    checked={permissions.put === 1}
                    onChange={handlePermissionChange}
                    name="put"
                    />
                }
                label="Editar"
                />
                <FormControlLabel
                control={
                    <Checkbox
                    checked={permissions.delete === 1}
                    onChange={handlePermissionChange}
                    name="delete"
                    />
                }
                label="Apagar"
                />
            </Box>
            <SaveButton
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : "+ Salvar"}
            </SaveButton>
            </>
        )}
        </form>
    );
    };

    export default PermissionForm;
