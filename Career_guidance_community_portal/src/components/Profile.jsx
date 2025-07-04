// Profile.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [mentorSessions, setMentorSessions] = useState([]);
  const [resourcesSavedCount, setResourcesSavedCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserData(response.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchMentorSessions = async () => {
      if (!user) return;
      try {
        const response = await axios.get(`http://localhost:5000/api/bookings/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setMentorSessions(response.data.data || []);
      } catch (error) {
        console.error('Error fetching mentor sessions:', error);
      }
    };

    const fetchResourcesSaved = async () => {
      try {
        // Fetch all categories and display their total count as 'Resources Saved'
        const response = await axios.get(`http://localhost:5000/api/categories`);
        const allCategories = response.data.data || [];
        setResourcesSavedCount(allCategories.length || 0);
      } catch (error) {
        console.error('Error fetching total resources (categories):', error);
      }
    };

    fetchUserData();
    fetchMentorSessions();
    fetchResourcesSaved();

  }, [user]);

  if (!userData) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          Please log in to view your profile.
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="mt-5 mb-4">Your Profile</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <div className="text-center mb-4">
                <div className="profile-avatar-container mb-3">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || '')}&background=4361EE&color=fff&size=128`}
                    alt="Profile"
                    className="rounded-circle"
                    style={{ width: '128px', height: '128px' }}
                  />
                </div>
                <h4 className="mb-0">{userData.name}</h4>
                <p className="text-muted">{userData.email}</p>
              </div>
              
              <div className="border-top pt-3">
                <h5 className="card-title">User Details</h5>
                <p className="card-text">
                  <strong>Name:</strong> {userData.name}
                </p>
                <p className="card-text">
                  <strong>Email:</strong> {userData.email}
                </p>
                <p className="card-text">
                  <strong>Role:</strong> {userData.role || 'User'}
                </p>
                <p className="card-text">
                  <strong>Member Since:</strong>{' '}
                  {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}
                </p>
                <Link to="/edit-profile" className="btn btn-primary">
                  <i className="bi bi-pencil me-2"></i>
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          {/* Removed Account Settings section as requested */}
          {/*
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-gear me-2"></i>
                Account Settings
              </h5>
              <p className="card-text">Manage your account preferences and security settings.</p>
              <div className="list-group">
                <Link to="/settings" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  Change Password
                  <i className="bi bi-chevron-right"></i>
                </Link>
                <Link to="/settings/notifications" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  Notification Preferences
                  <i className="bi bi-chevron-right"></i>
                </Link>
                <Link to="/settings/privacy" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  Privacy Settings
                  <i className="bi bi-chevron-right"></i>
                </Link>
              </div>
            </div>
          </div>
          */}

          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-bookmark-star me-2"></i>
                Activity Summary
              </h5>
              <div className="list-group">
                <div className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-1">Mentorship Sessions</h6>
                    <small className="text-muted">{mentorSessions.length}</small>
                  </div>
                </div>
                <div className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-1">Completed Quizzes</h6>
                    <small className="text-muted">{userData.quizCount || 0}</small>
                  </div>
                </div>
                <div className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-1">Resources Saved</h6>
                    <small className="text-muted">{resourcesSavedCount}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
