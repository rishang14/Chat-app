import Input from "./Input";
import Messages from "./Messages";
import { useAuthAndChatContext } from "../Context/Context";
import { FcVideoCall, FcMissedCall } from "react-icons/fc";
import { IoIosMore } from "react-icons/io";
const Chat = () => {
  const { data} = useAuthAndChatContext(); 
   
  const handleClick=()=>{
     alert("Not available Right Now")
  }
  return (
    <>
      <div className="w-full">
        <div className="h-[50px] flex items-center justify-between p-[10px]">
          <span>{data.user.displayName}</span>
          {/* For future */}
          <div className="flex gap-[10px]">
            <button onClick={()=> handleClick()}>
              <FcVideoCall size={25} />
            </button>
            <button onClick={()=> handleClick()}>
              <FcMissedCall size={25} />
            </button>
            <button onClick={()=>handleClick()}>
              {" "}
              <IoIosMore size={25} />
            </button>
          </div>
        </div>
        <Messages />
        <Input />
      </div>
    </>
  );
};

export default Chat;
