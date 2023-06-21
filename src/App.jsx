import {BrowserRouter as Router} from 'react-router-dom';
import './styles/all.scss'
import { PublicRoutes, PrivateRoutes } from './pages/Routes';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;

function App() {
  return(
  <Router>
    <PrivateRoutes />
  </Router>
  );
}

export default App
