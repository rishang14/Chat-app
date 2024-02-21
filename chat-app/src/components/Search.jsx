import React from 'react'
import { useAuthAndChatContext } from '../Context/Context'

const Search = () => { 
  const {currentUser}=useAuthAndChatContext()
  return (
    <>  
    <div>
       <div>
         <input type="text"  placeholder='Find a user' />
        </div>  
          <div>
            <img className='h-8 w-8' src={currentUser.photoURL} alt="pic" />  
            <div>
                <span>{currentUser.displayName}</span>
            </div>

          </div>
    </div>

    
    </>
  )
}

export default Search