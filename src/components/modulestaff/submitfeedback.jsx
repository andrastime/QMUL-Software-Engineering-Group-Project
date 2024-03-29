import React, { useState } from "react";
import "./submitfeedback.css";

const SubmitFeedback = ({ supabase }) => {
  const [feedback, setFeedback] = useState({
    title: "",
    description: "",
    anonymous: false,
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("feedback")
      .insert([
        {
          title: feedback.title,
          comment: feedback.description,
          anonymous: feedback.anonymous,
        },
      ])
      .select();

    if (error) {
      console.error("Error inserting data:", error.message);
      setSubmissionStatus("error");
    } else {
      console.log("Data inserted successfully:", data);
      setSubmissionStatus("success");
    }

    setFeedback({
      title: "",
      description: "",
      anonymous: false,
    });
  };

  return (
    <div className="submit-feedback-container">
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={feedback.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={feedback.description}
          onChange={handleChange}
          required
        />

        <div className="button-wrapper">
          <input
            type="checkbox"
            id="anonymous"
            name="anonymous"
            checked={feedback.anonymous}
            onChange={() =>
              setFeedback((prevFeedback) => ({
                ...prevFeedback,
                anonymous: !prevFeedback.anonymous,
              }))
            }
          />
          <label htmlFor="anonymous">Anonymous</label>

          <button type="submit">Submit</button>
        </div>
        {submissionStatus === "error" && (
          <div className="error-message">
            Error submitting feedback. Please try again.
          </div>
        )}
        {submissionStatus === "success" && (
          <div className="success-message">
            Feedback submitted successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default SubmitFeedback;
