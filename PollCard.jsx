import React from "react";

function PollCard() {
  return (
    <div className="card">
      <div className="card-head">
        <p className="card-heading">Poll Heading</p>
        <p className="card-exp">Poll Expires on - time</p>
      </div>
      <div className="card-body">
        <p className="card-description">Poll Description</p>
      </div>
      <div className="card-bottom">
        <button className="card-btn-up">Up Vote</button>
        <button className="card-btn-dow">Down Vote</button>
      </div>
    </div>
  );
}

export default PollCard;
