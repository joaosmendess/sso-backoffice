import React from 'react';
import { Tabs, Tab } from '@mui/material';

interface PermissionTabsProps {
  tabValue: number;
  handleTabChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const PermissionTabs: React.FC<PermissionTabsProps> = ({ tabValue, handleTabChange }) => (
  <Tabs value={tabValue} onChange={handleTabChange} centered>
    <Tab label="Principal" />
    <Tab label="Módulos" />
  </Tabs>
);

export default PermissionTabs;
