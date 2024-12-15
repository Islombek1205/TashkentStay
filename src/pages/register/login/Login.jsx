import './Login.css'
import React, { useState } from "react";
import "../../../firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ changeActiveHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => alert("Tizimga muvaffaqiyatli kirdingiz!"))
      .catch((e) => alert(`Xato: ${e.message}`));
  };

  return (
    <div className='loginForm'>
      <h1>Login</h1>
      <form onSubmit={loginHandler}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
      <p>
        Yangi foydalanuvchimisiz?{" "}
        <span
          onClick={() => changeActiveHandler("signup")}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Ro'yxatdan o'ting
        </span>
      </p>
    </div>
  );
};

export default Login;
