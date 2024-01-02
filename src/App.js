import Sidebar from './components/Sidebar';
import Offcanvas from "./components/Offcanvas"
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Earnings from './pages/Earnings';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import Settings from './pages/Settings';
import Chathistory from './pages/ChatHistory';
import Callhistory from './pages/CallHistory';
import Profile from "./pages/Profile"
import AstrologerLogin from './pages/Login';
import Home from './pages/Home'
import Layout from './Layout'
import ViewAstroProfile from './pages/ViewAstroProfile';
import { useSelector } from 'react-redux';
function App(props) {
// const {isAuthenticated}=useSelector(state=>state.authState)
  return (
    <div>
      <BrowserRouter>
   
        <div>
      
          <Routes>

            <Route path="/" element={<AstrologerLogin />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/earnings' element={ <Earnings />} />
            <Route path="/settings" element={ <Settings />} />
            <Route path="/chathistory" element={ <Chathistory />} />
            <Route path='/callhistory' element={ <Callhistory />} />
            <Route path="/astroProfile" element={ <ViewAstroProfile />} />
          </Routes>
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
