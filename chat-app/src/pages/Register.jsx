
const Register = () => {
  return (
<div className="bg-gray-200 ">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
     
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
          <div 
        className="p-6 space-y-4 md:space-y-6 sm:p-8"> 
        <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl text-center">Chitchat</h1>
              <h1 
            className="text-s  leading-tight tracking-tight text-black  text-center">
                  Sign up 
              </h1>
              <form 
            className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="name" 
                    className="block mb-2 text-sm font-medium text-black ">Display name</label>
                      <input type="name" className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5   " placeholder="Enter your Name" required=""/>
                  </div>
                  <div>
                      <label for="email" 
                    className="block mb-2 text-sm font-medium text-black">Email</label>
                      <input type="email" placeholder="email" 
                    className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 " required=""/>
                  </div>
                  <div>
                      <label for="password" 
                    className="block mb-2 text-sm font-medium text-black">Password</label>
                      <input type="password" placeholder="password" 
                    className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 " required=""/>
                  </div>
                  <button type="submit" 
                className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 ">Sign Up</button>
                  <p 
                className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <a href="#" 
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</div>
  )
}

export default Register