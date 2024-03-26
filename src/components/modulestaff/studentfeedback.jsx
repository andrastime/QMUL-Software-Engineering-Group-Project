import React, {useState} from 'react';
import './studentfeedback.css';

const studentfeedback = () => {
    const feedbackData2 = [
        {
            title: 'Feedback 1',
            description: 'This is the first feedback',
            profilePicture: 'profile1.jpg',
            name: 'John Doe',
            datePosted: '2022-01-01'
        },
        {
            title: 'Feedback 2',
            description: 'This is the second feedback',
            profilePicture: 'profile2.jpg',
            name: 'Jane Smith',
            datePosted: '2022-01-02'
        },
        // temporary data
    ];

    return (
        <div className='studentfeedback-container'>
            <div className='selectors'>
                <div className='select-module'>
                    <h4 id='select-module-text'>Select module</h4>
                    <select className='select-box'>
                        <option value="option1">ECS518U</option>
                        <option value="option2">ECS522U</option>
                        <option value="option3">ECS506U</option>
                    </select>
                </div>
                <input className="search-student" type="text" placeholder="search student by ID / name" />
            </div>
            <div className='feedback-header-container'>
                <h3>Feedback</h3>
                <h3 className='started-by-text'>Started by</h3>
            </div>
            <div className='feedback-container'>
                {feedbackData2.map((feedback, index) => (
                    <div key={index}>
                        <h2>{feedback.title}</h2>
                        <p>{feedback.description}</p>
                        <img src={feedback.profilePicture} alt="Profile" />
                        <p>{feedback.name}</p>
                        <p>{feedback.datePosted}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default studentfeedback;