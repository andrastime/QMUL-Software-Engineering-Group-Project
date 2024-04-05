import "./index.css";
import {
  CreateTicket,
  ViewEC,
  StudentFeedback,
  TicketsMenu,
} from "./components";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

export const System = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [showCreateTicket, setShowCreateTicket] = useState(false);

  useEffect(() => {
    const currentSession = supabase.auth.getSession();
    setUser(currentSession?.user || null);
    updateRole(currentSession?.user?.email);

    supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user || null);
      updateRole(session?.user?.email);
    });
  }, []);

  const updateRole = (email) => {
    let currentRole = "Student";

    const emailRoleMap = {
      "modstaffmember@qmul.ac.uk": "Module Staff",
      "admin@qmul.ac.uk": "Admin",
      "s.lochunah@se22.qmul.ac.uk": "Student",
    };

    if (email) {
      currentRole = emailRoleMap[email] || "Student";
    }

    setRole(currentRole);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Logout error", error.message);
  };

  const handleCreateTicket = (event) => {
    event.preventDefault();
    setShowCreateTicket((prev) => !prev);
  };

  const renderComponentBasedOnRole = () => {
    switch (role) {
      case "Student":
        return <ViewEC supabase={supabase} user={user} />;
      case "Module Staff":
        return <StudentFeedback supabase={supabase} />;
      case "Admin":
        return <TicketsMenu supabase={supabase} />;
      default:
        return null;
    }
  };

  return (
    <div className="system">
      <div className="navbar">
        <img src="/menu.svg" alt="Menu" className="menu" />
        <img
          src="/notification.svg"
          alt="Notification"
          className="notification"
        />
        <img
          src="/logout.svg"
          onClick={handleLogout}
          className="logout-button"
          alt="logout btn"
        />
      </div>

      <header className="dashboard-header">
        <h1 className="user-dashboard">{role} Dashboard</h1>
        <form className="search-form">
          <label htmlFor="search-option" className="search-label">
            Search option
          </label>
          <select id="search-option" className="search-select">
            <option value="service">search via service</option>
            <option value="service">option1</option>
            <option value="service">option2</option>
            <option value="service">option3</option>
          </select>
          <button type="submit" className="search-button">
            <img src="/search-icon.svg" alt="Search" />
          </button>
          <input type="text" className="search-input" />

          <button className="ticket-btn" onClick={handleCreateTicket}>
            {showCreateTicket ? "Back" : "Create Ticket"}
          </button>
        </form>
      </header>

      <main className="dashboard-main">
        {showCreateTicket ? (
          <CreateTicket supabase={supabase} user={user} />
        ) : (
          renderComponentBasedOnRole()
        )}
      </main>
    </div>
  );
};
