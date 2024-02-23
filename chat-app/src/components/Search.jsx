import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { useAuthAndChatContext } from "../Context/Context";
import Loader from "./Loader";

const Search = () => {
  const [searchedUser, setSearchedUser] = useState(null);
  const [inputField, setInputField] = useState("");
  const [err, setErr] = useState(false);
  const { currentUser } = useAuthAndChatContext(); 
  const [loading,setLoading]=useState(false)

  const handleSelect = async () => {
    const combineId =
      currentUser.uid > searchedUser.uid
        ? currentUser.uid + searchedUser.uid
        : searchedUser.uid + currentUser.uid
    try {
      const res = await getDoc(doc(db, "chats", combineId));
      // create chat in chats collection
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combineId), { messages: [] });
      }
      // creating userschat
      const currentUserRef = doc(db, "usersChat", currentUser.uid);
      const searchedUserRef = doc(db, "usersChat", searchedUser.uid);
      // Ensure that searchedUser and searchedUser.photoUrl are defined
      if (currentUser && currentUser.photoURL) {
        await updateDoc(currentUserRef, {
          [combineId]: {
            userInfo: {
              uid: searchedUser.uid,
              displayName: searchedUser.displayName,
              photoUrl: searchedUser.photoUrl,
            },
            date: serverTimestamp(),
          },
        });

        await updateDoc(searchedUserRef, {
          [combineId]: {
            userInfo: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoUrl: currentUser.photoURL,
            },
            date: serverTimestamp(),
          },
        });
      }
    } catch (error) {
     setSearchedUser(null) 
     setInputField('')

    }
  }; 
  const handleInputChange = (e) => {
    setInputField(e.target.value);
    setErr(false); // Hide error message when user starts typing again
    setSearchedUser(null) 
                       
  }; 
  
  
  const handlekey = async (e) => {
    if (e.code === "Enter") {
      setLoading(true);
      await handleSearch();
      setLoading(false); 
      
    }
  };
  
  const handleSearch = async () => {  
    
    const q = query(
      collection(db, "users"),
      where("displayName", "==", inputField.trim())
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
      setLoading(false)
      setErr(true); // Set error state if there is an error  

    }
  };

  return (
    <>
      <div className="border-b border-gray-900">
        <div className="p-[10px] ">
          <input
            className="border-none outline-none"
            type="text"
            placeholder="Find a user"
            onKeyDown={handlekey}
            onChange={handleInputChange} 
            value={inputField}
          />
        </div>
      

      { loading ? <Loader/> :
      
      err ? (
        <div  >not found</div>
      ) : searchedUser ? (
        <div
          className="p-[10px] flex items-center gap-[10px] cursor-pointer hover:bg-slate-300"
          onClick={() => handleSelect()}
        >
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
