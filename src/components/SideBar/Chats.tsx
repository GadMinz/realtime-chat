// @ts-nocheck
import { doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { db } from "../../firebase";
import s from "./SideBar.module.scss";
import { User } from "../../redux/types";
import avatar from '../../assets/img/avatar.jpg'

interface ChatsProps {
  currentUser: User;
}

const Chats: React.FC<ChatsProps> = ({ currentUser }) => {
  const [chats, setChats] = React.useState([]);
  React.useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);
  return (
    <div>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div className={s.userChat} key={chat[0]}>
            <img src={chat[1].userInfo.photoURL ? chat[1].userInfo.photoURL : avatar} alt="avatar" />
            <div className={s.userChatInfo}>
              <span>{chat[1].userInfo.nickname}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
