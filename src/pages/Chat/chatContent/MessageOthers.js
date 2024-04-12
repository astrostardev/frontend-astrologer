import React from "react";
import { extractTime } from "../../../utils/extractTime";
import {useParams} from 'react-router-dom'
function MessageOthers({props,user}) {
  const formatedTime = extractTime(props?.props?.createdAt);
  const { id } = useParams();
  const currentUserName = user?.map(data =>
    data.participants?.filter(participant => participant?._id === id).map(participant => participant?.name)
  ).flat();
  
  
return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={`chat__item ${props.user ? props.user : ""}`}
      id="others_msg"
    >
<p className="con-icon" id="other_user">
  {currentUserName && currentUserName[0]?.charAt(0)}
</p>

      <div className="chat__item__content other">
        <p className="msg-title">{props?.message}</p>
        <p className="chat__time">{formatedTime}</p>
      </div>
    </div>
  );
}

export default MessageOthers;
