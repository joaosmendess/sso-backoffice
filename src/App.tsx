import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import VerifySSO from './components/VerifySSO';
import Register from './pages/Register';
import SelectProduct from './pages/Authorized/SelectProduct';
import Callback from './pages/Callback';
import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import NotFound from './components/NotFound';
import globalStyles from './globalStyles';
import SetNewPassword from './pages/SetNewPassword';

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
        <Route path="/forgot-password/:companyName" element={<ForgotPassword />} />
        <Route path="/set-new-password/" element={<SetNewPassword />} />
        <Route
          path="/select-product"
          element={
            <ProtectedRoute>
              <SelectProduct />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
