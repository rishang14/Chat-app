import { auth  } from "../firebase"; 
import {signInWithEmailAndPassword} from "firebase/auth"; 
import { useState } from "react";
import { useNavigate ,Link} from "react-router-dom"; 
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
      loading ?< div className="w-full  h-[100vh] flex justify-center items-center "><Loader/></div>  :   <div className="flex items-center  w-full  justify-center absolute top-[20%] ">
      <div className="mt-10 sm:mx-auto sm:w-full  w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Chit-Chat App
          </h2>
          <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
            Login in to your account
          </h2>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                typeof="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  typeof="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
              />{" "}
                
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>
        </div>   
        <div className="flex justify-center flex-col">
        <span className="text-center"> *Create 2ac search 2nd ac then msg or *</span> 
        <span className="text-center">Rishang</span> 
        <span className="text-center">Harry</span>
        <span className="text-center">Paras</span>

        </div>

        <p className="text-center">Dont Have an Account ?  <Link to={"/signUp"}> <span className="text-[20px] underline"> Click Here</span>  </Link></p>
      </div>
    </div>
    }
    </>
  );
};

export default Login;
