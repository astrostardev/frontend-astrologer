import chat from "../assests/chat1.png";
import call from "../assests/call1.png";
import earning from "../assests/earning.png";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import "../Stylesheets/Dashboard.css";
import MetaData from "./MetaData";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Chart as ChartJS,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { earnings } from "../data";
import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Sidebar from "../components/Sidebar";
import Offcanvas from "../components/Offcanvas";
import {
  fetchChatFail,
  fetchChatRequest,
  fetchChatSuccess,
} from "../slice/conversationSlice";
ChartJS.register(Tooltip, BarElement, CategoryScale, LinearScale);
const ENDPOINT = process.env.REACT_APP_SOCKET_URL;

function Dashboard() {
  const [incomingCall, setIncomingCall] = useState(null);
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch()
  const { astrologer, token } = useSelector((state) => state.astroState);
  
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
      window.alert(`Incoming call from user:" " " " ${incomingCall}`);
    }
  }, [incomingCall]);

  const barData = {
    labels: earnings.map((earn) => earn.month),
    datasets: [
      {
        data: earnings.map((earn) => earn.amount),
        backgroundColor: [
          "#0000000d",
          "#FFCB11",
          "#0000000d",
          "#0000000d",
          "#0000000d",
          "#0000000d",
          "#0000000d",
          "#0000000d",
          "#0000000d",
          "#0000000d",
          "#0000000d",
          "#0000000d",
        ],
        borderColor: [
          "#0000000d",
          "#FFCB11",
          "#0000000d",
          "#0000000d",
          "#0000000d",
          "#0000000d",
          "#0000000d",
          "#0000000d",
          "#0000000d",
          "#0000000d",
          "#0000000d",
          "#0000000d",
        ],
        borderRadius: 8,
      },
    ],
  };

  const barOptions = {
    scales: {
      x: {
        grid: {
          drawOnChartArea: false,
          display: false,
          drawTicks: false,
        },
      },
      y: {
        display: false,
        ticks: {
          display: false,
        },
        grid: {
          drawOnChartArea: false,
          display: false,
          drawTicks: false,
        },
      },
    },
    maintainAspectRatio: false,
  };

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
    astrologer[0]?.callAvailable
  );
  const [textChatEnabled, setTextChatEnabled] = useState(
    astrologer[0]?.chatAvailable
  );
  const [emergencyCallEnabled, setEmergencyCallEnabled] = useState(
    astrologer[0]?.emergencyCallAvailable
  );
  
  return (
    <>
        <MetaData title={'Astro5Star-Contributor'} />

      <div id="fixedbar">
        <Sidebar />
      </div>
      <div id="offcanvas">
        <Offcanvas />
      </div>
      <div className="infoContainer">
   
     

        <h4>Your Dashboard</h4>
        <div
          style={{
            height: "3px",
            width: "75px",
            backgroundColor: "#FFCB11",
            borderRadius: "10px",
            marginTop: "3px",
          }}
        ></div>
        <main>
          <section id="dashboard">
            <div className="dashBox dashChat">
              <span className="dashImg">
                <img src={chat} alt="chat" />
              </span>
              <div className="boxDescription">
                <p className="boxHeading">Chat</p>
                <h3>4 hours</h3>
                <p className="boxInfo">
                  <span>
                    <BsArrowUpShort />
                    37%{" "}
                  </span>
                  this month
                </p>
              </div>
            </div>
            <div className="dashBox dashCall">
              <span className="dashImg">
                <img src={call} alt="call" />
              </span>
              <div className="boxDescription">
                <p className="boxHeading">Call</p>
                <h3>2.5 hours</h3>
                <p className="boxInfo reduce">
                  <span>
                    <BsArrowDownShort />
                    14%{" "}
                  </span>
                  this month
                </p>
              </div>
            </div>
            <div className="dashBox dashEarning">
              <span className="dashImg">
                <img src={earning} alt="earning" />
              </span>
              <div className="boxDescription">
                <p className="boxHeading">Earning</p>
                <h3>₹45000</h3>
                <p className="boxInfo">
                  <span>
                    <BsArrowUpShort />
                    12%{" "}
                  </span>
                  this month
                </p>
              </div>
            </div>
          </section>
          <section className="chartContainer">
            <div className="barChart">
              <div className="barHead">
                <div>
                  <h4 className="fw-bold">Overview</h4>
                  <p className="boxHeading">Monthly Earning</p>
                </div>
              </div>
              <div style={{ height: "300px" }}>
                <Bar data={barData} options={barOptions}></Bar>
              </div>
            </div>
            <div className="dashSettings">
              <h4 className="mb-3">Settings</h4>
              <p style={{ textAlign: "right" }}>Off/On</p>
              <div>
                <p>Voice call</p>
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
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
