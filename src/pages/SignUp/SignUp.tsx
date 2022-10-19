import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface SignUpProps {}

type FormValues = {
  nickname: string;
  email: string;
  password: string;
};

const SignUp: React.FC<SignUpProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onTouched" });

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">GadMinz Chat</span>
        <span className="title">Регистрация</span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className={errors?.nickname && "error_input"}
            {...register("nickname", {
              required: "Введите никнейм",
              minLength: {
                value: 3,
                message: "Никнейм должен содежрать более 3 символов",
              },
            })}
            type="text"
            placeholder="Никнейм"
          />
          {errors?.nickname && (
            <div className="error">{errors?.nickname?.message}</div>
          )}
          <input
            className={errors?.email && "error_input"}
            {...register("email", { required: "Введите email" })}
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
              minLength: {
                value: 6,
                message: "Минимальная длина пароля 6 символов",
              },
            })}
            type="password"
            placeholder="Пароль"
          />
          {errors?.password && (
            <div className="error">{errors?.password?.message}</div>
          )}
          <button>Зарегистрироваться</button>
        </form>
        <p>У вас уже есть аккаунт? Вход</p>
      </div>
    </div>
  );
};

export default SignUp;
