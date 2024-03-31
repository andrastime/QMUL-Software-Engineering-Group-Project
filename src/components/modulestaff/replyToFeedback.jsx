import React, { useState, useEffect } from 'react';
import './replyToFeedback.css';

const ReplyFeedback = ({ supabase }) => {
    const [feedbackList, setFeedbackList] = useState([]);
    const [selectedFeedbackId, setSelectedFeedbackId] = useState('');
    const [reply, setReply] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [comment, setComment] = useState('');

    useEffect(() => {
        async function fetchFeedback() {
            const { data, error } = await supabase.from('module_feedback').select('id, comment, title');
            if (error) {
                console.error('Error fetching feedback:', error.message);
            } else {
                setFeedbackList(data);
            }
        }
        fetchFeedback();
    }, [supabase]);

    useEffect(() => {
        async function fetchComment() {
            if (selectedFeedbackId) {
                const { data, error } = await supabase.from('module_feedback').select('comment').eq('id', selectedFeedbackId);
                if (error) {
                    console.error('Error fetching comment:', error.message);
                } else if (data && data.length > 0) {
                    setComment(data[0].comment);
                }
            }
        }
        fetchComment();
    }, [supabase, selectedFeedbackId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'feedbackId') {
            setSelectedFeedbackId(value);
        } else if (name === 'reply') {
            setReply(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { error } = await supabase.from('reply').insert([
            { feedback_id: selectedFeedbackId, reply: reply }
        ]);
        
        if (error) {
            console.error('Error inserting data:', error.message);
            setSubmissionStatus('error');
        } else {
            console.log('Reply submitted successfully');
            setSubmissionStatus('success');
        }
        
        setSelectedFeedbackId('');
        setReply('');
    };

    return (
        <div className='reply-feedback-container'>
            <h2>Reply to Feedback</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="feedbackId">Select Feedback:</label>
                <select id="feedbackId" name="feedbackId" value={selectedFeedbackId} onChange={handleChange} required>
                    <option value="">Select...</option>
                    {feedbackList.map((feedback) => (
                        <option key={feedback.id} value={feedback.id}>{feedback.title}</option>
                    ))}
                </select>
                <p>{comment}</p>

                <label htmlFor="reply">Reply:</label>
                <textarea id="reply" name="reply" value={reply} onChange={handleChange} required />

                <button type="submit">Submit Reply</button>
                {submissionStatus === 'error' && (
                    <div className="error-message">Error submitting reply. Please try again.</div>
                )}
                {submissionStatus === 'success' && (
                    <div className="success-message">Reply submitted successfully!</div>
                )}
            </form>
        </div>
    );
}

export default ReplyFeedback;
