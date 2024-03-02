import React from "react";
import { extractTime } from "../../../utils/extractTime";

function MessageOthers(props) {
  const formatedTime = extractTime(props?.props?.createdAt);

  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={`chat__item ${props.user ? props.user : ""}`}
      id="others_msg"
    >
      <p className="con-icon" id="other_user">
        H
      </p>

      <div className="chat__item__content other">
        <p className="msg-title">{props?.props?.message}</p>
        <p className="chat__time">{formatedTime}</p>

      </div>
    </div>
  );
}

export default MessageOthers;
