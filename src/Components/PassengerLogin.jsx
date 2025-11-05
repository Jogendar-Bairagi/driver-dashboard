import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);

const PassengerLogin = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Sign Up new user
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Sign-up successful!");
        console.log("User created:", userCredential.user);
        setIsLogin(true); // switch back to login mode
      })
      .catch((error) => {
        alert(error.message);
        console.error("Sign-up error:", error);
      });
  };

  // ✅ Login existing user
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Login successful!");
        console.log("Logged in:", userCredential.user);
        navigate("/passenger-dashboard-one"); // redirect to home or dashboard
      })
      .catch((error) => {
        alert(error.message);
        console.error("Login error:", error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isLogin ? "Passenger Login" : "Passenger Sign Up"}</h2>

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
        />

        {!isLogin && <input type="text" placeholder="Full Name" />}

        <button onClick={isLogin ? handleLogin : handleSignUp}>
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p style={{ marginTop: "10px" }}>
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setIsLogin(true)}
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default PassengerLogin;
