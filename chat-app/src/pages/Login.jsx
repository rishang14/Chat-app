 import { signInAuthWithEmailAndPassword } from "../firebase"
 import { useState } from "react"
 const defaultFormFeild={
    email:'', 
    password:""
 }

const Login=()=>{ 
    const [formFeild,setFormField]=useState(defaultFormFeild);  
    const {email,password} =formFeild
     
    const handleChange=(e)=>{ 
        const {name,value}=e.target 
        setFormField({...formFeild,[name]:value})

    }   
    const resetFormFeild=()=>{
        setFormField(defaultFormFeild)
    }
 
    const handleSubmit=async(e)=>{ 
        e.preventDefault(); 
         
        try{
            const response=await signInAuthWithEmailAndPassword(email,password);  
            resetFormFeild(); 
            alert("login successful",response)

        }catch(error){  
            if(error.code==="auth/invalid-credential") alert("Either email or password is wrong")


        }

    }

    return(
        <>
         <div>
            <div>
                <form  onSubmit={handleSubmit}> 
                 <input type="email" placeholder="Enter Your Email"  required name="email" value={email}  onChange={handleChange}/>
                 <input type="password" placeholder="Enter Your password" name="password"  value={password} onChange={handleChange} required/> 
                 <button>Sign in</button> 
                 <p>New user sign up </p>
                </form>
            </div>
         </div>
        </>
    )
} 
export default Login;