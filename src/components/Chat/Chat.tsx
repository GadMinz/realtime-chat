import React from "react";
import s from "./Chat.module.scss";
import Messages from "./Messages/Messages";
import Input from "./Messages/Input";

interface ChatProps {
  user: string;
}

const Chat: React.FC<ChatProps> = ({ user }) => {
  return (
    <div className={s.chat}>
      <div className={s.chat_info}>
        <span>{user}</span>
        <div className={s.chat_icons}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            onClick={() => alert("Не трогай это")}
          >
            <path
              fill="#FF9900"
              fillRule="evenodd"
              d="M4,5 L20,5 C20.5522847,5 21,5.44771525 21,6 C21,6.55228475 20.5522847,7 20,7 L4,7 C3.44771525,7 3,6.55228475 3,6 C3,5.44771525 3.44771525,5 4,5 Z M4,17 L20,17 C20.5522847,17 21,17.4477153 21,18 C21,18.5522847 20.5522847,19 20,19 L4,19 C3.44771525,19 3,18.5522847 3,18 C3,17.4477153 3.44771525,17 4,17 Z M4,11 L20,11 C20.5522847,11 21,11.4477153 21,12 C21,12.5522847 20.5522847,13 20,13 L4,13 C3.44771525,13 3,12.5522847 3,12 C3,11.4477153 3.44771525,11 4,11 Z"
            />
          </svg>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
