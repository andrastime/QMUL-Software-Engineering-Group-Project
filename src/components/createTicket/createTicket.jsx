import React, { useState } from "react";
import "./createTicket.css";

const CreateTicket = ({ supabase }) => {
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from("ticket").insert([
      {
        title: ticket.title,
        description: ticket.description,
      },
    ]);

    if (error) {
      console.error("Error inserting data:", error.message);
      setSubmissionStatus("error");
    } else {
      console.log("Data inserted successfully:", data);
      setSubmissionStatus("success");
    }

    setTicket({
      title: "",
      description: "",
    });
  };

  return (
    <div className="submit-ticket-container">
      <h2>Create Ticket</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={ticket.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={ticket.description}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>

        {submissionStatus === "error" && (
          <div className="error-message">
            Error submitting ticket. Please try again.
          </div>
        )}
        {submissionStatus === "success" && (
          <div className="success-message">Ticket submitted successfully!</div>
        )}
      </form>
    </div>
  );
};

export default CreateTicket;
