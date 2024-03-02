import React from 'react'
import './conversationitem.css'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { extractTime } from "../../../utils/extractTime";

function ConversationItem({props,message}) {
  const navigate = useNavigate()
  const formatedTime = extractTime(message?.createdAt);

  return (
    <motion.div onClick={()=>{navigate(`chat_content/${props.participants[0]?._id}`)}} whileHover={{scale:1.05}} whileTap={{scale:0.98}}>
    <div className='conversation-container'>
    <p className='con-icon'>{props?.participants[0]?.name[0]}</p>
      <p className='con-title'>{props?.participants[0]?.name}</p>
      <p className='con-lastMessage'>{message?.message}</p>
      <p className='con-timeStamp'>{formatedTime}</p>
    </div>
    </motion.div>
  )
}

export default ConversationItem
