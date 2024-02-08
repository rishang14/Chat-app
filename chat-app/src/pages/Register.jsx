import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; 
import { auth,storage,db } from "../firebase"; 
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; 
import { doc, setDoc } from "firebase/firestore"; 

const Register = () => {    
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
          
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

          
          } catch (err) {
            console.log(err);
           
          }
        });
      });
    } catch (err) {
   
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
            <input type="file" name="profileImage"  required />
            <button>Sign up</button>
          </form>
        </div>
      </div>
    </>
  );
};
 
export default Register;