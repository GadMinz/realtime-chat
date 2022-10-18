import React from "react";
import s from "./Messages.module.scss";
import Message from "./Message";

interface MessagesProps {}

const Messages: React.FC<MessagesProps> = () => {
  return (
    <div className={s.messages}>
      <Message />
    </div>
  );
};

export default Messages;
