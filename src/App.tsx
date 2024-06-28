import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ManageUser from './pages/User/ManageUser';
import ListUsers from './pages/User/ListUser';
import ManagePermissions from './pages/PermisionGroup/ManagePermisionGroups';
import ListPermissions from './pages/PermisionGroup/ListPermisionGroups';
import EditPermission from './pages/EditPermission';
import LoginExpired from './components/LoginExpired';

function App() { 
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/gerenciar-usuario" element={token ? <ManageUser /> : <Navigate to="/" />} />
        <Route path="/listar-usuario" element={token ? <ListUsers /> : <Navigate to="/" />} />
        <Route path="/gerenciar-permissoes" element={token ? <ManagePermissions /> : <Navigate to="/" />} />
        <Route path="/listar-permissoes" element={token ? <ListPermissions /> : <Navigate to="/" />} />
        <Route path="/gerenciar-permissoes/:id" element={<EditPermission />} />
        <Route path='/login?expired=true' element={<LoginExpired/>  } />
      </Routes>
    </Router>
  );
}

export default App;
