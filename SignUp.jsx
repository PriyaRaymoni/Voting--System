import React, { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseAuth, FirestoreDB, FirebaseStorage } from "../Auth/env";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [orgName, setOrgName] = useState("");

  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleSignUp = async () => {
    event.preventDefault();
    if (
      email === "" ||
      password === "" ||
      firstName === "" ||
      lastName === "" ||
      universityId === "" ||
      orgName === ""
    ) {
      alert("Please fill all the fields");
    }
    const data = {
      Email: email,
      Password: password,
      FirstName: firstName,
      LastName: lastName,
      UniversityId: universityId,
      OrganisationName: orgName,
      uid: "",
      ParticipatedPolls: [],
      CreatedPolls: [],
    };
    // console.log(data);
    await createUserWithEmailAndPassword(FirebaseAuth, email, password)
      .then((userCredential) => {
        data.uid = userCredential.user.uid;
        setDoc(doc(FirestoreDB, "users", userCredential.user.uid), data).then(
          Navigate("/Login")
        );
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        alert("Error creating user: " + error.message);
      });
    // localStorage.setItem("user", JSON.stringify(data));
  };

  return (
    <div className="container">
      <div className="left">
        <div className="info">
          <h1>Welcome to</h1>
          <h1>Our Website</h1>
          <p>Enter your personal details and start journey with us</p>
          {/* <Link to="/Login">Login</Link> */}
          <NavLink to="/Login">Login</NavLink>
        </div>
      </div>
      <div className="right">
        <div className="register">
          <h1>Register</h1>
          <form>
            {/* select image */}
            <input
              type="file"
              accept="image/*" // Accept only image files
              onChange={(e) => setProfilePhoto(e.target.files[0])} // Update profilePhoto whenever the user selects a new file
            />
            <p>Organisation Name</p>
            <input
              type="text"
              placeholder="Organisation Name"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
            />
            <p>University Mail Id</p>
            <input
              type="text"
              placeholder="University Mail"
              value={email} // Set the current value to Mail
              onChange={(e) => setEmail(e.target.value)} // Update Mail whenever the user changes the input
            />
            <p>Personal Details</p>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="text"
              placeholder="University Id Number"
              value={universityId}
              onChange={(e) => setUniversityId(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <Link to="/SignUp">register</Link> */}
            {/* <NavLink to="/Login">Register</NavLink> */}
            <button onClick={handleSignUp}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
