import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import VerifySSO from './components/VerifySSO';
import Register from './pages/Register';
import SelectProduct from './pages/Authorized/SelectProduct';
import Callback from './pages/Callback'; // Importando Callback
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute'; // Importando PublicRoute
import globalStyles from './globalStyles';

const App: React.FC = () => {
  globalStyles();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="/verify-sso" element={<VerifySSO />} />
        <Route path="/register" element={<Register />} />
        <Route path="/callback" element={<Callback />} /> {/* Adicionando a rota Callback */}
        <Route
          path="/select-product"
          element={
            <ProtectedRoute>
              <SelectProduct />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
