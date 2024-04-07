import React, { useState, useEffect } from "react";
import "./studentfeedback.css";
import ReplyFeedback from "./replyToFeedback";

const StudentFeedback = ({ supabase, showReplyBox = true }) => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [searchedStudent, setSearchedStudent] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      let query = supabase.from("module_feedback").select("*");
      const { data, error } = await query;
      if (error) {
        console.error("Error fetching feedback data:", error);
      } else {
        setFeedbackData(data);
      }
    };
    fetchFeedbackData();
  }, [supabase]);

  const handleItemClick = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  const longDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const shortDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const uniqueModules = [
    ...new Set(feedbackData.map((feedback) => feedback.module)),
  ];

  return (
    <div className="studentfeedback-containerk">
      {showReplyBox && showReply && <ReplyFeedback supabase={supabase} />}
      <div className="selectorsk">
        <div className="select-modulek">
          <h4 id="select-module-textk">Select module</h4>
          <select
            className="select-boxk"
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
          >
            <option value="">All Modules</option>
            {uniqueModules.map((module) => (
              <option key={module} value={module}>
                {module}
              </option>
            ))}
          </select>
        </div>
        <input
          className="search-studentk"
          type="text"
          placeholder="search student by ID / name"
          onChange={(e) => setSearchedStudent(e.target.value)}
        />
        {showReplyBox && (
          <button
            className="reply-btnk"
            onClick={() => setShowReply(!showReply)}
          >
            {showReply ? "Hide reply box" : "Show reply box"}
          </button>
        )}
      </div>
      <div className="feedback-header-containerk">
        <h3>Feedback</h3>
        <h3 className="description-text">Description</h3>
        <h3 className="started-by-textk">Started by</h3>
      </div>
      <div className="feedback-containerk">
        {feedbackData
          .filter(
            (feedback) =>
              feedback.module.includes(selectedModule) &&
              (searchedStudent === "" ||
                feedback.student_id === searchedStudent)
          )
          .map((feedback, index) => (
            <>
              <div
                className={`feedback-itemk ${index % 2 === 0 ? "" : "evenk"} ${
                  expandedItem === index ? "expanded" : ""
                }`}
                key={feedback.id}
                onClick={() => handleItemClick(index)}
              >
                <h2 className="feedback-title">{feedback.title}</h2>
                <p className="feedback-description">{feedback.comment}</p>
                <div className="feedback-profile">
                  <img
                    className="profile-pick"
                    src="profile.png"
                    alt="profile"
                  />

                  <div>
                    <p className="profile-name">
                      {feedback.anonymous === false ? "Student" : "Anonymous"}
                    </p>
                    <p>{shortDate(feedback.created_at)}</p>
                  </div>
                </div>
              </div>
              <>
                {expandedItem === index && (
                  <div className="expanded-itemk">
                    <h1 id="expanded-item-titlek">{feedback.title}</h1>
                    <h2>
                      by{" "}
                      {feedback.anonymous === false ? "Student" : "Anonymous"} -{" "}
                      {longDate(feedback.created_at)}
                    </h2>
                    <p style={{ margin: "2rem 0" }}>{feedback.comment}</p>
                  </div>
                )}
              </>
            </>
          ))}
      </div>
    </div>
  );
};

export default StudentFeedback;
