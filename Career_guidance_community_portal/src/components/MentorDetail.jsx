import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import mentorsData from "./mentorsData.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCalendarAlt, FaStar, FaStarHalf, FaRegStar, FaCheck, FaClock, FaDollarSign, FaGlobe, FaBook, FaUserTie } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { Form } from 'react-bootstrap';

console.log("Loaded API Key:", import.meta.env.VITE_GEMINI_API_KEY);

const MentorDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [mentor, setMentor] = useState(null);
  const { user } = useAuth();
  
  useEffect(() => {
    console.log("MentorDetail: ID parameter =", id);
    console.log("Current path:", location.pathname);
    
    axios.get(`http://localhost:5000/api/mentors/${id}`)
      .then(res => setMentor(res.data.data))
      .catch(err => console.error(err));
  }, [id]);
  
  const [activeTab, setActiveTab] = useState("about");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingTopic, setBookingTopic] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Asking question:', question);
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          contents: [{
            parts: [{
              text: question
            }]
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Response received:', response.data);
      setAnswer(response.data.candidates[0]?.content?.parts[0]?.text || 'No answer generated.');
    } catch (error) {
      console.error('Error fetching answer:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Time slots for booking
  const timeSlots = [
    "9:00 AM", 
    "10:00 AM", 
    "11:00 AM", 
    "1:00 PM", 
    "2:00 PM", 
    "3:00 PM",
    "4:00 PM"
  ];

  // Handle booking confirmation
  const handleBookSession = async (e) => {
    e?.preventDefault();
    if (!user) {
      alert('Please log in to book a session.');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:5000/api/bookings',
        {
          mentor: mentor?._id,
          date: selectedDay,
          timeSlot: selectedTimeSlot,
          topic: bookingTopic
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (response.data.success) {
        setBookingConfirmed(true);
        setBookingTopic("");
        setSelectedDay(null);
        setSelectedTimeSlot(null);
        setTimeout(() => {
          setBookingConfirmed(false);
        }, 3000);
      } else {
        alert(response.data.message || 'Booking failed');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error booking session');
    } finally {
      setLoading(false);
    }
  };

  // If mentor data is not yet loaded, show loading state
  if (!mentor) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading mentor details...</p>
      </div>
    );
  }

  return (
    <div className="container py-5 fade-in">
      {/* Profile Header */}
      <div className="profile-header rounded-3 mb-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-4 text-center text-md-start">
              <img
                src={mentor?.image}
                alt={mentor?.name}
                className="profile-avatar"
                onError={(e) => {e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor?.name)}&background=random&size=256`}}
              />
            </div>
            <div className="col-md-8 text-center text-md-start mt-4 mt-md-0">
              <h1 className="mb-2">{mentor?.name}</h1>
              <h4 className="text-white-50 mb-3">{mentor?.title}</h4>
              
              <div className="d-flex flex-wrap gap-2 mb-4">
                {mentor?.categories && mentor.categories.map((category, index) => (
                  <span key={index} className="badge bg-light text-primary">
                    {category}
                  </span>
                ))}
              </div>
              
              <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-3">
                <div className="text-warning me-2">
                  {Array(5).fill(0).map((_, i) => (
                    <i key={i} className={`bi ${i < Math.floor(mentor?.ratings || 4.5) ? 'bi-star-fill' : i < (mentor?.ratings || 4.5) ? 'bi-star-half' : 'bi-star'}`}></i>
                  ))}
                </div>
                <span className="text-white-50">({mentor?.reviewCount || 30}+ reviews)</span>
              </div>
              
              <div className="d-flex flex-wrap gap-3 mt-4">
                <button className="btn btn-light px-4">
                  <i className="bi bi-calendar-check me-2"></i> Book Session
                </button>
                <button 
                  className="btn btn-outline-light px-4"
                  onClick={() => setActiveTab('qa')}
                >
                  <i className="bi bi-chat-dots me-2"></i> Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="row">
        <div className="col-lg-8">
          {/* Tabs */}
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
                onClick={() => setActiveTab('about')}
              >
                About
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'experience' ? 'active' : ''}`}
                onClick={() => setActiveTab('experience')}
              >
                Experience
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'qa' ? 'active' : ''}`}
                onClick={() => setActiveTab('qa')}
              >
                Q&A
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </li>
          </ul>
          
          {/* Tab Content */}
          <div className="tab-content p-4 bg-white rounded shadow-sm mb-4">
            {/* About Tab */}
            {activeTab === 'about' && (
              <div>
                <h4 className="mb-4">About {mentor?.name}</h4>
                <p className="lead">{mentor?.bio || `${mentor?.name} is an experienced professional with extensive knowledge in their field. They are passionate about mentoring and helping others achieve their career goals.`}</p>
                
                <div className="row mt-4">
                  <div className="col-md-6 mb-3">
                    <h5 className="mb-3">Education</h5>
                    <div className="d-flex mb-3">
                      <div className="bg-light p-2 rounded me-3">
                        <i className="bi bi-mortarboard text-primary"></i>
                      </div>
                      <div>
                        <div className="fw-medium">{mentor?.education || "Master's Degree"}</div>
                        <div className="text-muted small">{mentor?.educationYear || "2010 - 2012"}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <h5 className="mb-3">Expertise</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {(mentor?.categories || ["Career Guidance", "Professional Development"]).map((skill, index) => (
                        <span key={index} className="badge bg-light text-primary p-2">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Experience Tab */}
            {activeTab === 'experience' && (
              <div>
                <h4 className="mb-4">Professional Experience</h4>
                <div className="timeline-item mb-4 position-relative ps-4">
                  <div className="timeline-marker"></div>
                  <h5>{mentor?.title || "Senior Professional"}</h5>
                  <p className="text-muted mb-2">2018 - Present</p>
                  <p>{mentor?.experience}</p>
                </div>
                <div className="timeline-item mb-4 position-relative ps-4">
                  <div className="timeline-marker"></div>
                  <h5>Previous Position</h5>
                  <p className="text-muted mb-2">2015 - 2018</p>
                  <p>Worked on various projects and developed expertise in the field.</p>
                </div>
                <div className="timeline-item position-relative ps-4">
                  <div className="timeline-marker"></div>
                  <h5>Starting Position</h5>
                  <p className="text-muted mb-2">2012 - 2015</p>
                  <p>Began career journey and built foundational skills.</p>
                </div>
              </div>
            )}
            
            {/* Q&A Tab */}
            {activeTab === 'qa' && (
              <div>
                <h4 className="mb-4">Ask {mentor?.name} a Question</h4>
                <div className="card mb-4">
                  <div className="card-body">
                    <textarea
                      className="form-control mb-3"
                      rows="3"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder={`What would you like to ask ${mentor?.name}?`}
                    ></textarea>
                    <button
                      className="btn btn-primary px-4"
                      onClick={handleQuestionSubmit}
                      disabled={loading || !question.trim()}
                    >
                      {loading ? 'Processing...' : 'Ask Question'}
                    </button>
                  </div>
                </div>

                {answer && (
                  <div>
                    <h5 className="mb-3">Answer</h5>
                    <pre>{answer}</pre>
                  </div>
                )}
              </div>
            )}
            
            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="mb-0">Reviews ({mentor?.reviewCount || 30})</h4>
                  <div className="d-flex align-items-center">
                    <div className="text-warning me-2">
                      {Array(5).fill(0).map((_, i) => (
                        <i key={i} className={`bi ${i < Math.floor(mentor?.ratings || 4.5) ? 'bi-star-fill' : i < (mentor?.ratings || 4.5) ? 'bi-star-half' : 'bi-star'}`}></i>
                      ))}
                    </div>
                    <span className="fw-medium">{mentor?.ratings || 4.5}</span>
                  </div>
                </div>
                
                {/* Sample Reviews */}
                <div className="review-item mb-4 pb-4 border-bottom">
                  <div className="d-flex justify-content-between mb-2">
                    <div className="d-flex align-items-center">
                      <div className="avatar me-3 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: "40px", height: "40px"}}>
                        <span>MJ</span>
                      </div>
                      <div>
                        <h6 className="mb-0">Michael Johnson</h6>
                        <div className="text-warning small">
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                        </div>
                      </div>
                    </div>
                    <div className="text-muted small">2 weeks ago</div>
                  </div>
                  <p className="mb-0">I had an excellent mentoring session. The advice was practical and immediately applicable to my career challenges.</p>
                </div>
                
                <div className="review-item mb-4 pb-4 border-bottom">
                  <div className="d-flex justify-content-between mb-2">
                    <div className="d-flex align-items-center">
                      <div className="avatar me-3 bg-success text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: "40px", height: "40px"}}>
                        <span>SL</span>
                      </div>
                      <div>
                        <h6 className="mb-0">Sarah Lee</h6>
                        <div className="text-warning small">
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star"></i>
                        </div>
                      </div>
                    </div>
                    <div className="text-muted small">1 month ago</div>
                  </div>
                  <p className="mb-0">The mentor provided great insights into the industry and helped me prepare for my interviews effectively.</p>
                </div>
                
                <div className="review-item">
                  <div className="d-flex justify-content-between mb-2">
                    <div className="d-flex align-items-center">
                      <div className="avatar me-3 bg-warning text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: "40px", height: "40px"}}>
                        <span>DT</span>
                      </div>
                      <div>
                        <h6 className="mb-0">David Thompson</h6>
                        <div className="text-warning small">
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-half"></i>
                        </div>
                      </div>
                    </div>
                    <div className="text-muted small">2 months ago</div>
                  </div>
                  <p className="mb-0">Knowledgeable and professional. The mentor helped me navigate a difficult career transition with confidence.</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="col-lg-4">
          {/* Booking Widget */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white py-3">
              <h5 className="mb-0">Book a Session</h5>
            </div>
            <div className="card-body p-4">
              {bookingConfirmed ? (
                <div className="text-center py-3">
                  <div className="mb-3">
                    <span className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{width: "60px", height: "60px"}}>
                      <i className="bi bi-check-lg fs-1"></i>
                    </span>
                  </div>
                  <h5>Session Booked Successfully!</h5>
                  <p className="mb-3">Your session with {mentor?.name} has been confirmed for:</p>
                  <div className="bg-light p-3 rounded mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Date:</span>
                      <span className="fw-medium">{selectedDay}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Time:</span>
                      <span className="fw-medium">{selectedTimeSlot}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Topic:</span>
                      <span className="fw-medium">{bookingTopic}</span>
                    </div>
                  </div>
                  <button className="btn btn-outline-primary w-100" onClick={() => setBookingConfirmed(false)}>
                    Book Another Session
                  </button>
                </div>
              ) : (
                <div>
                  <Form.Group className="mb-3">
                    <Form.Label>Select Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={selectedDay || ''}
                      onChange={e => setSelectedDay(e.target.value)}
                      required
                    />
                  </Form.Group>
                  
                  <div className="mb-3">
                    <label className="form-label">Select Time Slot</label>
                    <div className="d-flex flex-wrap gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          className={`btn ${selectedTimeSlot === slot ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => setSelectedTimeSlot(slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Discussion Topic</label>
                    <select 
                      className="form-select" 
                      required
                      value={bookingTopic}
                      onChange={(e) => setBookingTopic(e.target.value)}
                    >
                      <option value="">Select a topic</option>
                      <option value="Career Advice">Career Advice</option>
                      <option value="Resume Review">Resume Review</option>
                      <option value="Interview Preparation">Interview Preparation</option>
                      <option value="Skill Development">Skill Development</option>
                      <option value="Industry Insights">Industry Insights</option>
                    </select>
                  </div>
                  
                  <div className="d-grid">
                    <button 
                      type="button" 
                      className="btn btn-primary"
                      onClick={handleBookSession}
                      disabled={!selectedDay || !selectedTimeSlot || !bookingTopic}
                    >
                      Book Now
                    </button>
                  </div>
                  <div className="text-center mt-3">
                    <p className="text-muted small mb-0">
                      Sessions are 45 minutes via video call
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Availability Widget */}
          <div className="card shadow-sm mb-4">
            <div className="card-header py-3">
              <h5 className="mb-0">Availability</h5>
            </div>
            <div className="card-body p-3">
              <div className="d-flex justify-content-between mb-2">
                <span>Monday</span>
                <span className="badge bg-success">Available</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tuesday</span>
                <span className="badge bg-success">Available</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Wednesday</span>
                <span className="badge bg-warning">Limited</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Thursday</span>
                <span className="badge bg-success">Available</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Friday</span>
                <span className="badge bg-danger">Unavailable</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Weekend</span>
                <span className="badge bg-danger">Unavailable</span>
              </div>
            </div>
          </div>
          
          {/* Similar Mentors */}
          <div className="card shadow-sm">
            <div className="card-header py-3">
              <h5 className="mb-0">Similar Mentors</h5>
            </div>
            <div className="card-body p-3">
              {mentorsData
                .filter(m => m.id !== parseInt(id))
                .slice(0, 2)
                .map(m => (
                  <div key={m.id} className="d-flex align-items-center mb-3">
                    <img 
                      src={m.image} 
                      alt={m.name} 
                      className="rounded-circle me-3"
                      style={{width: "50px", height: "50px", objectFit: "cover"}}
                      onError={(e) => {e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=random&size=256`}}
                    ></img>
                    <div>
                      <h6 className="mb-0">{m.name}</h6>
                      <div className="text-muted small">{m.title}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDetail;