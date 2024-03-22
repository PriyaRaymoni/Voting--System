import React, { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseAuth, FirestoreDB } from "../Auth/env";
import { getDoc, doc } from "firebase/firestore";

const SplashScreen = () => {
  const [User, setUser] = useState();
  const navigate = useNavigate();
  useLayoutEffect(() => {
    checkLoggedIn();
  });

  const checkLoggedIn = async () => {
    FirebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred?.uid) {
        // getDoc(doc(FirestoreDB, "users", userCred?.uid)).then((docSnap) => {
        //   if (docSnap.exists()) {
        //     const userData = docSnap.data();
        //     setUser(userData);
        //     // console.log("Snapshot data:", User);
        //     navigate("/Home");
        //   }
        // });
        navigate("/Home");
      } else {
       navigate("/Login");
      }
    });
  };
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default SplashScreen;
