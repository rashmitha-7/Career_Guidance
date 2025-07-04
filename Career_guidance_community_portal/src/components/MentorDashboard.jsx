import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const MentorDashboard = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalStudentsMentored, setTotalStudentsMentored] = useState(0);
  const [totalSessionsConducted, setTotalSessionsConducted] = useState(0);
  const [pendingSessionRequests, setPendingSessionRequests] = useState(0);

  useEffect(() => {
    console.log('MentorDashboard useEffect running.');
    console.log('Current user in useEffect:', user);
    console.log('Current user.mentorId in useEffect:', user?.mentorId);

    const fetchStudents = async () => {
      console.log('fetchStudents function called.');
      try {
        setLoading(true);
        const mentorBookingsUrl = `http://localhost:5000/api/bookings/mentor/${user.mentorId}`;
        console.log('URL used to fetch mentor bookings:', mentorBookingsUrl);
        console.log('Fetching bookings from URL:', mentorBookingsUrl);
        const response = await axios.get(mentorBookingsUrl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Fetched bookings response:', response.data);
        const bookings = response.data.data || [];
        setStudents(bookings);

        // Calculate statistics
        const uniqueStudents = new Set();
        let completedSessions = 0;
        let pendingRequests = 0;

        bookings.forEach(booking => {
          uniqueStudents.add(booking.user._id);
          if (booking.status === 'completed') {
            completedSessions++;
          }
          if (booking.status === 'pending') {
            pendingRequests++;
          }
        });

        setTotalStudentsMentored(uniqueStudents.size);
        setTotalSessionsConducted(completedSessions);
        setPendingSessionRequests(pendingRequests);

      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to fetch students.');
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role === 'mentor' && user.mentorId) {
      console.log('Fetch condition met. Calling fetchStudents.');
      fetchStudents();
    } else if (!user) {
      console.log('User not defined. Not fetching students.');
      setLoading(false);
      setError('You must be logged in to view the mentor dashboard.');
    } else if (user && user.role !== 'mentor') {
       console.log('User is not a mentor. Not fetching students.');
       setLoading(false);
       setError('You are not authorized to view this dashboard.');
    } else if (user && !user.mentorId) {
       console.log('User defined but user.mentorId is missing. Not fetching students.');
       setLoading(false);
       setError('User ID not available.');
    }

  }, [user?.mentorId, user]);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const updateUrl = `http://localhost:5000/api/bookings/${bookingId}`;
      const response = await axios.put(updateUrl, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        // Re-fetch students to update counts after status change
        // For simplicity and accuracy after a status change, re-fetch all bookings
        const mentorBookingsUrl = `http://localhost:5000/api/bookings/mentor/${user.mentorId}`;
        const updatedResponse = await axios.get(mentorBookingsUrl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const updatedBookings = updatedResponse.data.data || [];
        setStudents(updatedBookings);

        const uniqueStudents = new Set();
        let completedSessions = 0;
        let pendingRequests = 0;

        updatedBookings.forEach(booking => {
          uniqueStudents.add(booking.user._id);
          if (booking.status === 'completed') {
            completedSessions++;
          }
          if (booking.status === 'pending') {
            pendingRequests++;
          }
        });

        setTotalStudentsMentored(uniqueStudents.size);
        setTotalSessionsConducted(completedSessions);
        setPendingSessionRequests(pendingRequests);

      }
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Failed to update status.');
    }
  };

  if (loading) {
    return <div className="container py-5 text-center"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  }

  return (
    <div className="main-container container fade-in">
      <div className="row mb-4 align-items-center">
        <div className="col-12">
          <div className="card shadow-sm p-4 d-flex flex-md-row flex-column align-items-center justify-content-between" style={{ borderRadius: '18px', background: '#fff', border: 'none' }}>
            <div className="d-flex align-items-center mb-3 mb-md-0">
              <div className="me-4">
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'M')}&background=4361EE&color=fff&size=80`} 
                  alt="Mentor Avatar" 
                  className="rounded-circle shadow-sm" 
                  style={{ width: '80px', height: '80px', objectFit: 'cover', border: '4px solid #f5f7fa' }}
                />
              </div>
              <div>
                <h2 className="mb-1" style={{ fontWeight: 700, fontSize: '2.2rem', letterSpacing: '-1px', color: '#2b2d42' }}>Mentor Dashboard</h2>
                <p className="mb-0" style={{ fontSize: '1.1rem', color: '#6c757d' }}>Welcome, {user?.name}!</p>
              </div>
            </div>
            <div className="text-md-end mt-3 mt-md-0">
              {user?.role === 'mentor' && (
                <Link to="/add-category" className="btn btn-success btn-lg shadow-sm">
                  <i className="bi bi-plus-circle me-2"></i>
                  Add Category
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mentor Stats Cards */}
      <div className="row mb-4 g-3">
        <div className="col-md-4 col-sm-6">
          <div className="dashboard-card card p-3 border-start border-primary border-4 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="dashboard-title text-primary">Total Students Mentored</p>
                  <h3 className="dashboard-stat">{totalStudentsMentored}</h3>
                </div>
                <div className="dashboard-icon bg-primary bg-opacity-10 text-primary rounded-circle p-3">
                  <i className="bi bi-people-fill fs-3"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 col-sm-6">
          <div className="dashboard-card card p-3 border-start border-success border-4 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="dashboard-title text-success">Sessions Completed</p>
                  <h3 className="dashboard-stat">{totalSessionsConducted}</h3>
                </div>
                <div className="dashboard-icon bg-success bg-opacity-10 text-success rounded-circle p-3">
                  <i className="bi bi-check-circle-fill fs-3"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 col-sm-12">
          <div className="dashboard-card card p-3 border-start border-warning border-4 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="dashboard-title text-warning">Pending Requests</p>
                  <h3 className="dashboard-stat">{pendingSessionRequests}</h3>
                </div>
                <div className="dashboard-icon bg-warning bg-opacity-10 text-warning rounded-circle p-3">
                  <i className="bi bi-hourglass-split fs-3"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-4 mb-4">
        <h4 className="mb-3">Student Session Bookings</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        {students.length === 0 ? (
          <div className="alert alert-info text-center">
            <i className="bi bi-info-circle fs-3 mb-2"></i>
            <p className="mb-0">No students have booked sessions with you yet.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle">
              <thead className="table-light">
                <tr>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Topic</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.user?.name || 'N/A'}</td>
                    <td>{booking.user?.email || 'N/A'}</td>
                    <td>{booking.topic}</td>
                    <td>{booking.date ? new Date(booking.date).toLocaleDateString() : ''}</td>
                    <td>{booking.timeSlot}</td>
                    <td>
                      <span className={`badge bg-${booking.status === 'confirmed' ? 'success' : booking.status === 'pending' ? 'warning' : booking.status === 'completed' ? 'info' : booking.status === 'cancelled' ? 'danger' : 'secondary'}`}>
                        {booking.status || 'pending'}
                      </span>
                    </td>
                    <td>
                      {booking.status === 'pending' && (
                        <>
                          <Button 
                            variant="success" 
                            size="sm" 
                            className="me-2"
                            onClick={() => handleStatusChange(booking._id, 'confirmed')}
                          >
                            Confirm
                          </Button>
                          <Button 
                            variant="danger" 
                            size="sm"
                            onClick={() => handleStatusChange(booking._id, 'cancelled')}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                      {(booking.status === 'confirmed' || booking.status === 'pending') && (
                        <Button 
                          variant="info" 
                          size="sm" 
                          onClick={() => handleStatusChange(booking._id, 'completed')}
                          className="ms-2"
                        >
                          Mark Completed
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorDashboard; 