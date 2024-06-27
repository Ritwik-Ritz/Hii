import React, {useState} from 'react';

export const ChatFooter = ({socket}) =>{
    const [message, setMessage] = useState("");

    const handleSendMessage = (e) => {
        e.preventDefault()
        // checking if the message field is empty or filled with empty along with checking the username
        if(message.trim() && localStorage.getItem("userName"))
        {
            socket.emit("message",{
                text: message, 
                name: localStorage.getItem("userName"), 
                id: `${socket.id}${Math.random()}`,
                socketID: socket.id
                })
        }
        setMessage("")
    }

    return(
        <div className='chat__footer'>
            <form className="form" onSubmit={handleSendMessage}>
                <input type="text" placeholder="Write message" className="message" value={message} 
                onChange={(e) => setMessage(e.target.value)}/>

                <button className='sendBtn'>Send</button>
            </form>
        </div>
    );

};