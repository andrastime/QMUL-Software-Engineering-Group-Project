import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TicketsOverlay } from "./components";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <TicketsOverlay />
  </React.StrictMode>
);
