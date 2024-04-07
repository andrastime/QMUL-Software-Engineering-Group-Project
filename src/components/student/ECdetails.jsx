import React from "react";
import "./ECdetails.css";

export default function ECdetails(props) {
  const handleClose = () => {
    props.onClose();
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

  return (
    <div className="testDiv">
      <h1 className="detail-title">{props.title}</h1>
      <div className="detail-desc">
        <h2>Description:</h2>
        <p>{props.description} </p>
      </div>
      <div className="detail-evidence">
        <h2>Evidence: </h2>
        <p>{props.evidence}</p>
      </div>

      <div className="detail-date">
        <h2>Date: </h2>
        <p>{longDate(props.created_at)}</p>
      </div>
      <div className="detail-status">
        <h2>Status: </h2>
        <p>{props.status} </p>
        <button className="detail-button" type="button" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
}
