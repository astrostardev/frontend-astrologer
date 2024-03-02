import React from "react";
import "./chatBody.css";
import Sidebar from "../SideBar/Sidebar";
import AppSiderbar from "../../../components/Sidebar";
import OffCanvasNav from "../../../components/Offcanvas";
import {
  Route,
  Routes,
} from "react-router-dom";
import Welcome from "../chatPages/Welcome";
import ChatContent from "../chatContent/ChatContent";
function ChatBody(props) {
  return (
    <>
      <div id="fixedbar">
        <AppSiderbar />
      </div>
      <div id="offcanvas">
        <OffCanvasNav />
      </div>
      <div className="main__chatbody">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/chat_content/:id" element={<ChatContent />} />
        </Routes>
      </div>
    </>
  );
}

export default ChatBody;
