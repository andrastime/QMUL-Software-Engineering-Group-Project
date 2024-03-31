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

  const [expandedItem, setExpandedItem] = useState(null);

  const handleItemClick = (index) => {
    if (expandedItem === index) {
      setExpandedItem(null);
    } else {
      setExpandedItem(index);
    }
  };

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
          <>
            <div
              className={`feedback-item ${index % 2 === 0 ? "" : "even"} ${expandedItem === index ? "expanded" : ""}`}
              key={feedback.id}
              onClick={() => handleItemClick(index)}
              >
              <h2 style={{ width: "25%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", padding: "2px 32px 2px 0", color: "var(--QMblue)"}}>{feedback.title}</h2>
              <p style={{ width: "50%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", padding: "2px 64px 2px 0", fontSize: "14px"}}>{feedback.comment}</p>
              <div style={{ width: "25%", display: "flex" }}>
                {/*<img src={feedback.profilePicture} alt="Profile" />*/}
                <div>
                  {/*<p>{feedback.name}</p>*/}
                  <p>{feedback.created_at}</p>
                </div>
              </div>
            </div>
            <>
            {expandedItem === index && (
                <div className="expanded-item">
                  {/* Add content for expanded item here */}
                </div>
            )}
            </>
          </>
        ))}
      </div>
    </div>
  );
};

export default StudentFeedback;
