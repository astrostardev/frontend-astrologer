import React from "react";
import "./welcome.css";
import logo from "../../../assests/chatImage.jpg";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
function Welcome() {
  return (
    <div className="welcome-container">
  <AnimatePresence>
   <motion.div 
   initial ={{opacity:0, scale:1}}
   animate={{opacity:1, scale:1}}
   exit = {{opacity:0, scale:0}} 
   transition={{ease:"anticipate",
   duration:"0.3"}}>

    <img src={logo} alt="" className="welcome-logo" />
  

       </motion.div>
    </AnimatePresence>
    </div>

  // <div  className="welcome-container">
  // <img src={logo} alt="" className="welcome-logo" />
  //   <p>View and text directly to astrologers present in the chat rooms</p>

  // </div>
  );
}

export default Welcome;
