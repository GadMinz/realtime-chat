import React from "react";
import { Link } from "react-router-dom";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">GadMinz Chat</span>
        <span className="title">Вход</span>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Пароль" />
          <button>Войти</button>
        </form>
        <p>
          У вас еще нет аккаунта? <Link to="/signup">Регистрация</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
