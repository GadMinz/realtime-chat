import React from "react";
import s from "./SideBar.module.scss";
import NavBar from "./NavBar";
import Search from "./Search";
import Chats from "./Chats";
interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = () => {
  return (
    <div className={s.sidebar}>
      <NavBar />
      <Search />
      <Chats />
    </div>
  );
};

export default SideBar;
