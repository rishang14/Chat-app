import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const Context = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUseer] = useState({});  
  const [showChat,setShowChat] =useState(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUseer(user);
    });
    return () => {
      unsub();
    };
  }, []); 
   
     const INITAL_STATE={
      chatID:"null", 
      user:{}
     } 
      
     const chatReducer=(state,action)=>{
      switch(action.type){
        case "CHANGE_USER": return {
          user:action.payload, 
          chatID:currentUser.uid > action.payload.uid
          ? currentUser.uid + action.payload.uid
          : action.payload.uid + currentUser.uid
        };  
        
        default :return state;
      }
     } 
     
     const [state,dispatch]=useReducer(chatReducer,INITAL_STATE)


         
    
  return (
    <Context.Provider value={{ currentUser,data:state,dispatch ,setShowChat,showChat}}>{children}</Context.Provider>
  );
};

export const useAuthAndChatContext = () => {
  return useContext(Context);
};
