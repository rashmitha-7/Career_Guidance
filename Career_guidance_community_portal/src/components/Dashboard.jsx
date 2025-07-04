import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [quizCount, setQuizCount] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === 'mentor') {
      navigate('/mentor-dashboard');
      return;
    }

    const fetchSessions = async () => {
      console.log('Dashboard: fetchSessions called');
      try {
        setLoading(true);
        console.log('Dashboard: Attempting to fetch bookings from /api/bookings/me');
        const response = await axios.get('http://localhost:5000/api/bookings/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Dashboard: Fetched sessions response data:', response.data);
        setSessions(response.data.data || []);
      } catch (error) {
        console.error('Dashboard: Error fetching sessions:', error);
        if (error.response) {
          console.error('Dashboard: Error response data:', error.response.data);
          console.error('Dashboard: Error response status:', error.response.status);
        } else if (error.request) {
          console.error('Dashboard: Error request:', error.request);
        } else {
          console.error('Dashboard: Error message:', error.message);
        }
      } finally {
        setLoading(false);
        console.log('Dashboard: setLoading(false) called');
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data.data || []);
      } catch (error) {
        console.error('Dashboard: Error fetching categories:', error);
      }
    };

    const fetchQuizCount = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.get('http://localhost:5000/api/auth/me', config);
        setQuizCount(response.data.data.quizCount || 0);
      } catch (error) {
        setQuizCount(0);
      }
    };

    if (user && user.role === 'student') {
      console.log('Dashboard: User is a student, calling fetchSessions');
      fetchSessions();
      fetchCategories();
      fetchQuizCount();
    }
  }, [user, navigate]);

  if (user && user.role === 'mentor') {
    return null; // Will redirect
  }

  return (
    <div className="main-container dashboard-homepage fade-in">
      {/* Header Card */}
      <div className="container mb-4">
        <div className="card shadow-sm p-4 d-flex flex-md-row flex-column align-items-center justify-content-between" style={{ borderRadius: '18px', background: '#fff', border: 'none' }}>
          <div>
            <h2 className="mb-1" style={{ fontWeight: 700, fontSize: '2.2rem', letterSpacing: '-1px', color: '#2b2d42' }}>Your Dashboard</h2>
            <p className="mb-0" style={{ fontSize: '1.1rem', color: '#6c757d' }}>Welcome back, {user?.name || 'Student'}!</p>
          </div>
        </div>
      </div>

      <div className="container py-4">
        {/* Stats Cards */}
        <div className="row mb-4 g-4">
          <div className="col-md-3 col-sm-6">
            <div className="dashboard-card card p-3 border-start border-primary border-4 shadow-sm h-100 text-center">
              <div className="card-body">
                <div className="dashboard-icon bg-primary bg-opacity-10 text-primary rounded-circle p-3 mx-auto mb-2">
                  <i className="bi bi-clipboard-check fs-3"></i>
                </div>
                <p className="dashboard-title text-primary">Completed Tests</p>
                <h3 className="dashboard-stat">{quizCount}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="dashboard-card card p-3 border-start border-success border-4 shadow-sm h-100 text-center">
              <div className="card-body">
                <div className="dashboard-icon bg-success bg-opacity-10 text-success rounded-circle p-3 mx-auto mb-2">
                  <i className="bi bi-people fs-3"></i>
                </div>
                <p className="dashboard-title text-success">Mentor Sessions</p>
                <h3 className="dashboard-stat">{sessions.length}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="dashboard-card card p-3 border-start border-warning border-4 shadow-sm h-100 text-center">
              <div className="card-body">
                <div className="dashboard-icon bg-warning bg-opacity-10 text-warning rounded-circle p-3 mx-auto mb-2">
                  <i className="bi bi-journal-text fs-3"></i>
                </div>
                <p className="dashboard-title text-warning">Resources</p>
                <h3 className="dashboard-stat">{categories.length}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="dashboard-card card p-3 border-start border-info border-4 shadow-sm h-100 text-center">
              <div className="card-body">
                <div className="dashboard-icon bg-info bg-opacity-10 text-info rounded-circle p-3 mx-auto mb-2">
                  <i className="bi bi-calendar-event fs-3"></i>
                </div>
                <p className="dashboard-title text-info">Upcoming Events</p>
                <h3 className="dashboard-stat">{sessions.filter(session => session.status === 'pending').length}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Sessions Section */}
        <div className="row mb-4">
          <div className="col-md-12">
            <div className="card h-100 shadow-sm">
              <div className="card-header bg-white p-4 border-bottom-0">
                <h5 className="mb-0">Upcoming Sessions</h5>
              </div>
              <div className="card-body p-4">
                {loading ? (
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : sessions.length === 0 ? (
                  <div className="text-center text-muted">
                    <i className="bi bi-calendar-x fs-1 mb-3"></i>
                    <p>No upcoming sessions</p>
                    <Link to="/mentors" className="btn btn-outline-primary btn-sm">
                      Book a Session
                    </Link>
                  </div>
                ) : (
                  <div style={{ display: 'flex', overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: '15px' }}>
                    {sessions.map((session) => (
                      <div key={session._id} className="card mb-3 me-3" style={{ flex: '0 0 300px', minWidth: '300px', maxWidth: '300px' }}>
                        <div className="card-body">
                          <h6 className="card-title mb-2 text-truncate">{session.topic}</h6>
                          <p className="mb-1 text-muted small">
                            <i className="bi bi-person me-1"></i>
                            With: {session.mentor?.name || 'Mentor'}
                          </p>
                          <p className="mb-1 text-muted small">
                            <i className="bi bi-calendar me-1"></i>
                            {new Date(session.date).toLocaleDateString()}
                          </p>
                          <p className="mb-0 text-muted small">
                            <i className="bi bi-clock me-1"></i>
                            {session.timeSlot}
                          </p>
                          <span className={`badge bg-${session.status === 'confirmed' ? 'success' : session.status === 'pending' ? 'warning' : session.status === 'completed' ? 'info' : 'secondary'} mt-2`}>
                            {session.status || 'pending'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Recommended Resources */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header bg-white p-4 d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Recommended Resources</h5>
                <Link to="/library" className="btn btn-sm btn-link text-decoration-none">View All</Link>
              </div>
              <div className="card-body p-4">
                <div className="row g-3">
                  <div className="col-md-4 slide-up">
                    <div className="card h-100 card-hover">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <div className="me-3 bg-primary bg-opacity-10 text-primary p-2 rounded">
                            <i className="bi bi-file-earmark-text"></i>
                          </div>
                          <h6 className="mb-0">Resume Writing Guide</h6>
                        </div>
                        <p className="text-muted small mb-0">Learn how to create a standout resume that gets you noticed by recruiters.</p>
                      </div>
                      <div className="card-footer border-top-0 bg-white p-4 pt-0">
                        <a href="https://resume.io/" className="btn btn-sm btn-outline-primary" target="_blank" rel="noopener noreferrer">
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4 slide-up delay-1">
                    <div className="card h-100 card-hover">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <div className="me-3 bg-warning bg-opacity-10 text-warning p-2 rounded">
                            <i className="bi bi-camera-video"></i>
                          </div>
                          <h6 className="mb-0">Interview Techniques</h6>
                        </div>
                        <p className="text-muted small mb-0">Video tutorials on answering tough interview questions with confidence.</p>
                      </div>
                      <div className="card-footer border-top-0 bg-white p-4 pt-0">
                        <a href="https://www.interviewbit.com/" className="btn btn-sm btn-outline-primary" target="_blank" rel="noopener noreferrer">
                          Watch Now
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4 slide-up delay-2">
                    <div className="card h-100 card-hover">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <div className="me-3 bg-success bg-opacity-10 text-success p-2 rounded">
                            <i className="bi bi-journal-check"></i>
                          </div>
                          <h6 className="mb-0">Career Development Plan</h6>
                        </div>
                        <p className="text-muted small mb-0">Step-by-step guide to creating your personalized career development plan.</p>
                      </div>
                      <div className="card-footer border-top-0 bg-white p-4 pt-0">
                        <Link to="/library" className="btn btn-sm btn-outline-primary">
                          Get Started
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
