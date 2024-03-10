import React,{useState,useEffect} from "react";
import "./chatBody.css";
import Sidebar from "../SideBar/Sidebar";
import AppSiderbar from "../../../components/Sidebar";
import OffCanvasNav from "../../../components/Offcanvas";
import {
  Route,
  Routes,
  useParams
} from "react-router-dom";
import Welcome from "../chatPages/Welcome";
import ChatContent from "../chatContent/ChatContent";
import { useSelector,useDispatch } from "react-redux";
import { fetchChatFail,fetchChatRequest,fetchChatSuccess, sendChatFail, sendChatRequest, sendChatSuccess } from "../../../slice/conversationSlice";

const ENDPOINT = "ws://localhost:8001";
function ChatBody(props) {
  const {astrologer,token}=useSelector((state)=>state.astroState)
  const [showChatarea, setShowChatArea] = useState(false);
  const { id } = useParams();
  const splitId = id.split("+")[0].trim();
  const [socket, setSocket] = useState(null);
  const [recentMessage, setAllMessages] = useState([]);

  const dispatch = useDispatch()




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
    socket.send(JSON.stringify({
      type: 'get messages',
      room: splitId,
      userId: astrologer[0]?._id
    }));
  } catch (error) {
    dispatch(fetchChatFail(error.message));
  }
};

const handleMessageEvent = (event) => {
  const messageData = JSON.parse(event.data);
  if (messageData.type === 'messages') {
    const messages = dispatch(fetchChatSuccess(messageData.messages));
    console.log('getMsg',messages);

    setAllMessages(messages.payload); // Dispatch action to update messages in the state
  } else if (messageData.type === 'new message') {
    const messages = dispatch(fetchChatSuccess(messageData));
    setAllMessages(messages.payload); // Dispatch action to update messages in the state
  } else if (messageData.type === 'error') {
    dispatch(fetchChatFail(messageData.message));
  }
};

if (socket) {
  socket.addEventListener("open", () => {
    console.log("WebSocket connection is open.");
    console.log("paramsId", splitId);
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
}, [dispatch, socket, splitId, astrologer]);
const [users, setUsers] = useState(null);
useEffect(() => {
  // sendUserId();
  getUser();
}, []);
async function getUser() {
  console.log(astrologer[0]?._id);
  try {
    let response = await fetch(
      `${process.env.REACT_APP_URL}/api/v1/fetch_chat/${astrologer[0]?._id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",

        // Assuming astrologerId is expected in the backend
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    let data = await response.json();
    setUsers(data?.chats);
    console.log("usersfds", users);

    // Assuming data contains user information
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}

  return (
    <>
      <div id="fixedbar">
        <AppSiderbar />
      </div>
      <div id="offcanvas">
        <OffCanvasNav />
      </div>
      <div className="main__chatbody">
      <Sidebar latestMsg={recentMessage[recentMessage?.length-1]?.message} time={recentMessage[recentMessage?.length-1]?.createdAt}/>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/chat_content/:id" element={<ChatContent />} />
        </Routes>
      </div>
    </>
  );
}

export default ChatBody;
