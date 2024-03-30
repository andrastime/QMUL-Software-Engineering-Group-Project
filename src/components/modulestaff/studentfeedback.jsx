import React, {useState, useEffect} from "react";
import "./studentfeedback.css";

const StudentFeedback = ({ supabase }) => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      const { data, error } = await supabase.from("module_feedback").select("*");
      if (error) {
        console.error("Error fetching feedback data:", error);
      } else {
        setFeedbackData(data);
      }
    };
    fetchFeedbackData();
  }, []);

  return (
    <div className="studentfeedback-container">
      <div className="selectors">
        <div className="select-module">
          <h4 id="select-module-text">Select module</h4>
          <select className="select-box">
            <option value="option1">ECS518U</option>
            <option value="option2">ECS522U</option>
            <option value="option3">ECS506U</option>
          </select>
        </div>
        <input className="search-student" type="text" placeholder="search student by ID / name" />
      </div>
      <div className="feedback-header-container">
        <h3>Feedback</h3>
        <h3 className="started-by-text">Started by</h3>
      </div>
      <div className="feedback-container">
        {feedbackData.map((feedback, index) => (
          <div className={`feedback-item ${index % 2 === 0 ? "" : "even"}`} key={feedback.id}>
            <h2 style={{ width: "15%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", padding: "0 32px 0 0" }}>{feedback.id}</h2>
            <p style={{ width: "60%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", padding: "0 64px 0 0" }}>{feedback.comment}</p>
            <div style={{ width: "25%", display: "flex" }}>
              {/*<img src={feedback.profilePicture} alt="Profile" />*/}
              <div>
                {/*<p>{feedback.name}</p>*/}
                <p>{feedback.created_at}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentFeedback;
