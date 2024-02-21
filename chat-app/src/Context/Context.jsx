import { createContext, useContext, useEffect, useState } from "react"; 
import {onAuthStateChanged} from "firebase/auth" 
import { auth } from "../firebase";

const Context = createContext();

export const AuthProvider = ({ children }) => { 
  const [currentUser,setCurrentUseer]=useState({})  
   
  useEffect(()=>{ 
    onAuthStateChanged(auth,(user)=>{ 
      setCurrentUseer(user) 
      console.log(user,"from auth")

    })
   

  },[])
   

   

  return <Context.Provider value={{currentUser}}>{children}</Context.Provider>;
};
 
 
export const useAuthAndChatContext=()=>{
    return useContext(Context)
}