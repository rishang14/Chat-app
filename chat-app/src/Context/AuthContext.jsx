import React from 'react' 
import { useState ,useContext,createContext,useEffect} from 'react';  
import {onAuthStateChanged} from "firebase/auth"
import { auth } from '../firebase';
 
const Context=createContext();

export const AuthProvider=({children})=>{ 
    const [user,setUser] =useState(null); 
     
 useEffect(()=>{
   const unsub= onAuthStateChanged(auth,(user)=>{
        setUser(user)
    }) 
    return ()=>{
        unsub();
    }
 },[])

    return(
        <Context.Provider value={{user}}> 
          {children}
        </Context.Provider>
    )
} 
 
 
export const useAuth=()=>{
    return useContext(Context)
}