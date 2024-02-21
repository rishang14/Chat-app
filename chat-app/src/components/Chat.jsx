import Input from "./Input"
import Messages from "./Messages" 
import { useAuthAndChatContext } from "../Context/Context"

const Chat = () => { 
 
    const {currentUser}=useAuthAndChatContext()
  return ( 
    <> 
    <div>
        <div>
            <span>{currentUser.displayName}</span>  
            {/* For future */}
            <div>
             <button>Video call</button>  
             <button>Audio call</button>  
             <button> More</button>  
            </div>
        </div> 
        <Messages/> 
        <Input/>
    </div>
    </>
    
    )
}

export default Chat