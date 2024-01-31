import "../Stylesheets/Settings.css"
import { alpha, styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Sidebar from "../components/Sidebar";
import Offcanvas from "../components/Offcanvas";
import MetaData from "./MetaData";
import {useState} from 'react'
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";



function Settings() {

  const {astrologer =[]} = useSelector(state=>state.astroState)


    const CustomSwitch = styled(Switch)(({ theme }) => ({
        '& .MuiSwitch-switchBase.Mui-checked': {
            color: "#FFCB11",
            '&:hover': {
                backgroundColor: alpha("#FFCB11", theme.palette.action.hoverOpacity),
            },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: "#FFCB11",
        },
    }));

    const label = { inputProps: { 'aria-label': 'Color switch demo' } };

    const [voiceCallEnabled, setVoiceCallEnabled] = useState(false);
    const [textChatEnabled, setTextChatEnabled] = useState(false);
    const [emergencyCallEnabled, setEmergencyCallEnabled] = useState(false);
  
    // Handler function to toggle the switch state
    const handleSwitchToggle = (switchType) => {
      switch (switchType) {
        case 'voiceCall':
          setVoiceCallEnabled(!voiceCallEnabled);
          break;
        case 'textChat':
          setTextChatEnabled(!textChatEnabled);
          break;
        case 'emergencyCall':
          setEmergencyCallEnabled(!emergencyCallEnabled);
          break;
        default:
          break;
      }
    };

    const onSubmit = async (e) => {
      e.preventDefault();
      // setIsloading(true);

    console.log(astrologer[0]._id);
      try {
     const availableStatus = ({
      callAvailable : voiceCallEnabled,
      chatAvailable:textChatEnabled,
      emergencyCallAvailable:emergencyCallEnabled
     })
     
      // console.log('userdetails',userDetail);
          const response = await fetch(
            `http://127.0.0.1:8001/api/v1/astrologer/available/${astrologer[0]?._id}`,

            {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify(availableStatus)
            }
          );
  
          console.log(response);
          if (response.ok === false) {
          
            alert("failed")
          
          } else {
        alert('sucess')
          }
        
        }
       catch (error) {
        console.error("Error during course update:", error);
  
    
    };
  }
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
            <h4>Settings</h4>
            <div style={{ height: "3px", width: "40px", backgroundColor: "#FFCB11", borderRadius: "10px", marginTop: "3px" }}></div>
            <main id="settings">
                <div>
                    <span></span>
                    <p style={{marginTop:"0"}}>Off/On</p>
                </div>
                <div>
                    <p>Voice call</p>
                    <CustomSwitch {...label} defaultChecked={voiceCallEnabled} 
                    onChange={() => handleSwitchToggle('voiceCall')} />
                </div>
                <div>
                    <p>Text chat</p>
                    <CustomSwitch {...label} defaultChecked={textChatEnabled}
                    onChange={() => handleSwitchToggle('textChat')}  />
                </div>
                <div>
                    <p>Emergency call</p>
                    <CustomSwitch {...label} defaultChecked={emergencyCallEnabled}  onChange={() => handleSwitchToggle('emergencyCall')}  />
                </div>
            </main>
            <Button onClick={onSubmit} className="btn-primery">sumbit</Button>

            </div>
        </>
    )
}


export default Settings