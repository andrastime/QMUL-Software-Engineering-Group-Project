import React, { useState, useEffect, componentDidUpdate } from "react";
import './tickets.css';
import ECdetails from "../student/ECdetails"; 

const TicketsMenu = ({ supabase }) => {

    const [currentClass, setClass] = useState("%");
    const [currentStatus, setStatus] = useState("%");
    const [currentSearch, setSearch] = useState("%");
    const [currentData, setData] = useState([]);

    const [activeTab, setActiveTab] = useState("Tickets");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const [ECs, setECs] = useState([]);

    useEffect(() => {
        getECs();
    }, []);

    async function getECs() {
        const { data } = await supabase.from("extenuating_circumstances").select();
        setECs(data);
    }

    console.log(ECs)

    const [selectedEntry, setSelectedEntry] = useState(null);
    const [showAllECs, setShowAllECs] = useState(true);

    const handleTitleClick = (entry) => {
        setSelectedEntry(entry);
        setShowAllECs(false);
    };

    const handleCloseEC = () => {
        setSelectedEntry(null);
        setShowAllECs(true);
    };

    const getTickets = (classParam, statusParam, searchParam) => {
        setData([]);
        supabase.from("ticket")
            .select("title, description, ticket_class, status, date_posted, id")
            .like('status', statusParam)
            .like('ticket_class', classParam)
            .or('title.ilike.%' + searchParam + '%', 'description.ilike.%' + searchParam + '%')
            .then((data) => {
                console.log(data.data);
                setData(data.data);
            })
            .catch(error => {
                console.log(error);
                setData([]);
            });
    };

    useEffect(() => {
        getTickets(currentClass, currentStatus, currentSearch);
    }, [currentClass, currentStatus, currentSearch]);

    const overlayOn = (e) => {
        if (e.target.nodeName === "IMG") {
            e.target = e.target.parentElement;
        }

        e.target.parentElement.parentElement.classList.add("updating");
        document.getElementById("overlay").style.display = "block";
    };

    const changeClass = (e) => { // Class select handler
        const selectedClass = e.target.value;
        setClass(selectedClass);
        getTickets(selectedClass, currentStatus, currentSearch);
    };

    const changeStatus = (e) => { // Status select handler
        const selectedStatus = e.target.value;
        setStatus(selectedStatus);
        getTickets(currentClass, selectedStatus, currentSearch);
    };

    const findTicket = (e) => { // Search box tracker code
        const searchValue = e.target.value;
        setSearch(searchValue);
        getTickets(currentClass, currentStatus, searchValue);
    };

    const renderContent = () => {
        switch (activeTab) {
            case "Tickets":
                return (
                    <div className='itticket-container'>
                        <div className='selectors'>
                            <div className='select-ticket-class'>
                                <div style={{ "display": "flex", "flex-direction": "row", "gap": "8px", "align-items": "center" }}>
                                    <h4 id='select-ticket-text'>Select Ticket Class</h4>
                                    <select onChange={changeClass} id="ticket-class" className='select-box'>
                                        <option value="%">All</option>
                                        <option value="LAB">Lab Ticket</option>
                                        <option value="SERVICE">Service Ticket</option>
                                        <option value="SYSTEM">System Ticket</option>
                                    </select>
                                </div>
                                <div style={{ "display": "flex", "flex-direction": "row", "gap": "8px", "align-items": "center" }}>
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
                            <h3 style={{ width: '20%' }}>Ticket</h3>
                            <h3 style={{ width: '35%' }}>Description</h3>
                            <h3 style={{ width: '10%' }}>Type</h3>
                            <h3 style={{ width: '10%' }}>Status</h3>
                            <h3 style={{ width: '25%' }}>Started by</h3>
                        </div>
                        <div className='ticket-container'>
                            {currentData.map((ticket, index) => (
                                <div id={ticket.id} className={`ticket-item ${index % 2 === 0 ? 'even' : ''}`} key={index} style={{ "align-content": "center", "display": "flex", "flex-direction": "row" }}>
                                    <h2 className="ticket-title" style={{ width: '20%', "text-overflow": "ellipses" }}>{ticket.title}</h2>
                                    <p style={{ width: '35%', "text-overflow": "ellipses" }}>{ticket.description}</p>
                                    <p style={{ width: '10%' }}>{ticket.ticket_class} </p>
                                    <p className="ticket-status" style={{ width: '10%' }}>{ticket.status} </p>
                                    <div className="started-button-group" style={{ "width": "25%", "display": "flex", "flex-direction": "row", "justify-content": "space-between" }}>
                                        <div className='started-by'>
                                            <img src="profile.png" />
                                            <div style={{ "display": "flex", "flex-direction": "column" }}>
                                                <p style={{ "font-weight": "bold" }}>QM Student</p>
                                                <p>{new Date(ticket.date_posted).toLocaleDateString("en-US", { day: '2-digit', month: 'long' })}</p>
                                            </div>
                                        </div>
                                        <button onClick={e => { overlayOn(e) }} onMouseLeave={e => { e.target.style.background = "rgba(190, 190, 190, 0.50)" }} onMouseOver={e => (e.target.style.background = "rgba(190, 190, 190, 0.80)")}><img src="ellipses.png" /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case "Extenuating Circumstances":
                return (
                    <div className="entriesContainer">
                        {showAllECs ? (
                            ECs.map(row => (
                                <div key={row.id} className="entry">
                                    <p>ID: {row.id}</p>
                                    <p>Created At: {row.created_at}</p>
                                    <p>Student ID: {row.Student_ID}</p>
                                    <button onClick={() => handleTitleClick(row)}>
                                        <p>Title: {row.title}</p>
                                    </button>
                                    <p>Description: {row.description}</p>
                                    {/* Add more fields as needed */}
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
            <div className="tab-container">
                <button
                    className={activeTab === "Extenuating Circumstances" ? "active" : ""}
                    onClick={() => handleTabClick("Extenuating Circumstances")}
                >
                    EC
                </button>
                <button
                    className={activeTab === "Tickets" ? "active" : ""}
                    onClick={() => handleTabClick("Tickets")}
                >
                    Tickets
                </button>
            </div>
            {renderContent()}
        </div>
    );
};

export default TicketsMenu;