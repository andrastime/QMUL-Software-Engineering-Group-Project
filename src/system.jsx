import "./index.css";
import { createClient } from '@supabase/supabase-js';
import { StudentFeedback } from "./components";

const supabaseUrl = 'https://dswpmnhkvgpxqapgddfe.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzd3BtbmhrdmdweHFhcGdkZGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0MjYzNTgsImV4cCI6MjAyNjAwMjM1OH0.IBBT3bh87_nDHckwlR434DuHI1UvcoVypfcJH90s4eA';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const System = () => {
  // Function to handle the logout process
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Logout error", error.message);
  };

  return (
    <div className="system">
      <div className="navbar">
        <button onClick={handleLogout} className="logout-button">Logout</button> {/* Logout Button */}
        <img src="/notification.svg" alt="Notification" />
      </div>
      <header className="dashboard-header"></header>
      <main className="dashboard-main"></main>
      <StudentFeedback /> {/* temporarily put here to display it */}
    </div>
  );
};
