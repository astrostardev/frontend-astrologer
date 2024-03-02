import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineNightlight } from "react-icons/md";
import { IconButton } from "@mui/material";
import { IoMdSearch } from "react-icons/io";
import ConversationItem from "../ConversationItem/ConversationItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import io from "socket.io-client";
const ENDPOINT = "http://localhost:8001";
var socket;
function Sidebar() {
   const { astrologer,token } = useSelector((state) => state.astroState);
  const [users, setUsers] = useState(null);
  const {id} = useParams()
  const splitId = id.split("+")[0].trim();
  const[latestMsg,setLatestMsg]=useState(null)

  const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);
 //using socket io
 useEffect(() => {
  socket = io(ENDPOINT);
  socket.emit("setup astro", astrologer);
  socket.on("connection", () => {
    setSocketConnectionStatus(!socketConnectionStatus);
  });
}, []);
  //get latest message
  useEffect(() => {
    const getAllMsg = async () => {
      try {
        let response = await fetch(
          `${process.env.REACT_APP_URL}/api/v1/latest_astro_message/${splitId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        socket.emit("join chat", splitId);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        let data = await response.json();

        setLatestMsg(data); 
        console.log('latest',latestMsg);// Update latestMsg state variable
     
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getAllMsg();
  }, [token,latestMsg, splitId]);

  // const [user, setUser] = useState(null);

  useEffect(() => {
    // sendUserId();
    getUser()
  }, []);
  async function getUser() {
    console.log(astrologer[0]?._id);
    try {
        let response = await fetch(
            `${process.env.REACT_APP_URL}/api/v1/fetch_chat/${astrologer[0]?._id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "GET",


              // Assuming astrologerId is expected in the backend
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }

        let data = await response.json();
        setUsers(data?.chats)
        console.log(data);
        console.log('usersfds',users);

  // Assuming data contains user information
    } catch (error) {
        console.error("Error fetching user:", error);
    }
}
  // displaying all astrologers
  async function sendUserId() {

    let response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/user/getuser`,
        {
            headers: {
                "Content-Type": "application/json", // Corrected Content-Type
                Authorization: `Bearer ${token}`
            },
            method: "POST",
            
        }
    );
    console.log(response);
    // setUser(response.user)
}
 
  return (
    <div className="sidebar_container">
      <div className="sd-header">
        <div>
          {astrologer ? (
            <IconButton
              className="con-icon"
              style={{ marginTop: "3px", background: "#FFCB11" }}
            >
              {astrologer[0]?.displayname[0]}
            </IconButton>
          ) : (
            <IconButton>
              <FaUserCircle />
            </IconButton>
          )}

        </div>
    <div>
    <h5 className="header">{astrologer[0]?.displayname}</h5>

    </div>
     
      </div>

      {/* <div className="sd-search">
        <IconButton>
          <IoMdSearch />
        </IconButton>
        <input type="text" placeholder="search" className="search-box" />
      </div> */}
      <div className="sd-coversation">
{users?.map((user)=>(
        <ConversationItem props={user} message={latestMsg} key={user?.name} /> 

))}
       
      </div>
    </div>
  );
}

export default Sidebar;
