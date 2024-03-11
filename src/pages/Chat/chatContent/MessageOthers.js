import React from "react";
import { extractTime } from "../../../utils/extractTime";

function MessageOthers({props,user}) {
  const formatedTime = extractTime(props?.props?.createdAt);

const userName = user && user.length > 0 ? user[0]?.[0] : "";
const name = userName && userName.participants && userName.participants.length > 0 ? userName.participants[0].name[0] : "";

  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={`chat__item ${props.user ? props.user : ""}`}
      id="others_msg"
    >
      <p className="con-icon" id="other_user">
        {name}
        
      </p>
      <div className="chat__item__content other">
        <p className="msg-title">{props?.message}</p>
        <p className="chat__time">{formatedTime}</p>
      </div>
    </div>
  );
}

export default MessageOthers;
