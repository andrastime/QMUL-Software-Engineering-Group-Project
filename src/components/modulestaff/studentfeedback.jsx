import React, {useState, useEffect} from "react";
import "./studentfeedback.css";
import ReplyFeedback from "./replyToFeedback";

const StudentFeedback = ({ supabase }) => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [searchedStudent, setSearchedStudent] = useState("");
  const [showReply, setShowReply] = useState(false);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      let query = supabase.from("module_feedback").select("*");
      const { data, error } = await query;
      if (error) {
        console.error("Error fetching feedback data:", error);
      } else {
        setFeedbackData(data);
        console.log(data);
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

  const longDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
  }

  const shortDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  const uniqueModules = [...new Set(feedbackData.map((feedback) => feedback.module))];

  return (
    <div className="studentfeedback-container">
      {showReply && <ReplyFeedback supabase={supabase} />}
      <div className="selectors">
        <div className="select-module">
          <h4 id="select-module-text">Select module</h4>
          <select className="select-box" value={selectedModule} onChange={(e) => setSelectedModule(e.target.value)}>
            <option value="">All Modules</option>
            {uniqueModules.map((module) => (
              <option key={module} value={module}>{module}</option>
            ))}
          </select>
        </div>
        <input className="search-student" type="text" placeholder="search student by ID / name" onChange={(e) => setSearchedStudent(e.target.value)}/>
        <button className="reply-btn" onClick={() => setShowReply(!showReply)}>{showReply ? "Hide reply box" : "Show reply box"}</button>
      </div>
      <div className="feedback-header-container">
        <h3>Feedback</h3>
        <h3 className="started-by-text">Started by</h3>
      </div>
      <div className="feedback-container">
        {feedbackData
          .filter((feedback) => feedback.module.includes(selectedModule))
          .map((feedback, index) => (
          <>
            <div
              className={`feedback-item ${index % 2 === 0 ? "" : "even"} ${expandedItem === index ? "expanded" : ""}`}
              key={feedback.id}
              onClick={() => handleItemClick(index)}
              >
              <h2 style={{ width: "25%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", padding: "2px 32px 2px 0", color: "var(--QMblue)"}}>{feedback.title}</h2>
              <p style={{ width: "50%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", padding: "2px 64px 2px 0", fontSize: "14px"}}>{feedback.comment}</p>
              <div style={{ width: "25%", display: "flex", gap: "10px" }}>
                {/*<img src={feedback.profilePicture} alt="Profile" />*/}
                <div className="profile-pic"></div>
                <div>
                  <p>{feedback.anonymous === false ? "NAME" : "Anonymous"}</p>
                  <p>{shortDate(feedback.created_at)}</p>
                </div>
              </div>
            </div>
            <>
            {expandedItem === index && (
                <div className="expanded-item">
                  {/* Add content for expanded item here */}
                  <h1 id="expanded-item-title">{feedback.title}</h1>
                  <h2>by {feedback.anonymous === false ? "NAME" : "Anonymous"} - {longDate(feedback.created_at)}</h2>
                  <p style={{margin: "2rem 0"}}>{feedback.comment}</p>
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
