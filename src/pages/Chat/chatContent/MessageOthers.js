import React, { useEffect, useRef, useContext } from "react";
import { extractTime } from "../../../utils/extractTime";
import { useParams } from "react-router-dom";
import { AudioContext } from "../../../context/AudioContext";
function MessageOthers({ props, user, audio }) {
  const formatedTime = extractTime(props?.createdAt);
  const { id } = useParams();
  const currentUserName = user
    ?.map((data) =>
      data.participants
        ?.filter((participant) => participant?._id === id)
        .map((participant) => participant?.name)
    )
    .flat();
  const audioRef = useRef(null);
  const { setPlayingAudio } = useContext(AudioContext);

  useEffect(() => {
    const handlePlay = () => {
      setPlayingAudio(audioRef.current);
    };

    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.addEventListener("play", handlePlay);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("play", handlePlay);
      }
    };
  }, [setPlayingAudio]);

  return (
    <>
      <>
        {props?.message ? (
          <>
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
          </>
        ) : (
          <div
            style={{ animationDelay: `0.8s` }}
            className={`chat__item ${props.user ? props.user : ""}`}
            id="others_msg"
          >
            <p className="con-icon" id="other_user">
              {currentUserName && currentUserName[0]?.charAt(0)}
            </p>
            <div>
              <audio controls id="audio" ref={audioRef}>
                <source src={audio} type="audio/wav" />
              </audio>

              <p className="chat__audio_time_other">{formatedTime}</p>
            </div>
          </div>
        )}
      </>
    </>
  );
}

export default MessageOthers;
