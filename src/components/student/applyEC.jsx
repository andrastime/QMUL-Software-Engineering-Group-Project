import React, { useState } from "react";
import "./applyEC.css";

function ApplyEC({ supabase }) {
  const [formData, setFormData] = useState({
    Student_ID: "",
    title: "",
    description: "",
    evidence: "",
    status: "SUBMITTED",
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("extenuating_circumstances")
      .insert([
        {
          Student_ID: formData.Student_ID,
          title: formData.title,
          description: formData.description,
          evidence: formData.evidence,
          status: formData.status,
        },
      ]);

    if (error) {
      console.error("Error inserting data:", error.message);
      setSubmissionStatus("error");
    } else {
      console.log("Data inserted successfully:", data);
      setSubmissionStatus("success");
    }

    setFormData({
      Student_ID: "",
      title: "",
      description: "",
      evidence: "",
      status: "SUBMITTED",
    });
  };

  return (
    <div id="apply-ec-form">
      <h1>Apply for Extenuating Circumstance</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="student-id">
          Student ID:
          <input
            type="text"
            id="student-id"
            name="Student_ID"
            value={formData.Student_ID}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="title">
          Title:
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="description">
          Description:
          <textarea
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="evidence">
          Evidence:
          <textarea
            type="text"
            id="evidence"
            name="evidence"
            value={formData.evidence}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {submissionStatus === "error" && (
        <div className="error-message">
          Error submitting application. Please try again.
        </div>
      )}
      {submissionStatus === "success" && (
        <div className="success-message">
          Application submitted successfully!
        </div>
      )}
    </div>
  );
}

export default ApplyEC;
