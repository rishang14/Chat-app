import { initializeApp } from "firebase/app"; 
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from  "firebase/auth" 
import {getDoc, doc,setDoc,getFirestore,} from "firebase/firestore" 
import {getStorage,ref,uploadBytes,getDownloadURL} from  "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyB6FUr4LTatkKlhYaLO7rtbitKLZ8kgt0U",
  authDomain: "chit-chat-app-bdf16.firebaseapp.com",
  projectId: "chit-chat-app-bdf16",
  storageBucket: "chit-chat-app-bdf16.appspot.com",
  messagingSenderId: "886084448380",
  appId: "1:886084448380:web:53574db88bb8048e0bd9f9"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);  


 export const auth =getAuth()   
  

//   creating database for storing users  
const db=getFirestore(); 
const storage=getStorage()
 export const createUserDocWithAuth=async(userAuth,additinalinfo={}) =>{
  
    const userdocref= doc(db,'users',userAuth.uid) ; 
     console.log(userdocref) 
      
     const userSnapshot= await getDoc(userdocref) 
     console.log(userSnapshot) 
      
     if(!userSnapshot.exists()){
        const {displayName,email,photoURL} =userAuth; 
        const createdAt=new Date()  
         
        try{
            await setDoc(userdocref,{
                displayName, 
                email,
                createdAt, 
                photoURL:photoURL || null, 
                ...additinalinfo
               
            }) 
            
        } catch(error){
            alert("error while creating user",error)
        }
     } 
     return userdocref;
 } 
  
 export const createAuthUserWithEmailAndPassword=async(email,password)=>{
    if(!email || !password) return 
     
    return await createUserWithEmailAndPassword(auth,email,password)
 }
 
 export const UploadprofileImage=async(userId,file)=>{ 
    const storageref = ref(storage, `profile-images/${userId}`);
    await uploadBytes(storageref,file) 
     
    // get download url 
    const downloadurl=await getDownloadURL(storageref) 
    return downloadurl;

 } 
  
 export const signInAuthWithEmailAndPassword =async (email,password)=>{ 
    if(!email || !password) return; 
     
    return await signInWithEmailAndPassword(auth,email,password)

 }