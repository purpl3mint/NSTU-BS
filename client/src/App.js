import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import { useRoutes } from './routes';
import { AuthContext } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import 'materialize-css'
import "../node_modules/video-react/dist/video-react.css"

function App() {
  const {token, login, logout} = useAuth()
  const isAutheticated = !!token
  const routes =  useRoutes(isAutheticated)
  return (
    <AuthContext.Provider value={{token, login, logout, isAutheticated}}>
      <Router>
        { isAutheticated && <Navbar /> }

        <div className="">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
