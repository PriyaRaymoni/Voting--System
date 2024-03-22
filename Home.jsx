import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "./home.css";
import PollCard from "./../Components/PollCard";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { FirebaseAuth, FirestoreDB } from "../Auth/env";

function Home() {
  const [modal, setModal] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []); // Don't forget to add the dependency array

  const handleModal = () => {
    setModal(!modal);
    console.log(modal);
  };

  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [expDate, setExpDate] = useState("");
  const handlePollCreation = async () => {
    const data = {
      Heading: heading,
      Description: description,
      ExpDate: expDate,
      CreatedBy: userData.UniversityId,
      CreatedAt: new Date(),
      OrganisationName: userData.OrganisationName,
    };
    const docRef = doc(FirestoreDB, "Polls", data.CreatedAt.toString());
    await setDoc(docRef, data);
    // updatedoc
    await updateDoc(doc(FirestoreDB, "users", FirebaseAuth.currentUser.uid), {
      CreatedPolls: [...userData.CreatedPolls, data.CreatedAt.toString()],
      localStorage: JSON.stringify({
        ...userData,
        CreatedPolls: [...userData.CreatedPolls, data.CreatedAt.toString()],
      })
    });

  };
  return (
    <div className="home">
      <Navbar />
      <div className="top">
        {/* profile card */}
        <div className="aside">
          <div className="profile-card">
            <div className="profile-img">
              <img
                className="profile-img"
                src="https://avatars.githubusercontent.com/u/77468756?v=4"
                alt="profile"
              />
            </div>
            <div className="profile-content">
              <p className="profile-name">
                {userData?.FirstName} {userData?.LastName}
              </p>
              <p className="profile-number">{userData.UniversityId}</p>
              <p className="summary">
                Polls Created:{" "}
                {
                  // count of polls created by the user array
                  userData?.CreatedPolls?.length
                }
              </p>
              <p className="summary">
                Polls Participated: {userData?.ParticipatedPolls?.length}
              </p>
            </div>
          </div>
          <div className="create-poll">
            <p>Create a new Poll</p>
            <button className="create-poll-btn" onClick={handleModal}>
              Create Poll
            </button>
          </div>
        </div>
        <div className="dashboard">
          <div className="dashLeft">
            <p className="dash-heading">Active Polls</p>
            <div className="area">
              <PollCard />
              <PollCard />
              <PollCard />
              <PollCard />
              <PollCard />
            </div>
          </div>
          <div className="dashRight">
            <p className="dash-heading">Participated Polls</p>
          </div>
        </div>
      </div>
      {modal && (
        <div className="modal">
          <div className="modal-card">
            <div className="modal-head">
              <p>Create a Poll</p>
              <button className="close-modal" onClick={handleModal}>
                X
              </button>
            </div>
            <div className="modal-body">
              <p>Enter Poll Heading:</p>
              <input
                type="text"
                placeholder="Enter Heading"
                value={heading}
                onChange={(e) => {
                  setHeading(e.target.value);
                }}
              />
              <p>Enter Poll Description:</p>
              <textarea
                placeholder="Enter Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <p>Enter Poll Expieration date</p>
              <input
                type="date"
                value={expDate}
                onChange={(e) => {
                  setExpDate(e.target.value);
                }}
              />
              <button className="card-btn-up" onClick={handlePollCreation}>
                Create Poll
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
