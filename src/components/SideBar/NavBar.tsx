import React from "react";
import s from "./SideBar.module.scss";
import logoutImg from "../../assets/icons/logout.svg";
import { auth, db, storage } from "../../firebase";
import { signOut, updateProfile } from "firebase/auth";
import avatar from "../../assets/img/avatar.jpg";
import { User } from "../../redux/types";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { useAppDispatch } from "../../hook";
import { setUser } from "../../redux/slices/authSlice";

interface NavBarProps {
  currentUser: User;
}

const NavBar: React.FC<NavBarProps> = ({ currentUser }) => {
  const dispatch = useAppDispatch();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const user = auth.currentUser;
    if (!user || !e.target.files) {
      return null;
    }

    const date = new Date().getTime();
    const storageRef = ref(
      storage,
      `${user.displayName ? user.displayName + date : user.uid + date}`
    );
    const file = e.target.files[0];
    await uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        try {
          await updateProfile(user, {
            photoURL: downloadURL,
          });
          await updateDoc(doc(db, "users", user.uid), {
            photoURL: downloadURL,
          });
          dispatch(
            setUser({
              uid: user.uid,
              email: user.email,
              nickname: user.displayName,
              photoURL: user.photoURL,
            })
          );
          console.log("аватар успешно обновлен");
        } catch (err) {
          console.log(err);
        }
      });
    });
  };
  return (
    <div className={s.navbar}>
      <div className={s.user}>
        <div className={s.user_avatar}>
          <input
            type="file"
            style={{ display: "none" }}
            id="avatar"
            accept=".png,.jpg,.gif,.jpeg,.bmp"
            onChange={handleChange}
          />
          <label htmlFor="avatar">
            <img
              src={currentUser.photoURL ? currentUser.photoURL : avatar}
              alt="avatar"
            />
          </label>
        </div>
        <span>{currentUser.nickname}</span>
      </div>
      <button onClick={() => signOut(auth)}>
        <img src={logoutImg} alt="logout" />
      </button>
    </div>
  );
};

export default NavBar;
