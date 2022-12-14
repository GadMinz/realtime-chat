import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/img/logo.png'

interface SignUpProps {}

type FormValues = {
  nickname: string;
  email: string;
  password: string;
};

const SignUp: React.FC<SignUpProps> = () => {
  const [err, setErr] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onTouched" });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { nickname, email, password } = data;

    try {
      setLoading(true);
      setErr(false);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      try {
        await updateProfile(res.user, {
          displayName: nickname,
        });
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          nickname,
          email,
          photoURL: res.user.photoURL,
        });

        await setDoc(doc(db, "userChats", res.user.uid), {});

        navigate("/");
      } catch (err) {
        setErr(true);
        setLoading(false);
      }
    } catch (error) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        {err && <div className="error">Что-то пошло не так</div>}
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
          <button disabled={loading}>Зарегистрироваться</button>
        </form>
        <p>
          У вас уже есть аккаунт? <Link to="/login">Вход</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
