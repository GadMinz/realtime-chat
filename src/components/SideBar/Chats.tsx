import React from "react";
import s from "./SideBar.module.scss";

interface ChatsProps {}

const Chats: React.FC<ChatsProps> = () => {
  return (
    <div>
      <div className={s.userChat}>
        <img
          src="https://pixelbox.ru/wp-content/uploads/2021/05/ava-vk-animal-91.jpg"
          alt="avatar"
        />
        <div className={s.userChatInfo}>
          <span>GadMinz</span>
            <p>Hello</p>
        </div>
      </div>
    </div>
  );
};

export default Chats;
