import React, { useState } from "react";
import "./tickets.css";

const TicketsOverlay = ({
  supabase,
  ticketID,
  onClose,
  ticketTitle,
  currentStatus,
  refreshTickets,
}) => {
  const [status, setStatus] = useState(currentStatus);

  const overlayOff = () => {
    if (onClose) onClose();
  };

  const submit = async () => {
    const { error } = await supabase
      .from("ticket")
      .update({ status })
      .eq("id", ticketID);

    if (error) {
      console.error("Update error:", error);
    } else {
      refreshTickets();
      overlayOff();
    }
  };

  return (
    <div
      id="overlay"
      className="overlay-container"
      style={{ display: "block" }}
    >
      <div id="overlay-main-pane" className="overlay-content">
        <h2>Update Ticket Status</h2>
        <div className="overlay-details">
          <p>
            <b>Title:</b> {ticketTitle}
          </p>
          <p>
            <b>Current Status:</b> {displayStatus(currentStatus)}
          </p>
        </div>

        <div className="overlay-status-select">
          <h3>New Status</h3>
          <select
            id="status-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="SUBMITTED">Submitted</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>

        <div id="buttons">
          <button onClick={overlayOff}>Back</button>
          <button onClick={submit} id="submit">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to display the status text
const displayStatus = (status) => {
  const statusMap = {
    SUBMITTED: "Submitted",
    IN_PROGRESS: "In Progress",
    RESOLVED: "Resolved",
  };
  return statusMap[status] || status;
};

export default TicketsOverlay;
