
import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';
import Login from './pages/Login';
import globalStyles from './globalStyles';
import VerifySSO from './components/VerifySSO';
import Register from './pages/Register';


function App() { 
  globalStyles()
  return (
    <Router>
    
      <Routes>
        <Route path="/login" element={ <Login />} />
        <Route path="/verify-sso" element={<VerifySSO />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </Router>
  );
}

export default App;
