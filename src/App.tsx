
import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';
import Login from './pages/Login';
import globalStyles from './globalStyles';
import VerifySSO from './components/VerifySSO';


function App() { 
  globalStyles()
  return (
    <Router>
    
      <Routes>
        <Route path="/login" element={ <Login />} />
        <Route path="/verify-sso" element={<VerifySSO />} />
      </Routes>
    </Router>
  );
}

export default App;
