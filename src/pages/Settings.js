import "../Stylesheets/Settings.css";
import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Sidebar from "../components/Sidebar";
import Offcanvas from "../components/Offcanvas";
import MetaData from "./MetaData";
import Button from "react-bootstrap/Button";
import { useEffect,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import {
  fetchChatRequest,
} from "../slice/conversationSlice";
const ENDPOINT = process.env.REACT_APP_SOCKET_URL;
function Settings() {
  const { astrologer = [] } = useSelector((state) => state.astroState);
//call Pop
  const [incomingCall, setIncomingCall] = useState(null);
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const newSocket = new WebSocket(ENDPOINT);
 
    newSocket.onopen = () => {
      console.log("WebSocket is open");
      const setupMessage = { type: "setup", userId: astrologer[0]?._id };
      newSocket.send(JSON.stringify(setupMessage));
      dispatch(fetchChatRequest()); // Fetch chat messages on open
    };
 
    newSocket.onmessage = (message) => {
      try {
        const data = JSON.parse(message.data);
        if (data.type === 'call-notification') {
          setIncomingCall(data.userId); // Handle incoming call
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };
 
    newSocket.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };
 
    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
 
 
    setSocket(newSocket);
 
    return () => {
      newSocket.close(); // Ensure proper cleanup
    };
  }, [ENDPOINT, astrologer]);
 
  useEffect(() => {
    if (incomingCall) {
      // Trigger an alert when an incoming call is detected
      window.alert(`Incoming call from user: ${incomingCall}`);
    }
  }, [incomingCall]);


  const CustomSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#FFCB11",
      "&:hover": {
        backgroundColor: alpha("#FFCB11", theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#FFCB11",
    },
  }));

  const label = { inputProps: { "aria-label": "Color switch demo" } };

  const [voiceCallEnabled, setVoiceCallEnabled] = useState(
    astrologer[0].callAvailable
  );
  const [textChatEnabled, setTextChatEnabled] = useState(
    astrologer[0].chatAvailable
  );
  const [emergencyCallEnabled, setEmergencyCallEnabled] = useState(
    astrologer[0].emergencyCallAvailable
  );

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const availableStatus = {
        callAvailable: voiceCallEnabled,
        chatAvailable: textChatEnabled,
        emergencyCallAvailable: emergencyCallEnabled,
      };

      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/astrologer/available/${astrologer[0]?._id}`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(availableStatus),
        }
      );

      console.log(response);
      if (response.ok === false) {
        alert("failed");
      } else {
        alert("sucess");
      }
    } catch (error) {
      console.error("Error during course update:", error);
    }
  };

  return (
    <>
      <MetaData title={"Astro5Star-Contributor"} />
      <div id="fixedbar">
        <Sidebar />
      </div>
      <div id="offcanvas">
        <Offcanvas />
      </div>
      <div className="infoContainer">
        <h4>Settings</h4>
        <div className="header_line"></div>
        <main id="settings">
          <div>
            <span></span>
            <p>Off/On</p>
          </div>
          <div>
            <p>
              Voice call
              {/* <span>{astrologer[0]?.callAvailable ? '(available)' : '(not available)'}</span> */}
            </p>
            <CustomSwitch
              {...label}
              checked={voiceCallEnabled}
              onChange={() => setVoiceCallEnabled(!voiceCallEnabled)}
            />
          </div>
          <div>
            <p>Text chat</p>
            <CustomSwitch
              {...label}
              checked={textChatEnabled}
              onChange={() => setTextChatEnabled(!textChatEnabled)}
            />
          </div>
          <div>
            <p>Emergency call</p>
            <CustomSwitch
              {...label}
              defaultChecked={emergencyCallEnabled}
              onChange={() => setEmergencyCallEnabled(!emergencyCallEnabled)}
            />
          </div>
        </main>
        <Button onClick={onSubmit} className="btn-primery">
          sumbit
        </Button>
      </div>
    </>
  );
}

export default Settings;
