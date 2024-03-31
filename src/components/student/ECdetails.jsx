import React from "react"
import './ECdetails.css'

export default function ECdetails(props){
    

    const handleClose = () => {
        props.onClose(); // Call the onClose function passed from the parent
      };

    return(
        
        <div className="testDiv">
            <h1> {props.title}</h1>
            <p> {props.description} </p>
            <p> Status: {props.status} </p>
            <img src = "evidence.jpg" alt = "evidence"></img>
            <button type = "button" onClick ={handleClose}> Close EC </button>
        </div>
    )
}