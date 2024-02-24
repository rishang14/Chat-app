import React, { useEffect, useState } from "react"
import Chat from "../components/Chat"
import Sidebar from "../components/Sidebar" 
import { useAuthAndChatContext } from "../Context/Context"
import Loader from "../components/Loader"


const Home = () => { 
  const {currentUser,data}=useAuthAndChatContext()   
  const [loading,setLoading]=useState(true)  
  const [selectedUseer,setSelectedUser]=useState(null)
  
  useEffect(()=>{
      if(currentUser.uid && data){
         setLoading(false)
      }
  },[currentUser,data.user])

  return (
    <> 
    <div className="h-[100vh] flex items-center justify-center overflow-hidden">
      <div className="border border-solid border-black rounded-[10px] w-[65%] h-[80%] flex overflow-hidden">
       {loading ? <div className="flex justify-center items-center  w-full "><Loader /></div>  : <> <Sidebar setSelectedUser={selectedUseer}/> 
        <Chat selectedUseer={selectedUseer}/>
       </>}
      </div>
    </div>
    
    </>
  )
}

export default Home; 
