import React, { useState } from "react";
import "./applyEC.css";

function ApplyEC({ supabase, user, onECSubmit }) {
  const [formData, setFormData] = useState({
    Student_ID: "",
    title: "",
    description: "",
    evidence: "",
    status: "SUBMITTED",
  });

  const [file, setFile] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let evidenceUrl = formData.evidence;

    // Check if there is a file to upload
    if (file) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `evidence/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("evidence-bucket")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Error uploading file:", uploadError.message);
        setSubmissionStatus("error");
        return;
      }

      evidenceUrl = filePath;
    }

    const { data, error } = await supabase
      .from("extenuating_circumstances")
      .insert([
        {
          Student_ID: formData.Student_ID,
          title: formData.title,
          description: formData.description,
          evidence: evidenceUrl,
          status: formData.status,
          user_id: user.id,
        },
      ]);

    if (error) {
      console.error("Error inserting data:", error.message);
      setSubmissionStatus("error");
    } else {
      console.log("Data inserted successfully:", data);
      setSubmissionStatus("success");
      onECSubmit();
    }

    setFormData({
      Student_ID: "",
      title: "",
      description: "",
      evidence: "",
      status: "SUBMITTED",
    });
    setFile(null);
    if (document.getElementById("file-upload")) {
      document.getElementById("file-upload").value = "";
    }
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
            required={!file}
          />
        </label>
        <div className="button-wrapper">
          <label htmlFor="file-upload">
            Upload File:{" "}
            <input type="file" id="file-upload" onChange={handleFileChange} />
          </label>

          <button type="submit">Submit</button>
        </div>
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
