import React, { useRef, useEffect, useState } from "react";
import * as ReactDOM from 'react-dom';
import { createClient } from "@supabase/supabase-js";
import './tickets.css';

const supabase = createClient(
    "https://dswpmnhkvgpxqapgddfe.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzd3BtbmhrdmdweHFhcGdkZGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0MjYzNTgsImV4cCI6MjAyNjAwMjM1OH0.IBBT3bh87_nDHckwlR434DuHI1UvcoVypfcJH90s4eA"
  );


const TicketsOverlay = () => {
    const divRef = useRef(null);

    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("");
    const [id, setID] = useState("");

    useEffect(() => {
        const handleStyleChange = () => {
            if (divRef.current.style.display === "block"){
                let elem = document.getElementsByClassName("updating")[0];
                setTitle(elem.getElementsByClassName("ticket-title")[0].innerHTML);
                setStatus(elem.getElementsByClassName("ticket-status")[0].innerHTML);
                setID(elem.id);
            }

        };
    
        const observer = new MutationObserver(handleStyleChange);
        const config = { attributes: true, attributeFilter: ['style'] };
        observer.observe(divRef.current, config);
    
        return () => {
          observer.disconnect();
        };
      }, []);

    const overlayOff = () => {
        document.getElementById("overlay").style.display = "none"; // Hide element
        document.getElementsByClassName("updating")[0].classList.remove("updating"); // Remove from updating status
    }

    const submit = async () => {
        let newVal = document.getElementById("status-select").value
        const { error } = await supabase
                          .from('ticket')
                          .update({ status: newVal })
                          .eq('id', id)

        console.log(error);
        document.getElementsByClassName("updating")[0].getElementsByClassName("ticket-status")[0].innerHTML = newVal;
        overlayOff();
    }

    return (
        <div ref={divRef} id="overlay">
            <div id="overlay-main-pane">
                <h2>Update Ticket Status</h2>
                <div>
                    <p><b>Title:</b> {title}</p>
                    <p><b>Current Status:</b> {status}</p>
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
                    <button onClick={submit} id="submit">Submit</button>
                </div>
            </div>
        </div>
    )
}

export default TicketsOverlay;