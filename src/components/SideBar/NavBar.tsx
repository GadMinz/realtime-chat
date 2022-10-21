import React from "react";
import s from "./SideBar.module.scss";
import logoutImg from "../../assets/icons/logout.svg";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useAppSelector } from "../../hook";
import avatar from "../../assets/img/avatar.jpg";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  if (!currentUser) return null;

  return (
    <div className={s.navbar}>
      <div className={s.user}>
        <img
          src={currentUser.photoURL ? currentUser.photoURL : avatar}
          alt="avatar"
        />
        <span>{currentUser.nickname}</span>
      </div>
      <button onClick={() => signOut(auth)}>
        <img src={logoutImg} alt="logout" />
      </button>
    </div>
  );
};

export default NavBar;
