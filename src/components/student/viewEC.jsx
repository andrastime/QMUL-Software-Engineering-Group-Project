import React, { useState } from "react";
import "./viewEC.css";

const ViewEC = () => {
  const feedbackData2 = [
    {
      title: "Feedback 1 title",
      description:
        "This is the first feedback. Placeholder description example here.",
      profilePicture: "profile1.jpg",
      name: "John Doe",
      datePosted: "2022-01-01",
    },
    {
      title: "Feedback 2 title",
      description:
        "This is the second feedback. Placeholder description example here.",
      profilePicture: "profile2.jpg",
      name: "Jane Smith",
      datePosted: "2022-01-02",
    },
    // temporary data
  ];

  const feedbackData = [...feedbackData2, ...feedbackData2, ...feedbackData2];

  return (
    <div className="studentfeedback-container">
      <div className="selectors">
        <div className="select-module">
          <h4 id="select-module-text">Select module</h4>
          <select className="select-box">
            <option value="option1">ECS518U</option>
            <option value="option2">ECS522U</option>
            <option value="option3">ECS506U</option>
          </select>
        </div>
        <input
          className="search-student"
          type="text"
          placeholder="search student by ID / name"
        />
      </div>
      <div className="feedback-header-container">
        <h3>Feedback</h3>
        <h3 className="started-by-text">Started by</h3>
      </div>
      <div className="feedback-container">
        {feedbackData.map((feedback, index) => (
          <div
            className={`feedback-item ${index % 2 === 0 ? "even" : ""}`}
            key={index}
          >
            <h2 style={{ width: "15%" }}>{feedback.title}</h2>
            <p style={{ width: "60%" }}>{feedback.description}</p>
            <div style={{ width: "25%", display: "flex" }}>
              <img src={feedback.profilePicture} alt="profile" />
              <div>
                <p>{feedback.name}</p>
                <p>{feedback.datePosted}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewEC;
