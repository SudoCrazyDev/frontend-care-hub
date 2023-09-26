import {BrowserRouter as Router} from 'react-router-dom';
import './styles/all.scss'
import { PublicRoutes, PrivateRoutes } from './pages/Routes';
import axios from 'axios';
import { useSelector } from 'react-redux';

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
