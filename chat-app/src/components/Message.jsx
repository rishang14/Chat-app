
import { useAuthAndChatContext } from "../Context/Context"; 
 import "../components/messagestyle.style.scss";

const Message = ({messages}) => { 
  const {currentUser,data} =useAuthAndChatContext() 
  
  return (
    <>
      <div className="message owner">
        <div className="messageInfo">
          <img   src={currentUser.photoURL} alt="" /> 
          <span>Just now</span>
        </div>
        <div className="messageContent" >
       <p >Hello i am Rishang </p> 
       {/* <img src={currentUser.photoURL} alt="msg" /> */}
        </div>
      </div>
    </>
  );
};

export default Message;
