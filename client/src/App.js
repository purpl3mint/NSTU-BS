import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import { useRoutes } from './routes';
import { AuthContext } from './context/AuthContext';
import 'materialize-css'

function App() {
  const {token, login, logout} = useAuth()
  const isAutheticated = !!token
  const routes =  useRoutes(isAutheticated)
  return (
    <AuthContext.Provider value={{token, login, logout, isAutheticated}}>
      <Router>
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
