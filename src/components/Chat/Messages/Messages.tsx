import React from "react";
import s from "./Messages.module.scss";
import Message from "./Message";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { useAppSelector } from "../../../hook";

interface MessagesProps {}

export type TMessage = {
  date: Date;
  id: string;
  text: string;
  senderId: string;
  img?: string;
};
const Messages: React.FC<MessagesProps> = () => {
  const [messages, setMessages] = React.useState<TMessage[]>([]);
  const { chatId } = useAppSelector((state) => state.chat);

  React.useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [chatId]);
  console.log(messages);
  return (
    <div className={s.messages}>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default Messages;
