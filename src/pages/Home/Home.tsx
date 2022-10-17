import React from "react";
import s from "./Home.module.scss";
import SideBar from "../../components/SideBar/SideBar";
import Chat from "../../components/Chat/Chat";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <div className={s.home}>
      <div className={s.container}>
        <SideBar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
