
import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';
import Login from './pages/Login';
import globalStyles from './globalStyles';
import VerifySSO from './components/VerifySSO';
import AuthCallback from './pages/Authorized/AuthCallback';
import CallbackPage from './pages/Callback';


function App() { 
  globalStyles()
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={ <Login />} />
        <Route path="/verify-sso" element={<VerifySSO />} />
        <Route path="/auth/callback" element={<CallbackPage />} />
      </Routes>
    </Router>
  );
}

export default App;
