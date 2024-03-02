import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Earnings from "./pages/Earnings";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import Settings from "./pages/Settings";
import Chathistory from "./pages/ChatHistory";
import Callhistory from "./pages/CallHistory";
import AstrologerLogin from "./pages/Login";
import ViewAstroProfile from "./pages/ViewAstroProfile";
import { HelmetProvider } from "react-helmet-async";
import ChatBody from "./pages/Chat/chatBody/ChatBody";
import Welcome from "./pages/Chat/chatPages/Welcome";
import ChatContent from "./pages/Chat/chatContent/ChatContent";

function App(props) {
  // const {isAuthenticated}=useSelector(state=>state.authState)
  return (
    <div>
      <HelmetProvider>
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/" element={<AstrologerLogin />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/earnings" element={<Earnings />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/chathistory" element={<Chathistory />} />
              <Route path="/callhistory" element={<Callhistory />} />
              <Route path="/astroProfile" element={<ViewAstroProfile />} />
              {/* chats */}
              <Route path="/chats/:id" element={<ChatBody />}>
                <Route path="chat_content/:id" element={<ChatContent />} />
                <Route path="welcome" element={<Welcome />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </HelmetProvider>
    </div>
  );
}

export default App;
