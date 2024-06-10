import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Earnings from "./pages/Earnings";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import Settings from "./pages/Settings";
import Chathistory from "../src/pages/Histories/ChatHistory";
import Callhistory from "../src/pages/Histories/CallHistory";
import AstrologerLogin from "./pages/Login";
import ViewAstroProfile from "./pages/ViewAstroProfile";
import { HelmetProvider } from "react-helmet-async";
import ChatBody from "./pages/Chat/chatBody/ChatBody";
import Welcome from "./pages/Chat/chatPages/Welcome";
import ChatContent from "./pages/Chat/chatContent/ChatContent";
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import FullChatHistory from "./pages/Histories/FullChatHistory";
function App(props) {
  const { isAuthenticated,} = useSelector((state) => state.astroState);




  return (
    <div>
      <HelmetProvider>
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/" element={<AstrologerLogin />} />
              <Route
                path="/dashboard"
                element={
                  isAuthenticated ? <Dashboard /> : <Navigate to="/" />
                  // <Dashboard />
                }
              />
              <Route
                path="/earnings"
                element={
                  isAuthenticated ? <Earnings /> : <Navigate to="/" />
                  // <Earnings />
                }
              />
              <Route
                path="/settings"
                element={
                isAuthenticated ? <Settings /> : <Navigate to="/" />
                // <Settings />
                }
              />
              <Route
                path="/chathistory"
                element={
                  isAuthenticated ? <Chathistory /> : <Navigate to="/" />
                  // <Chathistory />
                }/>
              <Route
                path="/full_chat_history/:id"
                element={
                  isAuthenticated ? <FullChatHistory /> : <Navigate to="/" />
                  // <FullChatHistory />
                }/>
              <Route
                path="/callhistory"
                element={
                  isAuthenticated ? <Callhistory /> : <Navigate to="/" />
                  // <Callhistory />
                }
              />
              <Route
                path="/astroProfile"
                element={
                  // <ViewAstroProfile />
                  isAuthenticated ? <ViewAstroProfile /> : <Navigate to="/" />
                }
              />
              {/* chats */}
              <Route
                path="/chats"
                
                element={isAuthenticated ? <ChatBody/> : <Navigate to="/" />}
                // element={<ChatBody />}
              >
                <Route
                  path="chat_content/:id"
                  element={
                    // <ChatContent />
                    isAuthenticated ? <ChatContent /> : <Navigate to="/" />
                  }
                />
                <Route
                  path="welcome"
                  element={isAuthenticated ? <Welcome /> : <Navigate to="/" />}
                  // element={<Welcome />}
                />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </HelmetProvider>
    </div>
  );
}
export default App;
