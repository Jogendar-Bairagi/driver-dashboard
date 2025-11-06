import React, {useState} from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import "../index.css";
import { useNavigate } from "react-router-dom";

const DriverLogin = () => {
  const navigate = useNavigate();
const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ErrMsg, setErrMsg] = useState("");

  const SignInAdmin = () => {
  signInWithEmailAndPassword(auth, email, password)
    .then((value) => {
      const user = value.user;
      console.log("Signed in user:", user.email);

      if (user.email === "driver1@gmail.com") {
        navigate("/driver-dashboard-one");
      } else if(user.email === "driver2@gmail.com") {
  navigate("/driver-dashboard-two")} else {
        setErrMsg("You are not authorized as Driver!");
      }
    })
    .catch((err) => {
      console.error("Login failed:", err.code, err.message);
      setErrMsg("Failed to login. Please check your credentials.");
    });
};


  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Driver Login</h2>
        <h4 style={{color: "red"}}>{ErrMsg}</h4>
        <input onChange={(e) => {setEmail(e.target.value)}} value={email} type="text" placeholder="Email" />
        <input onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Password" />
        <button onClick={SignInAdmin}>Login</button>
      </div>
    </div>
  );
};

export default DriverLogin;
