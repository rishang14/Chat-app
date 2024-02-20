import { createContext, useContext } from "react";

const Context = createContext();

export const AuthProvider = ({ children }) => {
  return <Context.Provider value={{}}>{children}</Context.Provider>;
};
 
 
export const useAuthAndChatContext=()=>{
    return useContext(Context)
}