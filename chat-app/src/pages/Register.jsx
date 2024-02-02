import { useState } from "react"
import { createAuthUserWithEmailAndPassword,createUserDocWithAuth ,UploadprofileImage} from "../firebase"
const defaultFormFeild={
  displayName:'', 
  email:'' ,
  password:'', 
  profileImage:null
}
const Register = () => {   
  const [formFeild,setFormField]=useState(defaultFormFeild) 
  const {displayName,email,password,profileImage} =formFeild  
   
  const resetFormFeild=()=> {
    setFormField({...defaultFormFeild})
  }
   
  const handleChange=(e)=>{
    const {name,value,type} =e.target 
    if (type === 'file') {
      setFormField({ ...formFeild, [name]: e.target.files[0] || null });
    } else {
      setFormField({ ...formFeild, [name]: value });
    }

  }
  
 const handlesubmit= async(e)=>{ 
  e.preventDefault() 
   
  try{
    const {user}=await createAuthUserWithEmailAndPassword(email,password)  
    console.log(user)  
    if (user){

      if(profileImage){
        const ProfileImageUrl=await UploadprofileImage(user.uid,profileImage); 
        await createUserDocWithAuth(user,{displayName,photoURL:ProfileImageUrl})
      }else{
  
        await createUserDocWithAuth(user,{displayName})  
      }
      resetFormFeild()
    }
     
  } catch(error){ 
    if (error.code === "auth/email-already-in-use") {
      alert("Cannot create user,email alreadyin use");
    } else {
      alert("error while creating the user", error);
    } 
    resetFormFeild()
  }

  }

 

  return (
    <>
     <div >
      <div>
        <form  onSubmit={handlesubmit}> 
          <input type="text" placeholder="Display name" name="displayName" value={displayName} onChange={handleChange}/> 
          <input type="email"  placeholder="Enter email" name="email" value={email} onChange={handleChange}/> 
          <input type="password" placeholder="Enter password"name="password" value={password} onChange={handleChange}/>
          <input type="file"  name="profileImage" onChange={handleChange}/> 
          <button>Sign up </button>
        </form>
      </div>
     </div>
    </>
  )
}

export default Register