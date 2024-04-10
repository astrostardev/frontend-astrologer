import React from "react";
import "./sidebar.css";
import { FaUserCircle } from "react-icons/fa";
import { IconButton } from "@mui/material";
import ConversationItem from "../ConversationItem/ConversationItem";
import { useSelector } from "react-redux";

function Sidebar({ latestMsg, time, user }) {
  const messagesArray = useSelector(
    (state) => state?.conversationState?.messages?.message
  );
  const { astrologer } = useSelector((state) => state.astroState);
  const recentMsg = messagesArray ? messagesArray : latestMsg;

  return (
    <div className="sidebar_container">
      <div className="sd-header">
        <div>
          {astrologer ? (
            <IconButton
              className="con-icon"
              style={{ marginTop: "3px", background: "#FFCB11", color: "#fff" }}
            >
              {astrologer[0]?.displayname[0]}
            </IconButton>
          ) : (
            <IconButton>
              <FaUserCircle />
            </IconButton>
          )}
        </div>
        <div>
          <h5 className="header">{astrologer[0]?.displayname}</h5>
        </div>
      </div>

      <div className="sd-coversation">
        <ConversationItem
          props={user}
          message={recentMsg}
          time={time}
        />
      </div>
    </div>
  );
}

export default Sidebar;
