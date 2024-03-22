import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { FirebaseAuth } from "../Auth/env";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(FirebaseAuth)
      .then(() => {
        localStorage.removeItem("user");
        navigate("/Login");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  return (
    <div className="nav">
      <div className="logo">
        <a className="logo" href="#">
          Votu
        </a>
      </div>
      <div className="links">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
        <button className="SignOutBtn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
