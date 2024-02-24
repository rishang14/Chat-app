import React, { useState ,useEffect} from 'react'
import Message from './Message' 
import { useAuthAndChatContext } from '../Context/Context'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const Messages = () => {
  const [messages,setmessages]=useState([])  
  const {data } =useAuthAndChatContext()
  useEffect(()=>{ 
    const unsub=onSnapshot(doc(db,"chats",data.chatID),(doc)=>{
      doc.exists() && setmessages(doc.data().messages )
    })  
   
    return ()=>{
      unsub()
    }
     
  },[data.chatID]) 

  
  return ( 
  
    <>
     <div style={{ height: 'calc(100% - 120px)', overflowY:"scroll",scrollbarWidth:'thin' }} className='bg-gray-300 p-[10px] '>
        {
          messages.map((m)=>(
             <Message messages={m} key={m.id}/>
          ))
        } 
     </div>
    </>
  )
}

export default Messages