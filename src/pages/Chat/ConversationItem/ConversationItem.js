import React from "react";
import "./conversationitem.css";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMicrophone } from "react-icons/fa";
import { extractDayAndDate, extractTime } from "../../../utils/extractTime";
function ConversationItem({ props,message, audio }) {
  const navigate = useNavigate();
const {id} = useParams()
  return (
    <>
      {props &&
        props?.map((conversation) => (
          <motion.div
            key={conversation?._id}
            onClick={() =>
              navigate(`chat_content/${conversation?.participants[0]?._id}`)
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="conversation-container">
              <p className="con-icon">
                {conversation?.participants[0]?.name[0]}
              </p>
              <p className="con-title">{conversation?.participants[0]?.name}</p>
              {
  conversation?.latestMessage?.message ? (
    <p className="con-lastMessage">
      {conversation.latestMessage.message}
    </p>
  ) : message ? (
    <p className="con-lastMessage">{message}</p>
  ) : conversation?.latestMessage?.audio  ? (
    <p className="con-lastMessage" id="audioIcon">
      <FaMicrophone /> <span>Audio</span>
    </p>
  ) : audio ?(
    <p className="con-lastMessage">
      <FaMicrophone /> <span>Audio</span>
      
    </p>
  )
  : (
    <p className="con-lastMessage">
      <FaMicrophone /> <span>Audio</span>
      
    </p>
  )
}
  <p className="con-timeStamp">
                {extractTime(conversation?.latestMessage?.createdAt)}
                <span style={{ marginLeft: "8px" }}>
                  {extractDayAndDate(conversation?.latestMessage?.createdAt)}
                </span>
              </p>
            </div>
          </motion.div>
        ))}
    </>
  );
}

export default ConversationItem;
