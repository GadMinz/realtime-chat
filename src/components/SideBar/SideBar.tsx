import React from "react";
import s from "./SideBar.module.scss";
import NavBar from "./NavBar";
import Search from "./Search";
import Chats from "./Chats";
import {useAppSelector} from "../../hook";
interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = () => {
    const { currentUser } = useAppSelector((state) => state.auth);
    if (!currentUser) return null;

  return (
    <div className={s.sidebar}>
      <NavBar currentUser={currentUser}/>
      <Search currentUser={currentUser}/>
      <Chats currentUser={currentUser}/>
    </div>
  );
};

export default SideBar;
