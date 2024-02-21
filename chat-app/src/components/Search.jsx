import { collection, query, where, getDocs } from "firebase/firestore";  
import { db } from "../firebase";
import { useState } from "react"; 

const Search = () => {
  const [searchedUser, setSearchedUser] = useState(null);
  const [inputField, setInputField] = useState("");  
  const [err, setErr] = useState(false);

  const handleSearch = async () => { 
    const q = query(collection(db, "users"), where("displayName", "==", inputField));  

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
  }

  const handlekey = (e) => {
    e.code === "Enter" && handleSearch();
  }; 

  return (
    <> 
      <div>
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handlekey}
          onChange={(e) => setInputField(e.target.value)}
        /> 
      </div>
      {err ? (
        <div>not found</div>
      ) : searchedUser ? (
        <div>
          <div>
            <img className="h-8 w-8" src={searchedUser.photoUrl} alt="hello" />
            <div>
              <span>{searchedUser.displayName}</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Search;
