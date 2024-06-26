import React, { useState, useEffect, useRef } from "react";
import MessageSelf from "./MessageSelf";
import MessageOthers from "./MessageOthers";
import "./chatContent.css";
import { IconButton } from "@mui/material";
import { IoAddOutline } from "react-icons/io5";
import { AiOutlineSend } from "react-icons/ai";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiSolidMicrophone } from "react-icons/bi";
import { AudioProvider } from "../../../context/AudioContext";
import {
  fetchChatFail,
  fetchChatRequest,
  fetchChatSuccess,
  sendChatFail,
  sendChatRequest,
} from "../../../slice/conversationSlice";
import { useDispatch } from "react-redux";

const ENDPOINT = process.env.REACT_APP_SOCKET_URL;

function ChatContent({ userName }) {
  const { token, astrologer } = useSelector((state) => state.astroState);
  const [refresh, setRefresh] = useState(false);
  const { id } = useParams();
  // const splitId = id.split("+")[0].trim();
  const [allMessages, setAllMessages] = useState(null);
  const [socket, setSocket] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const [messageContent, setMessageContent] = useState("");
  const [isThrottled, setIsThrottled] = useState(false);
  const throttlingDelay = 1000;
  const messagesEndRef = useRef();
  const dispatch = useDispatch();

  //adding automating scroll bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  //initialising WebSocket
  useEffect(() => {
    const newSocket = new WebSocket(ENDPOINT);

    newSocket.onopen = () => {
      console.log("Connected to WebSocket server");

      const setupMessage = {
        type: "setup",
        userId: astrologer[0]?._id,
      };
      newSocket.send(JSON.stringify(setupMessage));
    };

    newSocket.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [astrologer]);

  //get messages
  const getChatMessages = async () => {
    try {
      dispatch(fetchChatRequest()); // Dispatch action to indicate message fetching has started

      // Emit a WebSocket message to request chat messages
      socket.send(
        JSON.stringify({
          type: "get messages",
          room: id,
          userId: astrologer[0]?._id,
        })
      );
    } catch (error) {
      dispatch(fetchChatFail(error.message));
    }
  };
  useEffect(() => {
    const handleMessageEvent = (event) => {
      const messageData = JSON.parse(event.data);
      if (messageData.type === "messages") {
        const messages = dispatch(fetchChatSuccess(messageData.messages));
        setAllMessages(messages.payload);
        console.log("cureent msg", messages.payload);
        // Dispatch action to update messages in the state
      } else if (messageData.type === "new message") {
        const messages = dispatch(
          fetchChatSuccess((prevMessage = []) => [...prevMessage, messageData])
        ); // Dispatch action with messageData as payload

        setAllMessages(messages.payload); // Dispatch action to update messages in the state
      }
    };

    if (socket) {
      socket.addEventListener("open", () => {
        console.log("WebSocket connection is open.");
        getChatMessages(); // Call the function to fetch chat messages
      });

      socket.addEventListener("message", handleMessageEvent);

      socket.addEventListener("close", () => {
        console.log("WebSocket connection is closed.");
      });
    } else {
      console.error("WebSocket connection is not open.");
    }

    // Cleanup function
    return () => {
      if (socket) {
        socket.removeEventListener("message", handleMessageEvent);
      }
    };
  }, [dispatch, socket, id, astrologer]);

  useEffect(() => {
    getChatMessages();
  }, [id]);

  useEffect(() => {
    scrollToBottom();
    console.log("allmessages", allMessages);
  }, [allMessages, audioData]);
  // Function to start streaming audio

  const startStreaming = () => {
    console.log("startStreaming called");
    console.log("socket:", socket);

    try {
      if (socket && socket.readyState === WebSocket.OPEN) {
        console.log("WebSocket connection is open. Starting streaming.");

        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then((stream) => {
            console.log("getUserMedia success");
            const mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = (event) => {
              const audioBlob = new Blob([event.data], { type: "audio/webm" });
              const reader = new FileReader();

              reader.onload = async () => {
                try {
                  const base64Data = reader.result; // Data URL including MIME type and base64-encoded data
                  const formData = new FormData();

                  // Add metadata and the audio file to the form
                  formData.append("from", astrologer[0]._id);
                  formData.append("to", id);
                  formData.append("audio", audioBlob, "audio_message.webm");

                  const response = await fetch(
                    "http://localhost:8001/api/v1/message/send/audio",
                    {
                      method: "POST",
                      // Don't set Content-Type for FormData; let the browser set it
                      body: formData,
                    }
                  );

                  if (!response.ok) {
                    throw new Error(
                      `Failed to upload audio: ${response.statusText}`
                    );
                  }

                  console.log("Audio sent successfully");

                  // Send data via WebSocket
                  socket.send(
                    JSON.stringify({
                      type: "new audio",
                      room: id,
                      userId: astrologer[0]?._id,
                      audio: base64Data, // Sending the base64-encoded data URL
                    })
                  );
                } catch (error) {
                  console.error("Error during file read and fetch:", error);
                }
              };

              reader.readAsDataURL(audioBlob); // Convert Blob to Data URL
            };

            mediaRecorder.start();
            setStreaming(true);
            setMediaRecorder(mediaRecorder);
          })
          .catch((error) => {
            console.error("Error accessing microphone", error);
          });
      } else {
        console.error("Socket connection is not open.");
      }
    } catch (error) {
      console.error("Error during audio streaming:", error);
    }
  };

  // Function to stop streaming audio
  const stopStreaming = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setStreaming(false);
      setMediaRecorder(null);
    }
  };

  const sendMessage = async () => {
    try {
      if (isThrottled) {
        console.log("Message sending is throttled. Please wait.");
        return;
      }

      setIsThrottled(true); // Throttle the function
      dispatch(sendChatRequest()); // Dispatch action to indicate message sending has started

      // Emit a WebSocket message to send a new chat message
      socket.send(
        JSON.stringify({
          type: "new message",
          room: id,
          userId: astrologer[0]?._id,
          message: messageContent,
          // Pass the audio data here
        })
      );

      // Wait for the throttling delay before resetting isThrottled
      setTimeout(() => {
        setIsThrottled(false); // Reset the throttling
      }, throttlingDelay);
    } catch (error) {
      dispatch(sendChatFail(error.message));
    }
  };

  // send message function using throttling

  useEffect(() => {
    if (socket) {
      socket.addEventListener("open", () => {
        console.log("WebSocket connection is open.");
        // No need to call any function here
      });

      socket.addEventListener("close", () => {
        console.log("WebSocket connection is closed.");
      });
    } else {
      console.error("WebSocket connection is not open.");
    }

    // Cleanup function
    return () => {
      // Remove event listeners or perform any cleanup if needed
    };
  }, [socket, id, astrologer]);

  return (
    <div className="main__chatcontent">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ ease: "anticipate", duration: "0.3" }}
        >
          <div className="current-chatting-user">
            <p className="con-icon">{astrologer[0]?.displayname[0]}</p>
            <div className="header-text">
              <p className="con-title">{astrologer[0]?.displayname}</p>
              <p className="con-timeStamp">online</p>
            </div>
            <IconButton style={{ background: "#F3F3F3" }} className="btn-nobg">
              End
            </IconButton>
          </div>

          <div className="content__body">
            <div className="chat__items">
              <AudioProvider>
                {allMessages?.map((message, index) => (
                  <React.Fragment key={`message_${index}`}>
                    {message.senderId === astrologer[0]?._id ? (
                      <MessageSelf
                        props={message}
                        audio={message.audio}
                        key={index}
                        messageId={`self_msg_${index}`} // Unique message ID
                        audioId={`audio_${index}`} // Unique audio element ID
                      />
                    ) : message.receiverId === astrologer[0]?._id ? (
                      <MessageOthers
                        props={message}
                        audio={message.audio}
                        key={index}
                        user={userName}
                        messageId={`other_msg_${index}`} // Unique message ID
                        audioId={`audio_${index}`} // Unique audio element ID
                      />
                    ) : null}
                  </React.Fragment>
                ))}
              </AudioProvider>

              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="content__footer">
            <div className="sendNewMessage">
              <IconButton>
                <IoAddOutline />
              </IconButton>

              <input
                type="text"
                placeholder="Type a message here"
                onChange={(e) => {
                  setMessageContent(e.target.value);
                }}
                value={messageContent}
                onKeyDown={(event) => {
                  if (event.code === "Enter") {
                    sendMessage();
                    setMessageContent("");
                    setRefresh(!refresh);
                  }
                }}
              />
              <button
                onClick={() => {
                  sendMessage();
                  setMessageContent("");
                  setRefresh(!refresh);
                }}
                className="btnSendMsg"
                id="sendMsgBtn"
              >
                <AiOutlineSend />
              </button>
              <button className="btnSendMsg" id="sendMsgBtn">
                {streaming ? (
                  <BiSolidMicrophone onMouseUp={stopStreaming} />
                ) : (
                  <BiSolidMicrophone
                    className="btnSendMsg"
                    onMouseDown={startStreaming} // Removed parentheses to prevent immediate invocation
                  />
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default ChatContent;
