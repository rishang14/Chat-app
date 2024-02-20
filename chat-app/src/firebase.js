import { initializeApp } from "firebase/app"; 
import { getAuth } from "firebase/auth"; 
import {getStorage} from "firebase/storage" 
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA7jVLift_GMpErn4UyRAoobmawt65kuyE",
  authDomain: "chat-app-84b18.firebaseapp.com",
  projectId: "chat-app-84b18",
  storageBucket: "chat-app-84b18.appspot.com",
  messagingSenderId: "992632748721",
  appId: "1:992632748721:web:473ad280e0f9b0c7a38090",
  measurementId: "G-D97EXD14ML", 
  databaseURL:"https://chat-app-84b18-default-rtdb.firebaseio.com/"
};

 export const app = initializeApp(firebaseConfig); 
 export const auth=getAuth(app); 
 export const storage=getStorage(); 
 export const db=getFirestore(app);

 
