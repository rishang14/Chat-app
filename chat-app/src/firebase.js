
import { initializeApp } from "firebase/app"; 
import { getAuth } from "firebase/auth"; 
import { getStorage } from "firebase/storage"; 
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6FUr4LTatkKlhYaLO7rtbitKLZ8kgt0U",
  authDomain: "chit-chat-app-bdf16.firebaseapp.com",
  databaseURL: "https://chit-chat-app-bdf16-default-rtdb.firebaseio.com",
  projectId: "chit-chat-app-bdf16",
  storageBucket: "chit-chat-app-bdf16.appspot.com",
  messagingSenderId: "886084448380",
  appId: "1:886084448380:web:53574db88bb8048e0bd9f9"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);  
 
  
 
 
export const auth=getAuth(app)  
export const storage=getStorage()  
export const db=getFirestore() ; 



 
