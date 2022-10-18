import React from "react";
import s from "./Messages.module.scss";
import attach from '../../../assets/icons/attachment.svg'
import send from '../../../assets/icons/send.svg'

interface InputProps {}

const Input: React.FC<InputProps> = () => {
  return (
    <div className={s.input}>
      <input type="text" placeholder="Написать сообщение..." />
      <div className={s.send}>
        <img src="" alt="" />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <img src={attach} alt="attachment" />
        </label>
        <button>
            <img src={send} alt="send"/>
        </button>
      </div>
    </div>
  );
};

export default Input;
