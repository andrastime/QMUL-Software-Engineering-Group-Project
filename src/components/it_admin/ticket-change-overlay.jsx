import React, { useRef, useEffect, useState } from "react";
import "./tickets.css";

const TicketsOverlay = (supabase) => {
  const divRef = useRef(null);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [id, setID] = useState("");

  useEffect(() => {
    const handleStyleChange = () => {
      if (divRef.current.style.display === "block") {
        let elem = document.getElementsByClassName("updating")[0];
        setTitle(elem.getElementsByClassName("ticket-title")[0].innerHTML);
        setStatus(elem.getElementsByClassName("ticket-status")[0].innerHTML);
        setID(elem.id);
      }
    };

    const observer = new MutationObserver(handleStyleChange);
    const config = { attributes: true, attributeFilter: ["style"] };
    observer.observe(divRef.current, config);

    return () => {
      observer.disconnect();
    };
  }, []);

  const overlayOff = () => {
    document.getElementById("overlay").style.display = "none";
    document.getElementsByClassName("updating")[0].classList.remove("updating");
  };

  const submit = async () => {
    let newVal = document.getElementById("status-select").value;
    const { error } = await supabase
      .from("ticket")
      .update({ status: newVal })
      .eq("id", id);

    console.log(error);
    document
      .getElementsByClassName("updating")[0]
      .getElementsByClassName("ticket-status")[0].innerHTML = newVal;
    overlayOff();
  };

  return (
    <div ref={divRef} id="overlay">
      <div id="overlay-main-pane">
        <h2>Update Ticket Status</h2>
        <div>
          <p>
            <b>Title:</b> {title}
          </p>
          <p>
            <b>Current Status:</b> {status}
          </p>
        </div>

        <div>
          <h3>New Status</h3>
          <select id="status-select">
            <option value="SUBMITTED">Submitted</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>

        <div id="buttons">
          <button onClick={overlayOff}>Back</button>
          <button onClick={submit} id="submit">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketsOverlay;
