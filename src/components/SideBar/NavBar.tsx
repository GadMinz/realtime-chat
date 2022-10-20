import React from "react";
import s from "./SideBar.module.scss";
import logoutImg from "../../assets/icons/logout.svg";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  return (
    <div className={s.navbar}>
      <div className={s.user}>
        <img
          src="https://pixelbox.ru/wp-content/uploads/2021/05/ava-vk-animal-91.jpg"
          alt="avatar"
        />
        <span>GadMinz</span>
      </div>
      <button onClick={() => signOut(auth)}>
        <img src={logoutImg} alt="logout" />
      </button>
    </div>
  );
};

export default NavBar;
