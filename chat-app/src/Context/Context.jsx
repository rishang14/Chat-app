import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const Context = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUseer] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUseer(user);
    });
    return () => {
      unsub();
    };
  }, []);
  return (
    <Context.Provider value={{ currentUser }}>{children}</Context.Provider>
  );
};

export const useAuthAndChatContext = () => {
  return useContext(Context);
};
