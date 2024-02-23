import { collection, query, where, getDocs, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { useAuthAndChatContext } from "../Context/Context";

const Search = () => {
  const [searchedUser, setSearchedUser] = useState(null);
  const [inputField, setInputField] = useState("");
  const [err, setErr] = useState(false); 
  const {currentUser}=useAuthAndChatContext()

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", inputField)
    );

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setErr(true); // User not found
      } else {
        querySnapshot.forEach((doc) => {
          setSearchedUser(doc.data());
          setErr(false); // Reset error state
        });
      }
    } catch (error) {
      console.error(error);
      setErr(true); // Set error state if there is an error
    }
  };

  const handlekey = (e) => {
    e.code === "Enter" && handleSearch();
  }; 
   
  const handleSelect=async()=>{  
    // create a chats in chat collection  
    const combineId=currentUser.uid >searchedUser.uid ? currentUser.uid +searchedUser.uid :searchedUser.uid + currentUser.uid
  
    try{
      const res=await getDoc(db,"chats",combineId)   
       
      // create chats if not exist  
      if( !res.exists()) {
        await setDoc(doc(db,"chats",combineId),{messages:[]})
      }

    }catch(error){

    }
     





  }

  return (
    <>
      <div className="border-b border-gray-900">
        <div className="p-[10px] ">
          <input
            className="border-none outline-none"
            type="text"
            placeholder="Find a user"
            onKeyDown={handlekey}
            onChange={(e) => setInputField(e.target.value)}
          />
        </div>
        {err ? (
          <div>not found</div>
        ) : searchedUser ? (
          <div className="p-[10px] flex items-center gap-[10px] cursor-pointer hover:bg-slate-300" onClick={handleSelect}>
            <img
              className="h-[50px] w-[50px] rounded-full object-cover"
              src={searchedUser.photoUrl}
              alt="hello"
            />
            <span>{searchedUser.displayName}</span>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Search;
