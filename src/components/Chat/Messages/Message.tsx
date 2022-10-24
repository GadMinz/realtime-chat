import React from "react";
import s from "./Messages.module.scss";
import { TMessage } from "./Messages";
import { useAppSelector } from "../../../hook";
import avatar from "../../../assets/img/avatar.jpg";

interface MessageProps {
  message: TMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.chat);
  if (!currentUser) return null;

  return (
    <div
      className={`${s.message} ${
        message.senderId === currentUser.uid && "owner"
      }`}
    >
      <div className={s.message_info}>
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
                ? currentUser.photoURL
                : avatar
              : user.photoURL
              ? user.photoURL
              : avatar
          }
          alt="avatar"
        />
        <span>Сейчас</span>
      </div>
      <div className={s.message_content}>
        <p>{message.text}</p>
          {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
