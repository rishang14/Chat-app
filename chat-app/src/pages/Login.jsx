import { auth  } from "../firebase"; 
import {signInWithEmailAndPassword} from "firebase/auth"; 
import { useNavigate } from "react-router-dom";
const Login = () => { 
  const navigate=useNavigate()
  const handleSubmit = async (e) => { 
    e.preventDefault()
    let email=e.target[0].value; 
    let password=e.target[1].value  
     
    const res=await signInWithEmailAndPassword(auth,email,password)  
    navigate("/home") 

    console.log(res)
     
    
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Enter Email" required />
      <input type="password" placeholder="Enter Password" required />
      <button>Sign In</button>
    </form>
  );
};

export default Login;
