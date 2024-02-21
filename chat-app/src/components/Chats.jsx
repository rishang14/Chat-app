import React from 'react' 
import { useAuthAndChatContext } from '../Context/Context'

const Chats = () => { 
  const {currentUser}=useAuthAndChatContext()
  return (
    <> 
    <div>
    <div>
            <img className='h-[20px] w-10' src={currentUser.photoURL} alt="" />  
            <div>
                <span>{currentUser.displayName}</span> 
                <p>helo</p>
            </div>

          </div>
    </div>
    
    </>
  )
}

export default Chats