import React from "react";
import { useAuthAndChatContext } from "../Context/Context";

const Chats = () => {
  const { currentUser } = useAuthAndChatContext();
  return (
    <> 
    <div>
    <div className="p-[10px] flex items-center gap-[10px] cursor-pointer hover:bg-slate-300">
            <img
              className="h-[50px] w-[50px] rounded-full object-cover"
              src={currentUser.photoURL}
              alt="hello"
            /> 
            <div>
            <span className="text-[18px] font-[500]">{currentUser.displayName}</span> 
            <p className="text-[14px] ">hello</p>

            </div>
          </div>
        </div>
      
    </>
  );
};

export default Chats;
