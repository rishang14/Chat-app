import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuthAndChatContext } from "../Context/Context";

const Nav = () => {
  const { currentUser } = useAuthAndChatContext();
  return (
    <div className="flex items-center h-[50px] p-[10px] justify-between  ">
      <span className="font-bold">CHIT-CHAT</span>
      <div className="flex gap-[10px]">
        <img className="h-[24px] w-[24px] rounded-full object-cover" src={currentUser.photoURL} alt="Dp" />
        <span>{currentUser.displayName}</span>
        <button className="text-[10px] p-2 border-none rounded-md bg-cyan-500" onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};

export default Nav;
