// @ts-nocheck
import React from "react";
import s from "./Messages.module.scss";
import attach from "../../../assets/icons/attachment.svg";
import send from "../../../assets/icons/send.svg";
import { useAppSelector } from "../../../hook";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { v4 as uuid } from "uuid";

interface InputProps {}

const Input: React.FC<InputProps> = () => {
  const [text, setText] = React.useState("");
  const [img, setImg] = React.useState<File | null>(null);
  const { currentUser } = useAppSelector((state) => state.auth);
  const { chatId, user } = useAppSelector((state) => state.chat);
  if (!currentUser) return null;

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {

        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [chatId + ".lastMessage"]: {
        text,
      },
      [chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", user.uid), {
      [chatId + ".lastMessage"]: {
        text,
      },
      [chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImg(e.target.files ? e.target.files[0] : null);
  };
  return (
    <div className={s.input}>
      <input
        type="text"
        placeholder="Написать сообщение..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className={s.send}>
        <img src="" alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={handleChange}
        />
        <label htmlFor="file">
          <img src={attach} alt="attachment" />
        </label>
        <button onClick={handleSend}>
          <img src={send} alt="send" />
        </button>
      </div>
    </div>
  );
};

export default Input;
