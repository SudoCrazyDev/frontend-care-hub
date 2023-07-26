import {BrowserRouter as Router} from 'react-router-dom';
import './styles/all.scss'
import { PublicRoutes, PrivateRoutes } from './pages/Routes';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

axios.defaults.baseURL = 'https://carehubapi.harayadevstudio.tech/api/';
//axios.defaults.baseURL = 'http://localhost:8000/api/';

function App() {
  const { user } = useSelector(state => state.user);

  return(
    <Router>
      {user !== null ?
        <PrivateRoutes />
        :
        <PublicRoutes />
      }
    </Router>
  );
}

export default App
