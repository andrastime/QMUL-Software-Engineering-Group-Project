import React, { useState } from "react";
import "./createTicket.css";

const CreateTicket = ({ supabase, user }) => {
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    ticket_class: "",
    status: "SUBMITTED",
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

    if (!user) {
      console.error("User must be logged in to submit a ticket");
      setSubmissionStatus("error");
      return;
    }

    const { data, error } = await supabase.from("ticket").insert([
      {
        title: ticket.title,
        description: ticket.description,
        ticket_class: ticket.ticket_class,
        status: ticket.status,
        user_id: user.id,
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
      ticket_class: "",
      status: "SUBMITTED",
    });
  };

  return (
    <div className="submit-ticket-container">
      <div className="title-wrapper">
        <h2>Create Ticket</h2>
        <div className="type-wrapper">
          <label htmlFor="type" className="type-label">
            Type:
          </label>
          <select
            id="ticket_class"
            name="ticket_class"
            value={ticket.ticket_class}
            onChange={handleChange}
            required
            className="ticket-type"
          >
            <option value="">Choose</option>
            <option value="LAB">Lab</option>
            <option value="SERVICE">Service</option>
            <option value="SYSTEM">System</option>
          </select>
        </div>
      </div>

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
