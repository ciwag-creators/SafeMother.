import { useState, useEffect } from "react";
import API from "../api";
import "./Questions.css";

export default function AskQuestion() {
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchQuestions = async () => {
    try {
      const res = await API.get("/questions");
      setQuestions(res.data);
    } catch (err) {
      console.log("Error fetching questions:", err);
    }
  };

  useEffect(() => { 
    fetchQuestions(); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setIsSubmitting(true);
    try {
      await API.post("/questions", { question });
      setQuestion("");
      fetchQuestions();
    } catch (err) {
      console.log("Error submitting question:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="questions-page">
      
      {/* Header Section */}
      <div className="page-header">
        <h1 className="page-title">Get Expert Health Advice</h1>
        <p className="page-subtitle">Ask our certified health professionals about pregnancy, childcare, and maternal wellness</p>
      </div>

      {/* Ask Question Form */}
      <div className="ask-card">
        <div className="card-header">
          <h3>Ask Your Question</h3>
          <div className="expert-badge">
            <span className="badge-icon">👩‍⚕️</span>
            Certified Health Workers
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="ask-form">
          <div className="input-group">
            <textarea
              placeholder="What would you like to ask our health experts? For example: 'Is this symptom normal during pregnancy?' or 'What foods should I avoid while breastfeeding?'"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              maxLength={500}
              className="question-input"
            />
            <div className="input-footer">
              <span className="char-count">{question.length}/500</span>
            </div>
          </div>
          
          <button 
            type="submit" 
            className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
            disabled={!question.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Sending...
              </>
            ) : (
              <>
                <span className="btn-icon">📤</span>
                Send Question
              </>
            )}
          </button>
        </form>
        
        <div className="privacy-note">
          <span className="lock-icon">🔒</span>
          Your questions are private and answered by verified health professionals
        </div>
      </div>

      {/* Recent Questions Section */}
      <div className="recent-questions">
        <div className="section-header">
          <h2 className="section-title">Community Questions & Answers</h2>
          <div className="filter-tabs">
            <button className="filter-btn active">All</button>
            <button className="filter-btn">Answered</button>
            <button className="filter-btn">Pending</button>
          </div>
        </div>

        {questions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💬</div>
            <h3>No questions yet</h3>
            <p>Be the first to ask a question to our health experts</p>
          </div>
        ) : (
          <div className="questions-grid">
            {questions.map((q) => (
              <div key={q._id} className="question-card">
                <div className="question-header">
                  <span className="user-avatar">👤</span>
                  <div className="question-meta">
                    <span className="question-date">
                      {new Date(q.createdAt).toLocaleDateString()}
                    </span>
                    <span className={`status-badge ${q.answer ? 'answered' : 'pending'}`}>
                      {q.answer ? 'Answered' : 'Pending'}
                    </span>
                  </div>
                </div>
                
                <p className="question-text">"{q.question}"</p>

                {q.answer ? (
                  <div className="answer-section">
                    <div className="answer-header">
                      <span className="expert-avatar">👩‍⚕️</span>
                      <span className="expert-label">Health Expert Response</span>
                    </div>
                    <p className="answer-text">{q.answer}</p>
                    <div className="answer-actions">
                      <button className="action-btn">👍 Helpful</button>
                      <button className="action-btn">💬 Follow up</button>
                    </div>
                  </div>
                ) : (
                  <div className="pending-state">
                    <div className="pending-icon">⏳</div>
                    <p className="pending-text">Our health team is reviewing your question</p>
                    <small>Typically answered within 24 hours</small>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}