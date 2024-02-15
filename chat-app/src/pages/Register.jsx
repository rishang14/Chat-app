import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; 
import { auth,storage,db } from "../firebase"; 
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; 
import { doc, setDoc } from "firebase/firestore"; 

const Register = () => {    
 
  

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