import React from "react";
import s from "./SideBar.module.scss";
import logoutImg from "../../assets/icons/logout.svg";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import avatar from "../../assets/img/avatar.jpg";
import {User} from "../../redux/types";

interface NavBarProps {
    currentUser: User
}

const NavBar: React.FC<NavBarProps> = ({currentUser}) => {
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
