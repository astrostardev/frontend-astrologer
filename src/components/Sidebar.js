import "../Stylesheets/Sidebar.css"
import Logo from "../assests/qq.jpg"
import { LuLayoutDashboard } from "react-icons/lu"
import { BsCash, BsChatLeftText } from "react-icons/bs"
import { RiHistoryFill } from "react-icons/ri"
import { MdAddToQueue, MdArrowDropDown, MdOutlineCall } from "react-icons/md"
import { AiOutlineSetting } from "react-icons/ai"
import { FiHelpCircle } from "react-icons/fi"
import { Link } from "react-router-dom"
import { PiWalletBold } from "react-icons/pi"
import { IoMdNotificationsOutline } from "react-icons/io"
import { RiArrowDropDownLine } from "react-icons/ri"
import astrologer from "../assests/astrologer.jpg"
import welcome from "../assests/welcome.png"
import { useRef, useEffect,useState } from "react";
import { useSelector } from "react-redux"
import { useCallback } from "react"
function Sidebar({sideBarUsers}) {
    const { astrologer,token } = useSelector((state) => state.astroState);
  const [users, setUsers] = useState(null);

    function toggledropdown() {
        let content = document.querySelector(".drop-content")
        content.classList?.toggle("toggle-content")
    }

    function closedropdown() {
        let content = document.querySelector(".drop-content")
        content.classList?.remove("toggle-content")
    }

    function toggleHistory() {
        let historydrop = document.querySelector(".historydrop-container")
        historydrop.classList?.toggle("open-history")
    }


    const dropTwo = useRef(null)
    const handleDroptwo = (e) => {
        if (!dropTwo?.current?.contains(e.target)) {
            closedropdown()
        }
    }
    useEffect(() => {
        document.addEventListener("click", handleDroptwo, true)
    }, [])
     function fetchData() {
        let response = fetch(`${process.env.REACT_APP_URL}/api/v1/astrologer/logoutAstrologer`, {
            method: "GET",
        });
      
        console.log(response)
 }

    

 async function getUser() {
   try {
     let response = await fetch(
       `${process.env.REACT_APP_URL}/api/v1/fetch_chat`,
       {
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
         },
         method: "POST",
         body: JSON.stringify({
           id: astrologer[0]?._id,
         }),
       }
     );
 
     if (!response.ok) {
       throw new Error("Failed to fetch user");
     }
 
     let data = await response.json();
     setUsers(data?.chats);
   } catch (error) {
     console.error("Error fetching user:", error);
   }
 }
 
 useEffect(() => {
   getUser();
 }, []);
 
 useEffect(() => {
   console.log("Users in Sidebar 1  :", users);
 }, [users]);
 

  useEffect(() => {
    sideBarUsers(users); 
    console.log(typeof sideBarUsers);
    return () => {
        console.log("Users in Sidebar:", users);

    };
  }, [sideBarUsers, users]);
  

  const sendUsersToChatBody = useCallback((users) => {
    console.log("Users in Sidebar:", users);
  }, []);


    
    return (
        <>
            <aside id="side">
                <div className="logoContainer" style={{backgroundColor:"#fff"}}>
                    <img src={Logo} alt="logo" />
                </div>
                <div className="divider"></div>
                <section className="side-menu">
                    <Link className="side-link" to="/dashboard">
                        <LuLayoutDashboard style={{ fontSize: "20px" }} />
                        <span>Dashboard</span>
                    </Link>
                    <Link className="side-link" to="/earnings">
                        <BsCash style={{ fontSize: "20px" }} />
                        <span>Earnings</span>
                    </Link>
                    <button className="side-link" onClick={toggleHistory}>
                        <RiHistoryFill style={{ fontSize: "20px" }} />
                        History
                        <MdArrowDropDown style={{ fontSize: "20px", marginLeft: "40px" }} />
                    </button>
                    <div className="historydrop-container">
                        <Link className="history-link" to="/chathistory">
                            <BsChatLeftText style={{ fontSize: "20px" }} />
                            <span>Chat</span>
                        </Link>
                        <Link className="history-link" to="/callhistory">
                            <MdOutlineCall style={{ fontSize: "20px" }} />
                            <span>Call</span>
                        </Link>
                    </div>
                    <Link className="side-link" to={`/chats/${astrologer[0]?._id}`}>
                        <MdAddToQueue style={{ fontSize: "20px" }} />
                        <span>Chat requests</span>
                    </Link>
                    <Link className="side-link" to="/settings">
                        <AiOutlineSetting style={{ fontSize: "20px" }} />
                        <span>Settings</span>
                    </Link>
                    <Link className="side-link">
                        <FiHelpCircle style={{ fontSize: "20px" }} />
                        <span>Help</span>
                    </Link>
                </section>
                <div className="divider"></div>
            </aside>
            <main>
                <header id="head">
                    <article>
                        <h4> <span style={{ color: "#FFCB11", textTransform:"capitalize" }}>{astrologer[0]?.displayname}</span></h4>
                        {/* <img src={welcome} alt="welcome" className="welcome" /> */}
                    </article>
                    <div>
                        {/* Earning */}
                        <div className="earning">
                            <PiWalletBold style={{ fontSize: "25px" }} />
                            <span>₹{astrologer[0]?.balance}</span>
                        </div>
                        <IoMdNotificationsOutline style={{ fontSize: "25px" }} />


                        {/* Profile */}
                        <div className="profileDrop">
                            <button className="dropbtn" onClick={toggledropdown}>
                                <p  className="con-icon" style={{ color: "#FFF", background:"#FFCB11", marginTop: "15px", textTransform:"capitalize" }} >{astrologer[0]?.displayname[0]}</p>
                                <div style={{ marginTop: "5px" }}><RiArrowDropDownLine style={{ fontSize: "25px" }} /></div>
                            </button>
                            <div className="drop-content" ref={dropTwo}>
                                <Link to="/astroProfile" className="drop-link" onClick={closedropdown}>Your Profile</Link>
                                <hr />
                                <Link to="/" className="drop-link" onClick={()=>{fetchData(); closedropdown()}}>Logout</Link>
                            </div>
                        </div>
                    </div>
                </header>
            </main>
        </>
    )
}

export default Sidebar