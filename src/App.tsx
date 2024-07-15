import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import VerifySSO from './components/VerifySSO';
import Register from './pages/Register';
import SelectProduct from './pages/Authorized/SelectProduct';
import Callback from './pages/Callback';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import globalStyles from './globalStyles';

const App: React.FC = () => {
  globalStyles();

  return (
    <Router>
      <Routes>
        <Route
          path="/login/:companyName"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="/verify-sso/:companyName" element={<VerifySSO />} />
        <Route path="/register/:companyName" element={<Register />} />
        <Route path="/callback/:companyName" element={<Callback />} />
        <Route
          path="/select-product/:companyName"
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
