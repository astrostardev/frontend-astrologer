import React from "react";
import { extractTime } from "../../../utils/extractTime";

function MessageSelf(props) {
  const formatedTime = extractTime(props?.props?.createdAt);
  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={`chat__item ${props.user ? props.user : ""}`}
      id="self_msg"
    >
      <div className="chat__item__content">
        <p className="msg-title">{props?.props?.message}</p>
        <p className="chat__time">{formatedTime}</p>
      </div>
    </div>
  );
}

export default MessageSelf;
