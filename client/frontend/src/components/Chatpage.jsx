import React, {useState, useEffect } from 'react'

import { ChatBar } from './chatbar';
import { ChatFooter } from './chatfooter';
import ChatBody from './chatbody';
 
const ChatPage = ({socket}) =>{

    const [messages, setMessages] = useState([])

    useEffect(()=> {
        socket.on("messageResponse", data => setMessages([...messages, data]))
      }, [socket, messages])

    return (
        <div className="chat">
          <ChatBar/>
          <div className='chat__main'>
            <ChatBody messages={messages}/>
            <ChatFooter socket={socket}/>
          </div>
        </div>
      )
}

export default ChatPage;