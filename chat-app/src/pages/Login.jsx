import { auth  } from "../firebase"; 
import {signInWithEmailAndPassword} from "firebase/auth"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Loader from "../components/Loader";

const Login = () => {  
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
  const handleSubmit = async (e) => {  
    e.preventDefault()
    setLoading(true)
    let email=e.target[0].value; 
    let password=e.target[1].value   
     
     try {
      await signInWithEmailAndPassword(auth,email,password)  
      navigate("/home") 
     } catch (error) { 
      alert(error) 
      setLoading(false)
      
     }
   

     
    
  };
  return (
    <>
    {
      loading ? <Loader/> : <div>
        <form onSubmit={handleSubmit}>
    <input type="email" placeholder="Enter Email" required />
    <input type="password" placeholder="Enter Password" required />
    <button>Sign In</button>
  </form>
      </div>
    }
    </>
  );
};

export default Login;
