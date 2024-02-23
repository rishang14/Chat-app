import React, { useState } from "react";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { useAuthAndChatContext } from "../Context/Context";

const Input = () => {  
  const [text,setText]=useState(""); 
  const [img,setImg]=useState(null)
  const {currentUser,data}=useAuthAndChatContext()
  return (
    <>
      <div className="h-[70px] p-[10px] flex items-center justify-between">
        <input type="text" className="w-[100%] border-none outline-none text-[18px] "  placeholder=" Type Something "/>
        <div className=" flex items-center gap-[10px]">
          <input  type="file" style={{ display: "none" }} id="file" />
          <label htmlFor="file">
            <HiOutlineDocumentAdd size={25} className=" cursor-pointer" />
          </label>
          <button className="py-[10px] px-[15px] bg-cyan-300">Send</button>
        </div>
      </div>
    </>
  );
};

export default Input;
