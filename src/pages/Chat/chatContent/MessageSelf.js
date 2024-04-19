import React, { useEffect } from "react";
import { extractTime } from "../../../utils/extractTime";

function MessageSelf(props) {
  const formatedTime = extractTime(props?.props?.createdAt);
  const audioData = props?.props?.audio?.audio;
  useEffect(() => {
    if (audioData) {
      try {
        // Function to convert data URI to binary
        const convertURIToBinary = (dataURI) => {
          const BASE64_MARKER = ";base64,";

          const base64Index =
            dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;

          const base64 = dataURI.substring(base64Index);

          const raw = window.atob(base64);
          const rawLength = raw.length;
          const arr = new Uint8Array(new ArrayBuffer(rawLength));
          for (let i = 0; i < rawLength; i++) {
            arr[i] = raw.charCodeAt(i);
          }

          return arr;
        };

        // Convert audio data URI to binary
        const binary = convertURIToBinary(audioData);
        const blob = new Blob([binary], {
          type: "audio/wav", 
        });
        const blobUrl = URL.createObjectURL(blob);

        const audioElement = document.getElementById("audio");
        audioElement.src = blobUrl;
        audioElement.load();

        audioElement.addEventListener("canplaythrough", () => {
          audioElement.play();
        });
      } catch (error) {
        console.error("Error decoding audio data:", error);
      }
    }
  }, [audioData, props.audioId]);

  return (
    <>
      {props?.props?.message ? (
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
      ) : (
        <div
          style={{ animationDelay: `0.8s` }}
          className={`chat__item ${props.user ? props.user : ""}`}
          id="self_msg"
        >
          <div id="chat__item__audio">
            <audio controls id="audio">
              {/* <source src="" type="audio/wav" /> */}
            </audio>
            <p className="chat__audio_time">{formatedTime}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default MessageSelf;
