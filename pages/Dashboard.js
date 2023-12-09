import chat from "../assests/chat1.png";
import call from "../assests/call1.png";
import earning from "../assests/earning.png";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import "../Stylesheets/Dashboard.css";

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

ChartJS.register(Tooltip, BarElement, CategoryScale, LinearScale);

function Dashboard() {
  const barData = {
    labels: earnings.map((earn) => earn.month),
    datasets: [
      {
        data: earnings.map((earn) => earn.amount),
        backgroundColor: [
          "#0000000d",
          "#EE721B",
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
          "#EE721B",
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
      color: "#EE721B",
      "&:hover": {
        backgroundColor: alpha("#EE721B", theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#EE721B",
    },
  }));

  const label = { inputProps: { "aria-label": "Color switch demo" } };
  return (
    <>
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
            backgroundColor: "#EE721B",
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
                <CustomSwitch {...label} defaultChecked />
              </div>
              <div>
                <p>Text chat</p>
                <CustomSwitch {...label} defaultChecked />
              </div>
              <div>
                <p>Emergency call</p>
                <CustomSwitch {...label} defaultChecked />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
