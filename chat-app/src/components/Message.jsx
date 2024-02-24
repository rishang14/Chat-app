
import { useEffect, useRef } from "react";
import { useAuthAndChatContext } from "../Context/Context"; 
 import "../components/messagestyle.style.scss";

const Message = ({messages}) => {  
  const {currentUser,data} =useAuthAndChatContext() 
  
    const ref=useRef( )
    
    useEffect(()=>{
      ref.current?.scrollIntoView({behaviour:"smooth"})
    },[messages])
     
  return (
    <>
    <div ref={ref} className={`message ${messages.senderId ===currentUser.uid  && 'owner'}`}>
        <div className="messageInfo">
          <img   src={messages.senderId ===currentUser.uid ?currentUser.photoURL : data.user.photoUrl } alt="" /> 
          <span>Just now</span>
        </div>
        <div className="messageContent" >
         {
          messages.text ? <p>{messages.text}</p> 
          :messages.text && messages.img ? <> 
          <p>{messages.text}</p> <img src={messages.img} alt="img" />  
          </> : <img src={messages.img} alt="img" />       }
        </div>
      </div>
    
    </>
  );
};

export default Message;
