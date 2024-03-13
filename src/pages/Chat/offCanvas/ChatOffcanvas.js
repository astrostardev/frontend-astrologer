import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineNightlight } from "react-icons/md";
import { IconButton } from "@mui/material";
import { IoMdSearch } from "react-icons/io";
import OffCanvasConversationItem from "./OffCanvasConversationItem";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import './offCanvas.css'
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

function ChatOffcanvas({ latestMsg, time, user }) {
  const messagesArray = useSelector(
    (state) => state?.conversationState?.messages?.message
  );
  const recentMsg = messagesArray ? messagesArray : latestMsg;
  const { astrologer, token } = useSelector((state) => state.astroState);
  const { id } = useParams();
  const splitId = id.split("+")[0].trim();
  const [showSidebar, setShowsidebar] = useState(true);
  const handleItemClick = () => {
    setShowsidebar(!showSidebar);
  };
  return (
    <>
      <div>
        <div onClick={handleItemClick}>
          {showSidebar ? (
            ''
          ) : (
            <FaAngleLeft className="left_angle" />
          )}
        </div>

        {showSidebar ? (
          <div id="offCanvas_chat">
            <div className="sd-header">
              <div>
                {astrologer ? (
                  <IconButton
                    className="con-icon"
                    style={{
                      marginTop: "3px",
                      background: "#FFCB11",
                      color: "#fff",
                    }}
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
              <OffCanvasConversationItem
                props={user}
                message={messagesArray ? messagesArray : recentMsg}
                time={time}
                messages={messagesArray}
                onClick={handleItemClick}

              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default ChatOffcanvas;
