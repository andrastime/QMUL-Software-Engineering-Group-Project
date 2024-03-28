import "./index.css";
import { useState } from "react";
import { StudentFeedback } from "./components";

export const System = ({}) => {
  return (
    <div className="system">
      <div className="navbar">
        <img src="/notification.svg" alt="Notification" c />
      </div>
      <header className="dashboard-header"></header>
      <main className="dashboard-main"></main>
      <StudentFeedback /> {/* temporarily put here to display it */}
    </div>
  );
};
