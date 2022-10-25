import React from "react";
import s from "./Messages.module.scss";
import { TMessage } from "./Messages";
import { useAppSelector } from "../../../hook";
import avatar from "../../../assets/img/avatar.jpg";

interface MessageProps {
  message: TMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { currentUser } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.chat);
  React.useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  if (!currentUser) return null;
  const time = new Date(message.date.seconds * 1000);

  return (
    <div
      ref={ref}
      className={`${s.message} ${
        message.senderId === currentUser.uid ? s.owner : ""
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
        <span>{time.toLocaleDateString("ru-RU").slice(0, -5)}</span>
      </div>
      <div className={s.message_content}>
        <div className={s.message_content_wrap}>
          {message.img && <img src={message.img} alt="" />}
          {message.text && <p>{message.text}</p>}
        </div>
      </div>
    </div>
  );
};

export default Message;
