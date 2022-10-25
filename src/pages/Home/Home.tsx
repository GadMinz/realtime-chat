import React from "react";
import s from "./Home.module.scss";
import SideBar from "../../components/SideBar/SideBar";
import Chat from "../../components/Chat/Chat";
import { useAppSelector } from "../../hook";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { user } = useAppSelector((state) => state.chat);
  return (
    <div className={s.home}>
      <div className={s.container}>
        <SideBar />
        {user &&
        Object.keys(user).length === 0 &&
        Object.getPrototypeOf(user) === Object.prototype ? (
          <div className={s.nochats}>
            <span>Выберите, кому хотели бы написать</span>
          </div>
        ) : (
          <Chat user={user.nickname ? user.nickname : ""} />
        )}
      </div>
    </div>
  );
};

export default Home;
