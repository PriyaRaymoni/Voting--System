import React from "react";

function CreatePoll() {
  return (
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
          <input type="text" placeholder="Enter Heading" />
          <p>Enter Poll Description:</p>
          <textarea placeholder="Enter Description" />
          <p>Enter Poll Expieration date</p>
          <input type="date" />
          <button className="card-btn-up">Create Poll</button>
        </div>
      </div>
    </div>
  );
}

export default CreatePoll;
