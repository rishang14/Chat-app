import React from "react"
import Chat from "../components/Chat"
import Sidebar from "../components/Sidebar"


const Home = () => {
  return (
    <> 
    <div className="h-[100vh] flex items-center justify-center overflow-hidden">
      <div className="border border-solid border-black rounded-[10px] w-[65%] h-[80%] flex overflow-hidden">
        <Sidebar/> 
        <Chat/> 
      </div>
    </div>
    
    </>
  )
}

export default Home;