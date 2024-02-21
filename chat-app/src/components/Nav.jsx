import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuthAndChatContext } from "../Context/Context";

const Nav = () => {
  const { currentUser } = useAuthAndChatContext();
  return (
    <div>
      <div>CHIT-CHAT</div>
      <div>
        <img className="h-8 w-8" src={currentUser.photoURL} alt="Dp" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};

export default Nav;
