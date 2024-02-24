import React, { useState } from "react";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { useAuthAndChatContext } from "../Context/Context";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase"; 
import {v4 as uuid } from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


 
const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const { currentUser, data } = useAuthAndChatContext();

  const handleSend = async () => {
    try {
      setLoading(true); // Set loading to true when starting the send operation

      if (text || img) {
        const messageData = {
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        };

        if (img) {
          const imageRef = ref(storage, uuid());

          await uploadBytesResumable(imageRef, img);
          const downloadURL = await getDownloadURL(imageRef);

          messageData.img = downloadURL;
        }

        if (text && img) {
          await updateDoc(doc(db, "chats", data.chatID), {
            messages: arrayUnion(messageData),
          });
        } else {
          await updateDoc(doc(db, "chats", data.chatID), {
            messages: arrayUnion(messageData),
          });
        }

        const lastMessageData = {
          [data.chatID + ".lastMessage"]: {
            text,
          },
          [data.chatID + ".date"]: serverTimestamp(),
        };

        await updateDoc(doc(db, "usersChat", currentUser.uid), lastMessageData);
        await updateDoc(doc(db, "usersChat", data.user.uid), lastMessageData);

        setImg(null);
        setText("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle error as needed
    } finally {
      setLoading(false); // Set loading to false when the operation is complete
    }
  };

  return (
    <>
      <div className="h-[70px] p-[10px] flex items-center justify-between">
        <input type="text" className="w-[100%] border-none outline-none text-[18px] " value={text} placeholder=" Type Something " onChange={(e) => setText(e.target.value)} />
        <div className=" flex items-center gap-[10px]">
          <input type="file" style={{ display: "none" }} id="file" onChange={(e) => setImg(e.target.files[0])} />
          <label htmlFor="file">
            <HiOutlineDocumentAdd size={25} className=" cursor-pointer" />
          </label>
          <button onClick={handleSend} className="py-[10px] px-[15px] bg-cyan-300">
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Input;
