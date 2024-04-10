import React, { useState, useEffect } from "react";
import "./chatBody.css";
import Sidebar from "../SideBar/Sidebar";
import AppSiderbar from "../../../components/Sidebar";
import OffCanvasNav from "../../../components/Offcanvas";
import { Route, Routes, useParams } from "react-router-dom";
import Welcome from "../chatPages/Welcome";
import ChatContent from "../chatContent/ChatContent";
import { useSelector, useDispatch } from "react-redux";
import ChatOffcanvas from "../offCanvas/ChatOffcanvas";
import {
  fetchChatFail,
  fetchChatRequest,
  fetchChatSuccess,
} from "../../../slice/conversationSlice";

const ENDPOINT = process.env.REACT_APP_SOCKET_URL;

 function ChatBody() {
  const { astrologer, token } = useSelector((state) => state.astroState);
  const { id } = useParams();
  // const splitId =  id?.split("/")
  const [socket, setSocket] = useState(null);
  const [recentMessage, setAllMessages] = useState([]);
  const [users, setUsers] = useState(null);
  const dispatch = useDispatch();
// useEffect(()=>{
// setUsers(sideBarUsers)
// console.log('chatbody Users',users);
// },[])
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
  useEffect(() => {
    const getChatMessages = async () => {

      try {
        dispatch(fetchChatRequest()); // Dispatch action to indicate message fetching has started

        // Emit a WebSocket message to request chat messages
        socket.send(
          JSON.stringify({
            type: "get messages",
            room: id ?  id :'',
            userId: astrologer[0]?._id,
          })
        );
      } catch (error) {
        dispatch(fetchChatFail(error.message));
      }
    };
    console.log('idchatbody', id,astrologer[0]._id);

    const handleMessageEvent = (event) => {
      const messageData = JSON.parse(event.data);
      if (messageData.type === "messages") {
        console.log("messageData Get", messageData.payload);

        const messages = dispatch(fetchChatSuccess(messageData.messages));

        setAllMessages(messages.payload); // Dispatch action to update messages in the state
      } else if (messageData.type === "new message") {
        const messages = dispatch(
          fetchChatSuccess((prevMessage = []) => [...prevMessage, messageData])
        ); // Dispatch new Message what i have sent
        setAllMessages(messages.payload); // Dispatch action to update messages in the state
      } else if (messageData.type === "error") {
        dispatch(fetchChatFail(messageData.message));
      }
    };

    if (socket) {
      socket.addEventListener("open", () => {
        console.log("WebSocket connection is open.");
        console.log("paramsId", id);
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
  }, [dispatch, socket, astrologer]);

  // // get user who are intract with astrologer ();
  // useEffect(() => {
  //   getUser();
  // }, []);
  // async function getUser() {
  //   try {
  //     let response = await fetch(
  //       `${process.env.REACT_APP_URL}/api/v1/fetch_chat/${astrologer[0]?._id}`,
  //       {

  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         method: "GET",
  //         // Assuming astrologerId is expected in the backend
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch user");
  //     }

  //     let data = await response.json();
  //     setUsers(data?.chats);

  //     // Assuming data contains user information
  //   } catch (error) {
  //     console.error("Error fetching user:", error);
  //   }
  // }
  const handleUsers = (sideBarUsers) => {
    setUsers(sideBarUsers);
  };
  
  useEffect(() => {
    console.log('sideBarUsers from chatbody', users);
  }, [users]);
  
  return (
    <>
      <div id="fixedbar">

        <AppSiderbar sideBarUsers={handleUsers}/>
      </div>
      <div id="offcanvas">
        <OffCanvasNav />
      </div>
      <div className="main__chatbody">
        <Sidebar
             latestMsg={
              recentMessage?.length > 0
                ? recentMessage[recentMessage?.length - 1]?.message
                : " "
            }
            time={
              recentMessage?.length > 0
                ? recentMessage[recentMessage?.length - 1]?.createdAt
                : " "
            }
          user={users}
        />

        <ChatOffcanvas latestMsg={
            recentMessage?.length > 0
              ? recentMessage[recentMessage?.length - 1]?.message
              : " "
          }
          time={
            recentMessage?.length > 0
              ? recentMessage[recentMessage?.length - 1]?.createdAt
              : " "
          }
          user={users} />


        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/chat_content/:id"
            element={<ChatContent userName={users} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default ChatBody;
