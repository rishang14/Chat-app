import { useState,useEffect } from "react"; 
import { doc, onSnapshot } from "firebase/firestore"; 
import { db } from "../firebase"; 
import { useAuthAndChatContext } from "../Context/Context";

const Chats = () => { 
  const [chats,setChats]=useState([])  
  const {currentUser,dispatch}=useAuthAndChatContext()
   
  useEffect(()=>{ 
     
    const getchats =()=>{
     const unsub= onSnapshot(doc(db, "usersChat", currentUser.uid), (doc) => {
        setChats(doc.data())  
        

  });  
  return ()=>{
    unsub()
  }
}   
   currentUser.uid && getchats()
   
 
  },[currentUser.uid])
     
  const handleSelect=(u)=>{
    dispatch({type:"CHANGE_USER",payload:u})
  }
  return (
    <> 
    <div>
   {
    Object.entries(chats).sort((a,b)=>b[1].date - a[1].date)?.map((chat)=>{
      return (
        <div key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)} className="p-[10px] flex items-center gap-[10px] cursor-pointer hover:bg-slate-300">
        <img
          className="h-[50px] w-[50px] rounded-full object-cover"
          src={chat[1].userInfo.photoUrl}
          alt="hello"
        /> 
        <div>
        <span className="text-[18px] font-[500]">{chat[1].userInfo.displayName}</span> 
        <p className="text-[14px] ">{chat[1].lastMessage?.text}</p>

        </div>
      </div>
      )
    })
   }
        </div>
      
    </>
  );
};

export default Chats;
