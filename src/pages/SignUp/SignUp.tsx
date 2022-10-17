import React from "react";

interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">GadMinz Chat</span>
        <span className="title">Регистрация</span>
        <form action="">
          <input type="text" placeholder="Никнейм" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Пароль" />
          <input type="file" />
          <button>Зарегистрироваться</button>
        </form>
        <p>У вас уже есть аккаунт? Вход</p>
      </div>
    </div>
  );
};

export default SignUp;
