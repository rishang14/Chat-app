import React from 'react'
import Message from './Message' 

const Messages = () => {
  
  return ( 
  
    <>
     <div style={{ height: 'calc(100% - 120px)', overflowY:"scroll",scrollbarWidth:'thin' }} className='bg-gray-300 p-[10px] '>
        <Message/>   
     </div>
    </>
  )
}

export default Messages