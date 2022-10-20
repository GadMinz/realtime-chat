import React from "react";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./pages/Login/Login";
import { auth } from "./firebase";
import { useAppDispatch, useAppSelector } from "./hook";
import { setUser } from "./redux/slices/authSlice";
import Loading from "./components/Loading";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      const currentUser = !user
        ? null
        : {
            uid: user.uid,
            email: user.email,
            nickname: user.displayName,
            photoURL: user.photoURL,
          };
      dispatch(setUser(currentUser));
      setLoading(false);
    });

    return () => {
      unsub();
    };
  }, []);
  console.log(loading);
  if (loading) {
    return <Loading />;
  }
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={currentUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
};

export default App;
