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
        <Loader />
      ) : (
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
              <input type="file" name="profileImage" />
              <button>Sign up</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
