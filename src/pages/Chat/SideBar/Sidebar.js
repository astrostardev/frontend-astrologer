import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { FaUserCircle } from "react-icons/fa";
import { IconButton } from "@mui/material";
import ConversationItem from "../ConversationItem/ConversationItem";
import { useSelector } from "react-redux";

function Sidebar({latestMsg,time}) {
  const messagesArray = useSelector(
    (state) => state?.conversationState?.messages?.message
  );
  const { astrologer, token } = useSelector((state) => state.astroState);
  const [users, setUsers] = useState(null);
  const recentMsg = messagesArray ? messagesArray : latestMsg;


  useEffect(() => {
    // sendUserId();
    getUser();
  }, []);
  async function getUser() {
    console.log(astrologer[0]?._id);
    try {
      let response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/fetch_chat/${astrologer[0]?._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "GET",

          // Assuming astrologerId is expected in the backend
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      let data = await response.json();
      setUsers(data?.chats);
      console.log("usersfds", users);

      // Assuming data contains user information
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

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
          props={users}
          message={messagesArray ? messagesArray : recentMsg}
          time={time}
          messages={messagesArray}
        />
      </div>
    </div>
  );
}

export default Sidebar;
