import React, { useState, useEffect } from "react";
import "./viewEC.css";
import ApplyEC from "./applyEC";
import ECdetails from "./ECdetails";
import StudentFeedback from "../modulestaff/studentfeedback";
import TicketsMenu from "../it_admin/tickets";

const ViewEC = ({ supabase, user }) => {
  const [activeTab, setActiveTab] = useState("Extenuating Circumstances");
  const [ECs, setECs] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showAllECs, setShowAllECs] = useState(true);
  const [showApplyEC, setShowApplyEC] = useState(false);

  useEffect(() => {
    async function getECs() {
      const { data } = await supabase
        .from("extenuating_circumstances")
        .select();
      setECs(data);
    }
    getECs();
  }, [supabase]);

  const handleTabClick = (tab) => {
    setShowApplyEC(false);
    setActiveTab(tab);
  };

  const handleTitleClick = (entry) => {
    setSelectedEntry(entry);
    setShowAllECs(false);
  };

  const handleCloseEC = () => {
    setSelectedEntry(null);
    setShowAllECs(true);
  };

  const handleButtonClick = () => {
    setShowApplyEC(!showApplyEC);
  };

  const displayStatus = (status) => {
    const statusMap = {
      SUBMITTED: "Submitted",
      IN_PROGRESS: "In Progress",
      RESOLVED: "Resolved",
      REJECTED: "Rejected",
    };
    return statusMap[status] || status;
  };

  const renderECList = () => (
    <div className="entriesContainer">
      <div className="entry-header">
        <h3 id="title-h">Title</h3>
        <h3 id="desc-h">Description</h3>
        <h3 id="status-h">Status</h3>
        <h3 id="startedBy-h">Created on</h3>
      </div>

      {ECs.map((ec) => (
        <div key={ec.id} className="entry">
          <h2 id="ec-title" onClick={() => handleTitleClick(ec)}>
            {ec.title}
          </h2>
          <p id="desc">{ec.description}</p>
          <p id="ec-status">{displayStatus(ec.status)}</p>
          <div id="startedBy">
            <p>
              {new Date(ec.created_at).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderApplyEC = () => (
    <div>
      <ApplyEC supabase={supabase} user={user} />
    </div>
  );

  const renderContent = () => {
    if (showApplyEC) {
      return renderApplyEC();
    }

    switch (activeTab) {
      case "Extenuating Circumstances":
        return (
          <div>
            {showAllECs ? (
              renderECList()
            ) : (
              <ECdetails {...selectedEntry} onClose={handleCloseEC} />
            )}
          </div>
        );

      case "Feedback":
        return <StudentFeedback supabase={supabase} showReplyBox={false} />;

      case "Tickets":
        return (
          <TicketsMenu
            supabase={supabase}
            showTabs={false}
            showStartedBy={false}
            showOptions={false}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="studentfeedback-container">
      <div className="wrapper">
        <div className="tab-container">
          <button
            onClick={() => handleTabClick("Extenuating Circumstances")}
            className={
              activeTab === "Extenuating Circumstances" ? "active" : ""
            }
          >
            EC
          </button>
          <button
            onClick={() => handleTabClick("Tickets")}
            className={activeTab === "Tickets" ? "active" : ""}
          >
            Tickets
          </button>
          <button
            onClick={() => handleTabClick("Feedback")}
            className={activeTab === "Feedback" ? "active" : ""}
          >
            Feedback
          </button>
        </div>
        {activeTab === "Extenuating Circumstances" && (
          <button onClick={handleButtonClick} className="apply-ec-button">
            {showApplyEC ? "Back" : "Apply EC"}
          </button>
        )}
      </div>
      {renderContent()}
    </div>
  );
};

export default ViewEC;
