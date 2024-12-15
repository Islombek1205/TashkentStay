import './SignUp.css'
import React, { useState } from "react";
import "../../../firebase/config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = ({ changeActiveHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupHandler = async (e) => {
    e.preventDefault(); 

    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert("User is successfully registered: " + userCredential.user.email);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className='signUpForm'>
      <h1>Sign Up</h1>
      <form onSubmit={signupHandler}>
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

        <button type="submit">Sign Up</button>
      </form>
      <p>
        Allaqachon ro'yxatdan o'tganmisiz?{" "}
        <span
          onClick={() => changeActiveHandler("login")}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Tizimga kiring
        </span>
      </p>
    </div>
  );
};

export default SignUp;
