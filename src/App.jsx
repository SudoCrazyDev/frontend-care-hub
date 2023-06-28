import {BrowserRouter as Router} from 'react-router-dom';
import './styles/all.scss'
import { PublicRoutes, PrivateRoutes } from './pages/Routes';
import axios from 'axios';

// axios.defaults.baseURL = 'https://carehubapi.harayadevstudio.tech/api/';
axios.defaults.baseURL = 'http://localhost:8000/api/';

function App() {
  return(
  <Router>
    <PrivateRoutes />
  </Router>
  );
}

export default App
