import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

type FormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [err, setErr] = React.useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onTouched" });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { email, password } = data;
    setErr("");
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        err.code === "auth/user-not-found" || err.code === "auth/wrong-password"
          ? setErr("Неверный логин или пароль")
          : setErr("Что то пошло не так");
      });
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">GadMinz Chat</span>
        <span className="title">Вход</span>
        {err && <div className="error">{err}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className={errors?.email && "error_input"}
            {...register("email", {
              required: "Введите email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Некорректный email",
              },
            })}
            type="email"
            placeholder="Email"
          />
          {errors?.email && (
            <div className="error">{errors?.email?.message}</div>
          )}
          <input
            className={errors?.password && "error_input"}
            {...register("password", {
              required: "Введите пароль",
            })}
            type="password"
            placeholder="Пароль"
          />
          {errors?.password && (
            <div className="error">{errors?.password?.message}</div>
          )}
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
