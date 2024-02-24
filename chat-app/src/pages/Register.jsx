import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref } from "firebase/storage";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let displayName = e.target[0].value.trim();
    let email = e.target[1].value;
    let password = e.target[2].value;
    let photoUrl = e.target[3].files[0];

    const resetformfeild = (event) => {
      event.target[0].value = "";
      event.target[1].value = "";
      event.target[2].value = "";
      event.target[3].value = null;
    };

    try {
      // create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // Create a unique image name

      const date = new Date().getTime();
      const imageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(imageRef, photoUrl).then(() => {
        getDownloadURL(imageRef).then(async (downloadURl) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURl,
            });
            console.log("2");
            // create user in firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoUrl: downloadURl,
            });

            //  create empty userchats on firestore
            await setDoc(doc(db, "usersChat", res.user.uid), {});
            alert("Signup Completed");
            resetformfeild(e);

            navigate("/");
          } catch (error) {
            alert(error);
            setLoading(false);
          }
        });
      });
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
       <div className="flex items-center justify-center w-full h-[100vh]"><Loader /></div> 
      ) : (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8"><h1 className="text-2xl text-center sm:text-2xl lg:text-4xl px-2 cursor-pointer">
            Chit - Chat App
          </h1>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-xl text-center ">
                Create account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    typeof="text"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    id="name"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                    required
                  />
                </div>
                <div>
                  <label
                    typeof="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                    required
                  />
                </div>
                <div>
                  <label
                    typeof="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                    required
                  />
                </div>
                <div>
                  <label
                    typeof="file"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Profile pic
                  </label>
                  <input
                    type="file"
                    name="file"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm  leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 font-bold"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-700 text-center">
                  Already have an account?{" "}
                  <Link
                    to={"/"}
                    className="font-bold text-primary-600 hover:underline text-cyan-700"
                  >
                    SignIn here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
