import Chats from './Chats'
import Nav from './Nav'
import Search from './Search'

const Sidebar = () => {
  return (
    <> 
    <div className='  w-[400px] border-r border-solid border-1 border-black '>
        <Nav/> 
        <Search/> 
        <Chats/>
    </div>
    
    </>
  )
}

export default Sidebar