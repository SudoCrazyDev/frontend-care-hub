import {BrowserRouter as Router} from 'react-router-dom';
import './styles/all.scss'
import { PublicRoutes, PrivateRoutes } from './pages/Routes';

function App() {
  return(
  <Router>
    <PrivateRoutes />
  </Router>
  );
}

export default App
