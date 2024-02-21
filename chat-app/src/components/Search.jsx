import { collection, query, where, getDocs } from "firebase/firestore";  
import { db } from "../firebase";
import { useState } from "react"; 

const Search = () => {
  const [searchedUser, setSearchedUser] = useState({});
  const [user, setuser] = useState(false);
  const [inputField, setInputField] = useState(""); 
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const q = query(collection(db, "users"), where("displayName", "==", inputField));  

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setSearchedUser(doc.data());
        setuser(true);

        setTimeout(() => {
          setLoading(false);
        }, 4000);

      });
    } catch (error) {
      setuser(false);
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
      {loading && <p>Loading...</p>}
      {searchedUser.displayName && !loading && (
        <div>
          <div>
            <img className="h-8 w-8" src={searchedUser.photoUrl} alt="hello" />
            <div>
              <span>{searchedUser.displayName}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
