import Input from "./Input"
import Messages from "./Messages"

const Chat = () => {
  return ( 
    <> 
    <div>
        <div>
            <span>Username</span>  
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