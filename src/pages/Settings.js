import "../Stylesheets/Settings.css"
import { alpha, styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Sidebar from "../components/Sidebar";
import Offcanvas from "../components/Offcanvas";


function Settings() {


    const CustomSwitch = styled(Switch)(({ theme }) => ({
        '& .MuiSwitch-switchBase.Mui-checked': {
            color: "#EE721B",
            '&:hover': {
                backgroundColor: alpha("#EE721B", theme.palette.action.hoverOpacity),
            },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: "#EE721B",
        },
    }));

    const label = { inputProps: { 'aria-label': 'Color switch demo' } };
    return (
        <>
             <div id="fixedbar">
        <Sidebar />
      </div>
      <div id="offcanvas">
        <Offcanvas />
      </div>

      <div className="infoContainer">
            <h4>Settings</h4>
            <div style={{ height: "3px", width: "40px", backgroundColor: "#EE721B", borderRadius: "10px", marginTop: "3px" }}></div>
            <main id="settings">
                <div>
                    <span></span>
                    <p style={{marginTop:"0"}}>Off/On</p>
                </div>
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
            </main>
            </div>
        </>
    )
}


export default Settings