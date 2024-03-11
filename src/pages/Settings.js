import "../Stylesheets/Settings.css";
import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Sidebar from "../components/Sidebar";
import Offcanvas from "../components/Offcanvas";
import MetaData from "./MetaData";
import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";

function Settings() {
  const { astrologer = [] } = useSelector((state) => state.astroState);
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
