import "../Stylesheets/Offcanvas.css";
import { HiMenuAlt1 } from "react-icons/hi";
import { PiWalletBold } from "react-icons/pi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import Logo from "../assests/qq.jpg";
import astrologer from "../assests/astrologer.jpg";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsCash, BsChatLeftText } from "react-icons/bs";
import { RiHistoryFill } from "react-icons/ri";
import { MdAddToQueue, MdArrowDropDown, MdOutlineCall } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { FiHelpCircle } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function Offcanvas() {
  const { astrologer, token } = useSelector((state) => state.astroState);

  function openCanvas() {
    let canvas = document.querySelector(".canvas");
    canvas.classList?.add("openCanvas");
  }
  function closeCanvas() {
    let canvas = document.querySelector(".canvas");
    canvas.classList?.remove("openCanvas");
  }

  function toggledropdown() {
    let content = document.querySelector(".drop");
    content.classList.toggle("show-content");
  }

  function closedropdown() {
    let content = document.querySelector(".drop");
    content.classList.remove("show-content");
  }
  function toggleHis() {
    let historydrop = document.querySelector(".history-container");
    historydrop.classList.toggle("open-hist");
  }

  const refCanvas = useRef(null);

  const handleClickOutside = (e) => {
    if (!refCanvas?.current?.contains(e.target)) {
      closeCanvas();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);

  const dropOne = useRef(null);
  const handleDropOne = (e) => {
    if (!dropOne?.current?.contains(e.target)) {
      closedropdown();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleDropOne, true);
  }, []);

  return (
    <>
      <aside className="canvas" ref={refCanvas}>
        <div className="logoContainer" style={{ backgroundColor: "#fff" }}>
          <img src={Logo} alt="logo" />
          <div>
            <RiCloseLine style={{ fontSize: "25px" }} onClick={closeCanvas} />
          </div>
        </div>
        <div className="divider"></div>
        <section className="side-menu">
          <Link className="side-link" to="/" onClick={closeCanvas}>
            <LuLayoutDashboard style={{ fontSize: "20px" }} />
            <span>Dashboard</span>
          </Link>
          <Link className="side-link" to="/earnings" onClick={closeCanvas}>
            <BsCash style={{ fontSize: "20px" }} />
            <span>Earnings</span>
          </Link>
          <button className="side-link" onClick={toggleHis}>
            <RiHistoryFill style={{ fontSize: "20px" }} />
            History
            <MdArrowDropDown style={{ fontSize: "20px", marginLeft: "40px" }} />
          </button>
          <div className="history-container">
            <Link className="hist-link" to="/chathistory" onClick={closeCanvas}>
              <BsChatLeftText style={{ fontSize: "20px" }} />
              <span>Chat</span>
            </Link>
            <Link className="hist-link" to="/callhistory" onClick={closeCanvas}>
              <MdOutlineCall style={{ fontSize: "20px" }} />
              <span>Call</span>
            </Link>
          </div>
          <Link
            className="side-link"
            to={`/chats/${astrologer[0]?._id}`}
            onClick={closeCanvas}
          >
            <MdAddToQueue style={{ fontSize: "20px" }} />
            <span>Chat requests</span>
          </Link>
          <Link className="side-link" to="/settings" onClick={closeCanvas}>
            <AiOutlineSetting style={{ fontSize: "20px" }} />
            <span>Settings</span>
          </Link>
          <Link className="side-link" onClick={closeCanvas}>
            <FiHelpCircle style={{ fontSize: "20px" }} />
            <span>Help</span>
          </Link>
        </section>
        <div className="divider"></div>
      </aside>
      <main id="navhead">
        <section className="_nav">
          <div>
            {/* logo */}
            <div style={{ marginTop: "5px" }}>
              <HiMenuAlt1 style={{ fontSize: "25px" }} onClick={openCanvas} />
            </div>
            <img src={Logo} alt="logo" />
          </div>

          <div onClick={closeCanvas}>
            {/* Earning */}
            <div className="earning">
              <PiWalletBold style={{ fontSize: "25px" }} />
              <span>₹45000</span>
            </div>
            <IoMdNotificationsOutline style={{ fontSize: "25px" }} />

            {/* Profile */}
            <div className="profileDrop">
              <button className="dropbtn" onClick={toggledropdown}>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip id="tooltip-disabled" className="tooltip_name">
                      {astrologer[0]?.displayname}
                    </Tooltip>
                  }
                >
                  <span
                    className="user-icon"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Tooltip on bottom"
                  >
                    {astrologer[0]?.displayname[0]}
                  </span>
                </OverlayTrigger>
                <div style={{ marginTop: "5px" }}>
                  <RiArrowDropDownLine style={{ fontSize: "25px" }}/>
                </div>
              </button>
              <div className="drop">
                <Link to="/astroProfile" onClick={closedropdown}>
                  Your Profile
                </Link>
                <hr />
                <Link href="#" onClick={closedropdown}>
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Offcanvas;
