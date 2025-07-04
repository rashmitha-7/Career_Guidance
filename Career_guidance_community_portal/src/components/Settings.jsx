// Settings.js
import React, { useState } from 'react';

function Settings() {
  const [email, setEmail] = useState('johndoe@example.com');
  const [password, setPassword] = useState('');
  const [notifications, setNotifications] = useState(true);

  const handleSaveChanges = () => {
    // Logic for saving settings (e.g., sending data to a server)
    alert('Changes saved!');
  };

  return (
    <div className="container">
      <h2 className="mt-5 mb-4">Account Settings</h2>
      <div className="row">
        {/* Email Section */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Update Email</h5>
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Password Section */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Change Password</h5>
              <form>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="button" className="btn btn-secondary" onClick={handleSaveChanges}>
                  Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Notifications Section */}
        <div className="col-md-12 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Notification Preferences</h5>
              <form>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="notifications"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="notifications">
                    Receive email notifications
                  </label>
                </div>
                <button type="button" className="btn btn-success mt-3" onClick={handleSaveChanges}>
                  Save Preferences
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    
      
      );
    }
    
 


export default Settings;






