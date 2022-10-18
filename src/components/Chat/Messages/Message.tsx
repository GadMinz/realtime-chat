import React from 'react';
import s from './Messages.module.scss'

interface MessageProps {

}


const Message: React.FC<MessageProps> = () => {
    return (
        <div className={`${s.message}`}>
            <div className={s.message_info}>
                <img src="https://d31sxl6qgne2yj.cloudfront.net/wordpress/wp-content/uploads/20190121140651/Minecraft-Ghast.jpg" alt="avatar"/>
                <span>Сейчас</span>

            </div>
            <div className={s.message_content}>
                <p>Привет!</p>
                <img src="https://d31sxl6qgne2yj.cloudfront.net/wordpress/wp-content/uploads/20190121140651/Minecraft-Ghast.jpg" alt=""/>
            </div>
        </div>
    );
};

export default Message;
