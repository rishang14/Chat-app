import React, { useState, useEffect } from 'react';
import { auth } from '../firebase'; 
import {signOut} from "firebase/auth"
import { useAuth } from '../Context/AuthContext';
import { getDatabase, ref, get } from 'firebase/database';

const Nav = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const database = getDatabase();
        const userDbRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(userDbRef);
        setUserData(snapshot.val());
      }
    };

    fetchUserData();
  }, [user]);

  if (user && userData) {
    return (
      <>
        <div>
          <span>Chit Chat</span>
          <div>
            <img src={userData.photoURL} alt="profile pic" />
            <span>{userData.displayName}</span>
            <button onClick={() => signOut(auth)}>Log out</button>
          </div>
        </div>
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Nav;
