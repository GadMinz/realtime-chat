import React from "react";
import s from "./SideBar.module.scss";
import logoutImg from '../../assets/icons/logout.svg'

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
    return (
    <div className={s.navbar}>
      <div className={s.logo}>GadMinz Chat</div>
      <div className={s.user}>
        <img src="https://pixelbox.ru/wp-content/uploads/2021/05/ava-vk-animal-91.jpg" alt="avatar" />
        <span>GadMinz</span>
        <button>
          <img src={logoutImg} alt="logout"/>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
