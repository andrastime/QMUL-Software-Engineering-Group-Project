import React, { useState, useEffect } from "react";
import "./tickets.css";
import ECdetails from "../student/ECdetails";

const TicketsMenu = ({
  supabase,
  showTabs = true,
  showStartedBy = true,
  showOptions = true,
}) => {
  const [currentClass, setClass] = useState("%");
  const [currentStatus, setStatus] = useState("%");
  const [currentSearch, setSearch] = useState("%");
  const [currentData, setData] = useState([]);
  const [ECs, setECs] = useState([]);
  const [activeTab, setActiveTab] = useState("Tickets");
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showAllECs, setShowAllECs] = useState(true);
  const [expandedTicket, setExpandedTicket] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    async function getECs() {
      const { data } = await supabase
        .from("extenuating_circumstances")
        .select();
      setECs(data);
    }
    getECs();
  }, [supabase]);

  useEffect(() => {
    getTickets(currentClass, currentStatus, currentSearch);
  }, [currentClass, currentStatus, currentSearch]);

  const handleTitleClick = (entry) => {
    setSelectedEntry(entry);
    setShowAllECs(false);
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

  const handleCloseEC = () => {
    setSelectedEntry(null);
    setShowAllECs(true);
  };

  const handleTicketClick = (id) => {
    setExpandedTicket(expandedTicket === id ? null : id);
  };

  const getTickets = (classParam, statusParam, searchParam) => {
    setData([]);
    supabase
      .from("ticket")
      .select("title, description, ticket_class, status, created_at, id")
      .like("status", statusParam)
      .like("ticket_class", classParam)
      .or(
        "title.ilike.%" + searchParam + "%",
        "description.ilike.%" + searchParam + "%"
      )
      .then((data) => {
        console.log(data.data);
        setData(data.data);
      })
      .catch((error) => {
        console.log(error);
        setData([]);
      });
  };

  const overlayOn = (e) => {
    if (e.target.nodeName === "IMG") {
      e.target = e.target.parentElement;
    }
    e.target.parentElement.parentElement.classList.add("updating");
    console.log(e.target.parentElement.parentElement.classList);
    document.getElementById("overlay").style.display = "block";
  };

  const changeClass = (e) => {
    // Class select handler
    const selectedClass = e.target.value;
    setClass(selectedClass);
    getTickets(selectedClass, currentStatus, currentSearch);
  };

  const changeStatus = (e) => {
    // Status select handler
    const selectedStatus = e.target.value;
    setStatus(selectedStatus);
    getTickets(currentClass, selectedStatus, currentSearch);
  };

  const findTicket = (e) => {
    // Search box tracker code
    const searchValue = e.target.value;
    setSearch(searchValue);
    getTickets(currentClass, currentStatus, searchValue);
  };

  const renderContent = () => {
    // Mapping functions
    const displayType = (type) => {
      const typeMap = {
        LAB: "Lab",
        SERVICE: "Service",
        SYSTEM: "System",
      };
      return typeMap[type] || type;
    };

    const displayECStatus = (status) => {
      const ECstatusMap = {
        SUBMITTED: "Submitted",
        IN_PROGRESS: "In Progress",
        RESOLVED: "Resolved",
        REJECTED: "Rejected",
      };
      return ECstatusMap[status] || status;
    };

    const displayStatus = (status) => {
      const statusMap = {
        SUBMITTED: "Submitted",
        IN_PROGRESS: "In Progress",
        RESOLVED: "Resolved",
      };
      return statusMap[status] || status;
    };

    switch (activeTab) {
      case "Tickets":
        return (
          <div className="itticket-container">
            <div className="selectors">
              <div className="select-ticket-class">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <h4 id="select-ticket-text">Select Ticket Class</h4>
                  <select
                    onChange={changeClass}
                    id="ticket-class"
                    className="select-box"
                  >
                    <option value="%">All</option>
                    <option value="LAB">Lab Ticket</option>
                    <option value="SERVICE">Service Ticket</option>
                    <option value="SYSTEM">System Ticket</option>
                  </select>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <h4 id="select-ticket-text">Select Status</h4>
                  <select
                    onChange={changeStatus}
                    id="ticket-status"
                    className="select-box"
                  >
                    <option value="%">All</option>
                    <option value="SUBMITTED">Submitted</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                  </select>
                </div>
              </div>
              <input
                id="search-it"
                onChange={findTicket}
                type="text"
                placeholder="Search Tickets"
              />
            </div>
            <div className="ticket-header-container" style={{"gap": "4%"}}>
              <div>
                <h3 style={{ width: "30.77%" }}>Ticket</h3>
                <h3 style={{ width: "53.85%" }}>Description</h3>
                <h3 style={{ width: "15.38%" }}>Type</h3>
                <h3 style={{ width: "12.4%" }}>Status</h3>
              </div>
              {showStartedBy && <h3 style={{ width: "22%" }}>Started by</h3>}
            </div>

            <div className="ticket-container">
              {currentData.map((ticket, index) => (
                <React.Fragment key={ticket.id}>
                  <div
                    id={ticket.id}
                    className={`ticket-item ${index % 2 === 0 ? "even" : ""} ${
                      expandedTicket === ticket.id ? "expanded" : ""
                    }`}
                  >
                    <div onClick={() => handleTicketClick(ticket.id)}>
                      <h2 className="ticket-title">{ticket.title}</h2>
                      <p className="ticket-description">{ticket.description}</p>
                      <p className="ticket-typestatus">
                        {displayType(ticket.ticket_class)}
                      </p>
                      <p className="ticket-typestatus ticket-status">
                        {displayStatus(ticket.status)}
                      </p>
                    </div>
                    <div className="started-button-group">
                      {showStartedBy && (
                        <div className="started-by">
                          <img src="profile.png" alt="profile" />
                          <div className="startedBy-wrapper">
                            <p style={{ "font-weight": "bold" }}>Student</p>
                            <p>
                              {new Date(ticket.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                      {showOptions && (
                        <button
                          onClick={(e) => {
                            overlayOn(e);
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background =
                              "rgba(190, 190, 190, 0.50)";
                          }}
                          onMouseOver={(e) =>
                            (e.target.style.background =
                              "rgba(190, 190, 190, 0.80)")
                          }
                        >
                          <img src="ellipses.png" alt="ellipses" />
                        </button>
                      )}
                    </div>
                  </div>
                  {expandedTicket === ticket.id && (
                    <div className="expanded-itemk">
                      <h1 id="expanded-item-titlek">{ticket.title}</h1>
                      <h2>
                        by {"Student - "}
                        {longDate(ticket.created_at)}
                      </h2>
                      <p style={{ margin: "2rem 0" }}>{ticket.description}</p>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        );

      case "Extenuating Circumstances":
        return (
          <div className="entriesContainer">
            <div className="entry-header">
              <h3 id="title-h">Title</h3>
              <h3 id="desc-h">Description</h3>
              <h3 id="status-h">Status</h3>
              <h3 id="startedBy-h">Started by</h3>
            </div>
            {showAllECs ? (
              ECs.map((row) => (
                <div key={row.id} className="entry">
                  <h2 id="ec-title" onClick={() => handleTitleClick(row)}>
                    {row.title}
                  </h2>
                  <p id="desc">{row.description}</p>
                  <p id="ec-status">{displayECStatus(row.status)}</p>
                  <div id="startedBy">
                    <img src="profile.png" alt="profile" />
                    <div>
                      <p id="studentid">{row.Student_ID}</p>
                      <p>
                        {new Date(row.created_at).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <button
                    onMouseLeave={(e) => {
                      e.target.style.background = "rgba(190, 190, 190, 0.50)";
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.background = "rgba(190, 190, 190, 0.80)")
                    }
                  >
                    <img src="ellipses.png" alt="ellipses" />
                  </button>
                </div>
              ))
            ) : (
              <ECdetails
                title={selectedEntry.title}
                description={selectedEntry.description}
                status={selectedEntry.status}
                onClose={handleCloseEC}
              />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="studentfeedback-container">
      {showTabs && (
        <div className="tab-container">
          <button
            className={activeTab === "Tickets" ? "active" : ""}
            onClick={() => handleTabClick("Tickets")}
          >
            Tickets
          </button>
          <button
            className={
              activeTab === "Extenuating Circumstances" ? "active" : ""
            }
            onClick={() => handleTabClick("Extenuating Circumstances")}
          >
            EC
          </button>
        </div>
      )}
      {renderContent()}
    </div>
  );
};

export default TicketsMenu;
