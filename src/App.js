import React, { useState, useEffect, createContext } from "react";
import "./index.css";
import { System } from "./system";
import { supabase } from "./supabaseClient";

// Create a context for the session to be accessible by other components
export const SessionContext = createContext(null);

export default function App() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Effect for handling the session state
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
  };

  // If there is no session, show the login form
  if (!session) {
    return (
      <div className="login-container">
        <img className="logo" src="/qmul-logo.svg" alt="QMUL logo" />
        <h1 className="app-name">QMUL Issues and Feedback System</h1>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <SessionContext.Provider value={session}>
        <System />
      </SessionContext.Provider>
    );
  }
}
