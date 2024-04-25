import React, { useEffect, useContext, useRef } from "react";
import { extractTime } from "../../../utils/extractTime";
import { AudioContext } from "../../../context/AudioContext";

function MessageSelf({ props, user, audio }) {
  const formatedTime = extractTime(props?.createdAt);
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
      {props?.message ? (
        <div
          style={{ animationDelay: `0.8s` }}
          className={`chat__item ${props.user ? props.user : ""}`}
          id="self_msg"
        >
          <div className="chat__item__content">
            <p className="msg-title">{props?.message}</p>
            <p className="chat__time">{formatedTime}</p>
          </div>
        </div>
      ) : (
        <div
          style={{ animationDelay: `0.8s` }}
          className={`chat__item ${props.user ? props.user : ""}`}
          id="self_msg"
        >
          <div id="chat__item__audio">
            <audio controls ref={audioRef}>
              <source src={audio} type="audio/wav" />
            </audio>
            <p className="chat__audio_time">{formatedTime}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default MessageSelf;
