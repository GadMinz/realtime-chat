// @ts-nocheck
import React from "react";
import s from "./SideBar.module.scss";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { User } from "../../redux/types";
import avatar from "../../assets/img/avatar.jpg";

interface SearchProps {
  currentUser: User;
}

const Search: React.FC<SearchProps> = ({ currentUser }) => {
  const [userName, setUserName] = React.useState("");
  const [user, setUser] = React.useState<User | null>(null);
  const [err, setErr] = React.useState(false);

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("nickname", "==", userName));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      handleSearch();
    }
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            nickname: user.nickname,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            nickname: currentUser.nickname,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUserName("");
  };

  return (
    <div className={s.search}>
      <div className={s.searchForm}>
        <input
          type="text"
          placeholder="?????????? ????????????????????????"
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      {err && <span>???????????????????????? ???? ????????????</span>}
      {user && (
        <div className={s.userChat} onClick={handleSelect}>
          <img src={user.photoURL ? user.photoURL : avatar} alt="" />
          <div className={s.userChatInfo}>
            <span>{user.nickname}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
