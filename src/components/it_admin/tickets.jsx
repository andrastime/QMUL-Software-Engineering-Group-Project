import React, { useState, useEffect, componentDidUpdate } from "react";
import { createClient } from "@supabase/supabase-js";
import './tickets.css';

const TicketsMenu = () => {
    const supabase = createClient(
        "https://dswpmnhkvgpxqapgddfe.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzd3BtbmhrdmdweHFhcGdkZGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0MjYzNTgsImV4cCI6MjAyNjAwMjM1OH0.IBBT3bh87_nDHckwlR434DuHI1UvcoVypfcJH90s4eA"
      );

    const [currentClass, setClass] = useState("%");
    const [currentStatus, setStatus] = useState("%");
    const [currentSearch, setSearch] = useState("%");
    const [currentData, setData] = useState([]);
    
    // if (auth == "ITAdmin") {} SOLVE SOMEHOW PASS SESSION to make sure ITADMIN
    
    const getTickets = () => {
        setData([]);
        supabase.from("ticket")
        .select("title, description, ticket_class, status, date_posted, id")
        .like('status', currentStatus)
        .like('ticket_class', currentClass)
        .or('title.ilike.%' + currentSearch + '%',
            'description.ilike.%' + currentSearch + '%')
        .then((data) => {
            console.log(data.data);
            setData(data.data);
        })
        .catch(error => {
            console.log(error);
            setData([]);
        });
    }

    useEffect(() => {
        getTickets();
    }, [currentClass, currentStatus, currentSearch]);

    const overlayOn = (e) => {
        if (e.target.nodeName == "IMG"){
            e.target = e.target.parentElement;
        }

        e.target.parentElement.parentElement.classList.add("updating");
        document.getElementById("overlay").style.display = "block";
    }

    const changeClass = () => { // Class select handler
        setClass(document.getElementById("ticket-class").value);
    }

    const changeStatus = () => { // Status select handler
        setStatus(document.getElementById("ticket-status").value);
    }

    const findTicket = () => { // Search box tracker code
        let box = document.getElementById("search-it");

        if (box.value == "")
        {
            setSearch("%");
            return;
        } 
        setSearch(box.value);
    }
    
    return(
        <div className='itticket-container'>
            <div className='selectors'>
                <div className='select-ticket-class'>
                    <div style={{"display": "flex", "flex-direction": "row", "gap": "8px", "align-items": "center"}}>
                        <h4 id='select-ticket-text'>Select Ticket Class</h4>
                        <select onChange={changeClass} id="ticket-class" className='select-box'>
                            <option value="%">All</option>
                            <option value="LAB">Lab Ticket</option>
                            <option value="SERVICE">Service Ticket</option>
                            <option value="SYSTEM">System Ticket</option>
                        </select>
                    </div>
                    <div style={{"display": "flex", "flex-direction": "row", "gap": "8px", "align-items": "center"}}>
                        <h4 id='select-ticket-text'>Select Status</h4>
                        <select onChange={changeStatus} id="ticket-status" className='select-box'>
                            <option value="%">All</option>
                            <option value="SUBMITTED">Submitted</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="RESOLVED">Resolved</option>
                        </select>
                    </div>
                </div>
                <input id="search-it" onChange={findTicket} type="text" placeholder="Search Tickets" />
            </div>
            <div className='ticket-header-container '>
                <h3 style={{width: '20%'}}>Ticket</h3>
                <h3 style={{width: '35%'}}>Description</h3>
                <h3 style={{width: '10%'}}>Type</h3>
                <h3 style={{width: '10%'}}>Status</h3>
                <h3 style={{width: '25%'}}>Started by</h3>
            </div>
            <div className='ticket-container'>
                {currentData.map((ticket, index) => (
                    <div id={ticket.id} className={`ticket-item ${index % 2 === 0 ? 'even' : ''}`} key={index} style={{"align-content": "center", "display": "flex", "flex-direction": "row"}}>
                        <h2 className="ticket-title" style={{width: '20%', "text-overflow": "ellipses"}}>{ticket.title}</h2>
                        <p style={{width: '35%', "text-overflow": "ellipses"}}>{ticket.description}</p>
                        <p style={{width: '10%'}}>{ticket.ticket_class} </p>
                        <p className="ticket-status" style={{width: '10%'}}>{ticket.status} </p>
                        <div className="started-button-group" style={{"width": "25%", "display": "flex", "flex-direction": "row", "justify-content": "space-between"}}>
                            <div className='started-by'>
                                <img src="profile.png" />
                                <div style={{"display": "flex", "flex-direction": "column"}}>
                                    <p style={{"font-weight": "bold"}}>QM Student</p>
                                    <p>{new Date(ticket.date_posted).toLocaleDateString("en-US", {day: '2-digit', month: 'long'})}</p>
                                </div>
                            </div>
                            <button onClick={e => {overlayOn(e)}} onMouseLeave={e => {e.target.style.background = "rgba(190, 190, 190, 0.50)"}} onMouseOver={e => (e.target.style.background = "rgba(190, 190, 190, 0.80)")}><img src="ellipses.png"/></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
// View tickets and update them

export default TicketsMenu;