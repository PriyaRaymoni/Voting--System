import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth, FirestoreDB } from "../Auth/env";
import { getDoc, doc } from "firebase/firestore";
import "./auth.css";

function Login() {
  const navigate = useNavigate();

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    event.preventDefault();
    if (mail === "" || password === "") {
      alert("Please fill all the fields");
    }
    await signInWithEmailAndPassword(FirebaseAuth, mail, password)
      .then((userCred) => {
        if (userCred) {
          getDoc(doc(FirestoreDB, "users", userCred?.user.uid)).then(
            (docSnap) => {
              if (docSnap.exists()) {
                localStorage.setItem("user", JSON.stringify(docSnap.data()));
                navigate("/Home");
              }
            }
          );
        }
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        alert("Error signing in: " + error.message);
      });
  };

  return (
    <div className="container">
      <div className="left">
        <div className="info">
          <h1>Welcome to</h1>
          <h1>Our Website</h1>
          <p>Enter your personal details and start journey with us</p>
          {/* <Link to="/SignUp">SignUp</Link> */}
          <NavLink to="/SignUp">SignUp</NavLink>
        </div>
      </div>
      <div className="right">
        <div className="login">
          <h1>Log in</h1>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={mail}
              onChange={(e) => setMail(e.target.value)} // Update mail whenever the user changes the input
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password whenever the user changes the input
            />

            {/* <Link to="/Home">Login</Link> */}
            {/* <NavLink to="/Home">Login</NavLink> */}
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
