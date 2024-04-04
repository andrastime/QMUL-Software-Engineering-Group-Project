import "./index.css";
import { createClient } from "@supabase/supabase-js";
import { StudentFeedback } from "./components";
import { TicketsMenu } from "./components"
import { CreateTicket } from "./components";
import { useState, useEffect } from "react";
import { ViewEC } from "./components";

const supabaseUrl = "https://dswpmnhkvgpxqapgddfe.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzd3BtbmhrdmdweHFhcGdkZGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0MjYzNTgsImV4cCI6MjAyNjAwMjM1OH0.IBBT3bh87_nDHckwlR434DuHI1UvcoVypfcJH90s4eA";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const System = () => {
  const [userName, setUserName] = useState("");
  const [showCreateTicket, setShowCreateTicket] = useState(false);

  const handleCreateTicket = (event) => {
    event.preventDefault();
    setShowCreateTicket((prev) => !prev);
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      updateUserName(session);
    });
  }, []);

  const updateUserName = (session) => {
    if (session && session.user) {
      const userEmail = session.user.email;
      let name;

      switch (userEmail) {
        case "qmstudent@qmul.ac.uk":
          name = "Student";
          break;
        case "modstaffmember@qmul.ac.uk":
          name = "Module Staff";
          break;
        case "admin@qmul.ac.uk":
          name = "Admin";
          break;
        default:
          name = "User";
          break;
      }

      setUserName(name);
    } else {
      setUserName("User");
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Logout error", error.message);
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
        <h1 className="user-dashboard">{userName} Dashboard</h1>
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
          <CreateTicket supabase={supabase} />
        ) : (
          <>
            {userName === "Student" && <ViewEC />}
            {userName === "Module Staff" && <StudentFeedback supabase={supabase}/>}
            {userName === "Admin" && <TicketsMenu supabase={supabase}/>}
          </>
        )}
      </main>
    </div>
  );
};
