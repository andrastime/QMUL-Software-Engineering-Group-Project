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
  }, []);

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

  const handleApplyECClick = () => {
    setShowApplyEC(true);
  };

  const handleBackClick = () => {
    setShowApplyEC(false);
  };

  const renderECList = () => (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Student ID</th>
        </tr>
      </thead>
      <tbody>
        {ECs.map((ec) => (
          <tr key={ec.id} onClick={() => handleTitleClick(ec)}>
            <td>{ec.title}</td>
            <td>{ec.description}</td>
            <td>{ec.Student_ID}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderApplyEC = () => (
    <div>
      <button onClick={handleBackClick}>Back</button>
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
            <button onClick={handleApplyECClick}>Create New EC</button>
            {showAllECs ? (
              renderECList()
            ) : (
              <ECdetails {...selectedEntry} onClose={handleCloseEC} />
            )}
          </div>
        );

      case "Feedback":
        return <StudentFeedback supabase={supabase} />;

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
      <div className="tab-container">
        <button
          onClick={() => handleTabClick("Extenuating Circumstances")}
          className={activeTab === "Extenuating Circumstances" ? "active" : ""}
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
      {renderContent()}
    </div>
  );
};

export default ViewEC;
