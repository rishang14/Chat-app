import {createUserWithEmailAndPassword,updateProfile} from "firebase/auth"
import { auth ,storage,db} from "../firebase"; 
import {ref} from "firebase/storage"; 
import {uploadBytesResumable,getDownloadURL} from "firebase/storage" 
import {setDoc,doc} from "firebase/firestore"


const Register = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    let displayName = e.target[0].value;
    let email = e.target[1].value;
    let password = e.target[2].value;
    let photoUrl = e.target[3].files[0]; 
     
    const resetformfeild=()=>{ 
      e.target[0].value="" 
      e.target[1].value="" 
      e.target[2].value="" 
      e.target[3].files[0]=""
    
    }

    try {  
      // create user 
      const res=await createUserWithEmailAndPassword(auth,email,password);  
       console.log(res)
      // Create a unique image name  
       
      const date=new Date().getTime();   
      const imageRef= ref(storage,`${displayName + date}`)    
      console.log("1")
       
       await uploadBytesResumable(imageRef,photoUrl).then(()=>{
        getDownloadURL(imageRef).then(async (downloadURl)=>{ 
         try { 
           await updateProfile(res.user,{
            displayName, 
            photoURL:downloadURl
          });  
          console.log("2")
            // create user in firestore 
             await setDoc(doc(db,"users",res.user.uid),{ 
              uid:res.user.uid, 
              displayName,  
              email,
              photoUrl:downloadURl

             })   
             console.log("3") 
             console.log(res.user.displayName) 
             console.log(res.user)
           
              
            //  create empty userchats on firestore 
            await setDoc(doc(db,"usersChat",res.user.uid),{}) 
            alert("completed")
          
          
         } catch (error) {
          alert(error)
         }   
        

        })
      })     
      resetformfeild()
        
    
    
    } catch (error) { 
      alert(error)
    } 
   
  }; 
 
  return (
    <>
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Display name"
              name="displayName"
              required
            />
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              required
            />
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              required
            />
            <input type="file" name="profileImage"  />
            <button>Sign up</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
