import React, { useState } from "react";
import "./viewEC.css";
import { createClient } from "@supabase/supabase-js";
import ApplyEC from "./applyEC";
import ECdetails from "./ECdetails"

const supabaseUrl = "https://dswpmnhkvgpxqapgddfe.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzd3BtbmhrdmdweHFhcGdkZGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0MjYzNTgsImV4cCI6MjAyNjAwMjM1OH0.IBBT3bh87_nDHckwlR434DuHI1UvcoVypfcJH90s4eA";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ViewEC = () => {
  const [activeTab, setActiveTab] = useState("Tickets");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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

  
  const ECclaim1 = { title: "First EC Title", description: "This is a dummy description for the first EC", status: "Pending",
                    evidence: "evidence.jpg"}

  // used this to test what ECdetails component will look like 

  const [isECOpen, setIsECOpen] = useState(false);

  const handleToggleEC = () => {
    setIsECOpen(!isECOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Tickets":
        return <div> Test feedback content </div>;

      case "Feedback":
        return (
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
        );

      case "Extenuating Circumstances":
        return (
          <div>
            <button type="button" onClick={handleToggleEC}>Test opening EC</button>
            {isECOpen && (
          <ECdetails title = {ECclaim1.title} description = {ECclaim1.description} status = {ECclaim1.status}
          evidence = {ECclaim1.evidence} onClose={handleToggleEC}></ECdetails>
          )}

            <ApplyEC supabase={supabase} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="studentfeedback-container">
      <div className="tab-container">
        <button
          className={activeTab === "Extenuating Circumstances" ? "active" : ""}
          onClick={() => handleTabClick("Extenuating Circumstances")}
        >
          EC
        </button>
        <button
          className={activeTab === "Tickets" ? "active" : ""}
          onClick={() => handleTabClick("Tickets")}
        >
          Tickets
        </button>
        <button
          className={activeTab === "Feedback" ? "active" : ""}
          onClick={() => handleTabClick("Feedback")}
        >
          Feedback
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default ViewEC;
