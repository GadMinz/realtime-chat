import React from "react";
import s from "./SideBar.module.scss";
import logoutImg from "../../assets/icons/logout.svg";
import { auth, storage } from "../../firebase";
import { signOut, updateProfile } from "firebase/auth";
import avatar from "../../assets/img/avatar.jpg";
import { User } from "../../redux/types";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

interface NavBarProps {
  currentUser: User;
}

const NavBar: React.FC<NavBarProps> = ({ currentUser }) => {
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
        updateProfile(user, {
          photoURL: downloadURL,
        })
          .then(() => {
            console.log("аватар успешно обновлен");
          })
          .catch((error) => {
            console.log(error);
          });
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
            id="file"
            accept=".png,.jpg,.gif,.jpeg,.bmp"
            onChange={handleChange}
          />
          <label htmlFor="file">
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
